import { and, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { productUnit } from '../../models/product.ts';
import type { TZProductUnitSchema } from '../../schema/productSchema.ts';
import { TRPCError } from '@trpc/server';

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

export const listProductUnitHandler = async () => {
  const result = await db.select().from(productUnit);

  return result;
};
