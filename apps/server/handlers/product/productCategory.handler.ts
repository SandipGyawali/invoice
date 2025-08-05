import { and, count, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { productCategory } from '../../models/product.ts';
import { TRPCError } from '@trpc/server';
import type { TZProductCategorySchema } from '../../schema/productSchema.ts';
import type { StatusEnumType } from '../../models/status.enum.ts';
import type { TRPCContext } from '../../lib/context.ts';

type ProductCategoryOptions = {
  ctx: TRPCContext;
  input: TZProductCategorySchema;
};

export const addProductCategoryHandler = async ({
  input,
  ctx,
}: ProductCategoryOptions) => {
  const unitExists = (
    await db
      .select()
      .from(productCategory)
      .where(ilike(productCategory.catName, input.catName))
  ).at(0);

  if (unitExists) {
    console.log(unitExists);
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Category with the provided ${input.catName} name already exists`,
    });
  }

  await db.insert(productCategory).values({
    catName: input.catName,
    tenantId: ctx.tenantId,
  });

  return {
    success: true,
    message: 'New Category Created Successfully',
  };
};

export const listProductCategoryHandler = async ({ ctx, input }) => {
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(productCategory).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'search':
          value.toString().length > 0
            ? acc.push(
                ilike(productCategory.catName, `%${String(value).trim()}%`)
              )
            : undefined;
          break;
        case 'status':
          acc.push(eq(productCategory.status, value as StatusEnumType));
          break;
      }
      return acc;
    },
    [] as any[]
  );

  filteredConditions.push(eq(productCategory.tenantId, tenantId as string));

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db
    .select({ totalCount: count() })
    .from(productCategory)
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
    message: 'Product Category fetched successfully',
  };
};

export const updateProductCategoryHandler = async ({ input, ctx }) => {
  console.log(input);

  // check category
  const exitsCategory = (
    await db
      .select()
      .from(productCategory)
      .where(
        and(
          eq(productCategory.id, input.id),
          eq(productCategory.tenantId, ctx.tenantId)
        )
      )
  ).at(0);

  if (!exitsCategory) {
    throw new TRPCError({
      message: `Product Category with ${input.catName} doesn't exists`,
      code: 'BAD_REQUEST',
    });
  }

  await db
    .update(productCategory)
    .set({
      catName: input.catName,
      status: input.status,
      statusFTR: input.statusFTR,
      tenantId: input.tenantId,
    })
    .where(
      and(
        eq(productCategory.id, input.id),
        eq(productCategory.tenantId, ctx.tenantId)
      )
    );

  return {
    message: 'Product Category Updated Successfully',
    success: true,
  };
};
