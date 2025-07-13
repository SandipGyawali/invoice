import { and, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { productCategory } from '../../models/product.ts';
import { TRPCError } from '@trpc/server';
import type { TZProductCategorySchema } from '../../schema/productSchema.ts';

type ProductCategoryOptions = {
  ctx: {};
  input: TZProductCategorySchema;
};

export const addProductCategoryHandler = async ({
  input,
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
    tenantId: input.tenantId,
  });

  return {
    success: true,
    message: 'New Category Created Successfully',
  };
};

export const listProductCategoryHandler = async () => {
  const result = await db.select().from(productCategory);

  return result;
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
          eq(productCategory.tenantId, input.tenantId)
        )
      )
  ).at(0);

  console.log(exitsCategory);

  if (!exitsCategory) {
    throw new TRPCError({
      message: `Product Category with ${input.catName} doesn't exists`,
      code: 'BAD_REQUEST',
    });
  }

  await db.update(productCategory).set({
    catName: input.catName,
    status: input.status,
    statusFTR: input.statusFTR,
    tenantId: input.tenantId,
  });

  return {
    message: 'Product Category Updated Successfully',
    success: true,
  };
};
