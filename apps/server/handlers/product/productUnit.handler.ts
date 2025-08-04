import { and, count, eq, ilike, or } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { productUnit } from '../../models/product.ts';
import type { TZProductUnitSchema } from '../../schema/productSchema.ts';
import { TRPCError } from '@trpc/server';
import type { StatusEnumType } from '../../models/status.enum.ts';

type ProductUnitOptions = {
  ctx: {};
  input: TZProductUnitSchema;
};

export const addProductUnitHandler = async ({ input }: ProductUnitOptions) => {
  const unitExists = (
    await db
      .select()
      .from(productUnit)
      .where(ilike(productUnit.name, input.name))
  ).at(0);

  if (unitExists) {
    console.log(unitExists);
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Unit with the provided ${input.name}  name already exists`,
    });
  }

  await db.insert(productUnit).values({
    name: input.name,
    namePlural: input.namePlural,
    tenantId: input.tenantId,
  });

  return {
    success: true,
    message: 'New Product Unit Created Successfully',
  };
};

type UpdateProductUnitOptions = {
  ctx: {};
  input: TZProductUnitSchema & {
    id: number;
    status: '0' | '1';
    statusFTR: string;
  };
};

export const updateProductUnitHandler = async ({
  input,
}: UpdateProductUnitOptions) => {
  const unitExits = (
    await db
      .select()
      .from(productUnit)
      .where(
        and(
          eq(productUnit.id, input.id),
          eq(productUnit.tenantId, input.tenantId)
        )
      )
  ).at(0);

  if (!unitExits) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Unit with the provided ${input.name}  name doesn't exists`,
    });
  }

  await db.update(productUnit).set({
    name: input.name,
    namePlural: input.namePlural,
    status: input.status,
    statusFTR: input.statusFTR,
  });

  return {
    success: true,
    message: 'Product Unit Updated Successfully',
  };
};

export const listProductUnitHandler = async ({ ctx, input }) => {
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(productUnit).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'search':
          value.toString().length > 0
            ? acc.push(
                or(
                  ilike(productUnit.name, `%${String(value).trim()}%`),
                  ilike(productUnit.namePlural, `%${String(value).trim()}%`)
                )
              )
            : undefined;
          break;
        case 'status':
          acc.push(eq(productUnit.status, value as StatusEnumType));
          break;
      }
      return acc;
    },
    [] as any[]
  );

  filteredConditions.push(eq(productUnit.tenantId, tenantId as string));

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db
    .select({ totalCount: count() })
    .from(productUnit)
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
    message: `Product Unit Fetched Successfully`,
  };
};
