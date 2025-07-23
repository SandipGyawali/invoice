import { and, count, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { tax } from '../../models/tax.ts';
import { TRPCError } from '@trpc/server';
import type { TZQueryOptionSchema } from '../../schema/queryOptionSchema.ts';

interface TaxOptions {
  ctx: {};
  input: TZQueryOptionSchema;
}

interface CreateTaxOptions extends TaxOptions {
  input: any;
}

export const createTaxHandler = async ({ input, ctx }: CreateTaxOptions) => {
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
      message: `Tax with name ${input.name} already exists`,
    });
  }

  const newTax = await db
    .insert(tax)
    .values({
      name: input.name,
      rate: input.rate,
      applicableTo: input.applicableTo,
      tenantId: input.tenantId,
      type: input.type,
    })
    .returning();

  return {
    success: true,
    message: `New Tax Created Successfully`,
    data: newTax,
  };
};

export const listTaxHandler = async ({ ctx, input }: TaxOptions) => {
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const [result, [{ totalCount }]] = await Promise.all([
    db.select().from(tax).limit(input.pageSize).offset(offset),
    db.select({ totalCount: count() }).from(tax),
  ]);

  // console.log(result);
  console.log(totalCount);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: 'Tax Fetched Successfully',
  };
};
