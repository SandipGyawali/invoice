import { ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { products } from '../../models/product.ts';
import { TRPCError } from '@trpc/server';

interface ProductHandler {
  ctx: {};
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

export const listProductHandler = async ({ ctx }: ProductHandler) => {
  const result = await db.select().from(products);
  return result;
};
