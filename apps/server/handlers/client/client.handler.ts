import { and, eq, ilike } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { client } from '../../models/client.ts';
import { products } from '../../models/product.ts';
import { TRPCError } from '@trpc/server';
import type { ZClientSchemaInterface } from '../../schema/cientSchema.ts';

interface ClientHandler {
  ctx: {};
}

interface AddClientHandler extends ClientHandler {
  input: ZClientSchemaInterface;
}

export const listClients = async ({ ctx }: ClientHandler) => {
  const clients = await db.select().from(client);

  return clients;
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
