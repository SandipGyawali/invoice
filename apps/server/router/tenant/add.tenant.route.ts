import { z } from 'zod';
import { trpc } from '../../lib/trpc.ts';
import { db } from '../../db/db.ts';
import { tenants } from '../../models/tenant.ts';
import { generateUUID } from '../../utils/generateUUID.ts';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

const _addTenantSchema = z.object({
  name: z.string().trim(),
  email: z.string().email().trim(),
  plan: z.string().trim(),
  status: z.number().default(1),
  subscriptionStart: z.coerce.date(),
  subscriptionEnd: z.coerce.date(),
});

export const addTenantRoute = trpc.procedure
  .input(_addTenantSchema)
  .mutation(async ({ input }) => {
    console.log(input);
    // check if the tenant with the email already exists
    const exists = (
      await db.select().from(tenants).where(eq(tenants.email, input.email))
    ).at(0);

    if (exists)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Tenant with provided email already exits.',
      });

    // random uuid
    const genUUID = generateUUID(8);

    const result = (
      await db
        .insert(tenants)
        .values({
          id: genUUID,
          email: input.email,
          name: input.name,
          plan: input.plan,
          status: input.status,
          subscriptionStart: new Date(input.subscriptionStart),
          subscriptionEnd: new Date(input.subscriptionEnd),
        } as any)
        .returning()
    ).at(0);

    if (!result)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error while inserting the tenant information.',
      });

    return {
      message: 'Tenant Registered Successfully',
      data: [{ ...result }],
    };
  });
