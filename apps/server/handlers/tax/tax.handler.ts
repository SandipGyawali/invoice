import { and, count, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { tax } from '../../models/tax.ts';
import { TRPCError } from '@trpc/server';
import type { TZQueryOptionSchema } from '../../schema/queryOptionSchema.ts';
import type { TRPCContext } from '../../lib/context.ts';

interface TaxOptions {
  ctx: TRPCContext;
  input: TZQueryOptionSchema;
}

interface CreateTaxOptions extends TaxOptions {
  input: any;
}

export const createTaxHandler = async ({ input, ctx }: CreateTaxOptions) => {
  const { tenantId } = ctx;

  // tax name exists
  const taxExists = (
    await db
      .select()
      .from(tax)
      .where(
        and(ilike(tax.name, input.name), eq(tax.tenantId, tenantId as string))
      )
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
      tenantId: tenantId as string,
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
  console.log(ctx);

  const hasPermission = ctx.permissions.some((perm) => perm === `tax:view`);

  console.log(hasPermission);

  if (!hasPermission) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: "You don't have permission to view taxes",
    });
  }

  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const [result, [{ totalCount }]] = await Promise.all([
    db
      .select()
      .from(tax)
      .limit(input.pageSize)
      .offset(offset)
      .where(eq(tax.tenantId, tenantId as string)),
    db.select({ totalCount: count() }).from(tax),
  ]);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: 'Tax Fetched Successfully',
  };
};
