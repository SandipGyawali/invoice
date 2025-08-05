import { and, count, eq, ilike, or } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { client } from '../../models/client.ts';
import { TRPCError } from '@trpc/server';
import type { ZClientSchemaInterface } from '../../schema/cientSchema.ts';
import type { StatusEnumType } from '../../models/status.enum.ts';

interface ClientHandler {
  ctx: {};
}

interface AddClientHandler extends ClientHandler {
  input: ZClientSchemaInterface;
}

export const listClients = async ({ ctx, input }: ClientHandler) => {
  const { tenantId } = ctx;
  const { page, pageSize } = input;
  const offset = (page - 1) * pageSize;

  const query = db.select().from(client).$dynamic();
  const filteredConditions = Object.entries(input).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value == null) return acc;

      switch (key) {
        case 'search':
          value.toString().length > 0
            ? acc.push(
                or(
                  ilike(client.firstName, `%${String(value).trim()}%`),
                  ilike(client.lastName, `%${String(value).trim()}%`),
                  ilike(client.address, `%${String(value).trim()}%`),
                  ilike(client.phone, `%${String(value).trim()}%`),
                  ilike(client.email, `%${String(value).trim()}%`)
                )
              )
            : undefined;
          break;
        case 'status':
          acc.push(eq(client.status, value as StatusEnumType));
          break;
      }
      return acc;
    },
    [] as any[]
  );

  filteredConditions.push(eq(client.tenantId, tenantId as string));
  console.log(filteredConditions);

  const builtQuery = query.where(and(...filteredConditions));
  const countQuery = db.select({ totalCount: count() }).from(client).$dynamic();

  const [result, [{ totalCount }]] = await Promise.all([
    builtQuery.limit(pageSize).offset(offset).execute(),
    countQuery.where(and(...filteredConditions)).execute(),
  ]);

  return {
    data: result,
    total: Number(totalCount),
    page: page,
    pageSize: pageSize,
    message: 'Clients Fetched Successfully',
  };
};

export const addClientHandler = async ({ input }: AddClientHandler) => {
  const clientExists = (
    await db
      .select()
      .from(client)
      .where(
        and(
          eq(client.email, input.email),
          ilike(client.firstName, input.firstName),
          eq(client.tenantId, input.tenantId)
        )
      )
  ).at(0);

  if (clientExists) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Client with the provided name or email already exists`,
    });
  }

  const [newClient] = await db
    .insert(client)
    .values({
      email: input.email,
      address: input.address,
      address2: input.address2,
      city: input.city,
      country: input.country,
      dob: input.dob,
      firstName: input.firstName,
      gender: input.gender,
      lastName: input.lastName,
      phone: input.phone,
      state: input.state,
      taxId: input.taxId,
      vatId: input.vatId,
      zip: input.zip,
      tenantId: input.tenantId,
    })
    .returning();

  return {
    success: true,
    message: `New Client created Successfully`,
    data: newClient,
  };
};
