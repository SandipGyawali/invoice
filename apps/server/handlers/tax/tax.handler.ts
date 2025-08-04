import { and, count, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { tax } from '../../models/tax.ts';
import { TRPCError } from '@trpc/server';
import type { TZQueryOptionSchema } from '../../schema/queryOptionSchema.ts';
import type { TRPCContext } from '../../lib/context.ts';
import type { StatusEnumType } from '../../models/status.enum.ts';

interface TaxOptions {
  ctx: TRPCContext;
  input: TZQueryOptionSchema;
}

interface CreateTaxOptions extends TaxOptions {
  input: any;
}

export const createTaxHandler = async ({ input, ctx }: CreateTaxOptions) => {
  const hashPermissionToCreate = ctx.permissions.some(
    (perm) => perm === 'tax:create'
  );

  if (!hashPermissionToCreate) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: "Your don't have permission to create a new tax",
    });
  }

  // tax name exists
  const taxExists = (
    await db
      .select()
      .from(tax)
      .where(
        and(
          ilike(tax.name, input.name),
          eq(tax.tenantId, ctx.tenantId as string)
        )
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
      tenantId: ctx.tenantId as string,
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
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(tax).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'search':
          value.toString().length > 0
            ? acc.push(ilike(tax.name, `%${String(value).trim()}%`))
            : undefined;
          break;
        case 'status':
          acc.push(eq(tax.status, value as StatusEnumType));
          break;
      }
      return acc;
    },
    [] as any[]
  );

  filteredConditions.push(eq(tax.tenantId, tenantId as string));
  console.log(filteredConditions);

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db.select({ totalCount: count() }).from(tax).$dynamic();

  const [result, [{ totalCount }]] = await Promise.all([
    builtQuery.limit(pageSize).offset(offset).execute(),
    countQuery.where(and(...filteredConditions)).execute(),
  ]);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: 'Tax Fetched Successfully',
  };
};
