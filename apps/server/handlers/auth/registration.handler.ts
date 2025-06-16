import { db } from '../../db/db.ts';
import { account, user } from '../../models/user.ts';
import { eq } from 'drizzle-orm';
import { tenants } from '../../models/tenant.ts';
import { hash } from 'bcryptjs';
import { generateUUID } from '../../utils/generateUUID.ts';
import type { TZRegistrationSchema } from '../../schema/authSchema.ts';
import { TRPCError } from '@trpc/server';
import { roles, userRoles } from '../../models/rbac.ts';

type TenantUseRegistrationOptions = {
  ctx: {};
  input: TZRegistrationSchema;
};

export const tenantUserRegistrationHandler = async ({
  input,
}: TenantUseRegistrationOptions) => {
  // initiate a transaction
  const transactionResponse = await db.transaction(async (tx) => {
    // check if tenant exists
    const tenantExists = (
      await tx.select().from(tenants).where(eq(tenants.name, input.orgName))
    ).at(0);

    if (tenantExists) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'tenant_already_exists',
      });
    }

    const generatedTenantUUID = generateUUID(8);

    // create a tenant directly
    const newTenant = (
      await tx
        .insert(tenants)
        .values({
          id: generatedTenantUUID,
          name: input.orgName,
          email: input.orgEmail ?? '',
        } as any)
        .returning()
    ).at(0);

    if (!newTenant) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal_server_error',
      });
    }

    // now register a user to the the newTenant created
    const userExists = (
      await tx.select().from(user).where(eq(user.email, input.userEmail))
    ).at(0);

    if (userExists) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'user_already_exits',
      });
    }

    const generatedUserId = generateUUID(8);

    const newUser = (
      await tx
        .insert(user)
        .values({
          id: generatedUserId,
          name: input.userName,
          email: input.userEmail,
          tenantId: newTenant.id,
        } as any)
        .returning()
    ).at(0);

    if (!newUser) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal_server_error',
      });
    }

    /**
     * setup the account for the user in the database
     */
    const hashPassword = await hash(input.password, 13);
    const generatedUUID = generateUUID(8);

    const userAccount = (
      await tx
        .insert(account)
        .values({
          id: generatedUUID,
          userId: newUser?.id,
          providerId: 'credentials',
          password: hashPassword,
        } as any)
        .returning()
    ).at(0);

    if (!userAccount) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal_server_error',
      });
    }

    // later assign role to the user in userRoles table
    const roleName = 'superAdmin';
    const newTenantRole = (
      await tx
        .insert(roles)
        .values({
          tenantId: newTenant?.id,
          name: roleName,
        })
        .returning()
    ).at(0);

    if (!newTenantRole) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal_server_error',
      });
    }

    const assignUserRole = (
      await tx
        .insert(userRoles)
        .values({
          roleId: newTenantRole?.id,
          tenantId: newTenant?.id,
          userId: newUser?.id,
        })
        .returning()
    ).at(0);

    if (!assignUserRole) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'internal_server_error',
      });
    }

    // send mail to email with token for verification process.
    return {
      success: true,
      message: 'SignUp Successful',
    };
  });

  return transactionResponse;
};
