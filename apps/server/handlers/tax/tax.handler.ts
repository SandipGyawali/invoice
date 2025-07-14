import { and, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { tax } from '../../models/tax.ts';
import { TRPCError } from '@trpc/server';

interface TaxOptions {
  ctx: {};
}

interface CreateTaxOptions extends TaxOptions {
  input: any;
}

export const createTaxHandler = async ({ input, ctx }: CreateTaxOptions) => {
  console.log(input);

  // tax name exists
  const taxExists = (
    await db
      .select()
      .from(tax)
      .where(and(ilike(tax.name, input.name), eq(tax.tenantId, input.tenantId)))
  ).at(0);

  if (taxExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Tax with name ${tax.name} already exists`,
    });
  }

  await db.insert(tax).values({
    name: input.name,
    rate: input.rate,
    applicableTo: input.applicableTo,
    tenantId: input.tenantId,
    type: input.type,
  });

  return {
    success: true,
    message: `New Tax Created Successfully`,
  };
};

export const listTaxHandler = async ({ ctx }: TaxOptions) => {
  const result = await db.select().from(tax);

  return result;
};
