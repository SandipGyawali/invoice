import { and, count, eq, ilike, or } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { products } from '../../models/product.ts';
import { TRPCError } from '@trpc/server';
import type { TZQueryOptionSchema } from '../../schema/queryOptionSchema.ts';
import type { StatusEnumType } from '../../models/status.enum.ts';
import type { TRPCContext } from '../../lib/context.ts';

interface ProductHandler {
  ctx: TRPCContext;
  input: TZQueryOptionSchema;
}

interface AddProductHandler extends ProductHandler {
  input: any;
}

export const addProductHandler = async ({ input }: AddProductHandler) => {
  const productExists = (
    await db.select().from(products).where(ilike(products.pName, input.pName))
  ).at(0);

  if (productExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Product with the provided ${input.pName} name already exists`,
    });
  }

  const [newProduct] = await db
    .insert(products)
    .values({
      pName: input.pName,
      pCatId: input.pCatId,
      pPrice: input.pPrice,
      pUnit: input.pUnit,
      sPrice: input.sPrice,
      pDescription: input.pDescription,
      providerName: input.providerName,
      sku: input.sku,
      tenantId: input.tenantId,
    })
    .returning();

  return {
    success: true,
    message: `Product ${input.pName} added successfully`,
    data: newProduct,
  };
};

export const listProductHandler = async ({ ctx, input }: ProductHandler) => {
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(products).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      const val = value.toString();

      switch (key) {
        case 'search':
          const trimmedVal = String(val).trim();
          val.length > 0
            ? acc.push(
                or(
                  ilike(products.pName, `%${trimmedVal}%`),
                  ilike(products.pDescription, `%${trimmedVal}%`),
                  ilike(products.pPrice, `%${trimmedVal}%`)
                )
              )
            : undefined;
          break;
        case 'status':
          acc.push(eq(products.status, value as StatusEnumType));
          break;
      }
      return acc;
    },
    [] as any[]
  );

  filteredConditions.push(eq(products.tenantId, tenantId as string));

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db
    .select({ totalCount: count() })
    .from(products)
    .$dynamic();

  const [result, [{ totalCount }]] = await Promise.all([
    builtQuery.limit(pageSize).offset(offset).execute(),
    countQuery.where(and(...filteredConditions)).execute(),
  ]);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: 'Products fetched successfully',
  };
};
