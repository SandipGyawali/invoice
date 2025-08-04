import { eq } from 'drizzle-orm';
import { db } from '../../db/db.ts';
import { account, user } from '../../models/user.ts';
import { TRPCError } from '@trpc/server';
import type { TZLoginSchema } from '../../schema/authSchema.ts';
import { compare } from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../../utils/jwt.ts';
import { getUserPermissionSlugs } from '../../utils/userPermissionSlug.ts';

type LoginUserOptions = {
  ctx: {};
  input: TZLoginSchema;
};

export const loginUserHandler = async ({ input }: LoginUserOptions) => {
  // for now skip otp verification
  const userExists = (
    await db.select().from(user).where(eq(user.email, input.email))
  ).at(0);

  if (!userExists) {
    throw new TRPCError({
      message: "User with provided email doesn't exists",
      code: 'BAD_REQUEST',
    });
  }

  //   find user account
  const userAccount = (
    await db.select().from(account).where(eq(account.userId, userExists?.id))
  ).at(0);

  if (!userAccount || !userAccount.password) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Account not found or missing password',
    });
  }

  const isValidPassword = await compare(input.password, userAccount.password);

  if (!isValidPassword) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid credentials',
    });
  }

  //   check if the user is banned or not
  if (userExists.banned) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: `User is banned. Reason: ${
        userExists?.banReason ?? 'unspecified'
      }`,
    });
  }

  // get the permission slugs for the user
  const slugs = await getUserPermissionSlugs({
    userId: userExists.id,
    tenantId: userExists.tenantId as string,
  });

  //   create jwt token and with refresh token and upsert in account table then
  // return to the frontend as response
  const accessToken = signAccessToken({
    userId: userExists?.id,
    tenantId: userExists?.tenantId,
    permissions: slugs,
  });

  const refreshToken = signRefreshToken({
    userId: userExists.id,
    tenantId: userExists?.tenantId,
  });

  const now = new Date();
  const accessTokenExpiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24); // 1 day
  const refreshTokenExpiresAt = new Date(
    now.getTime() + 1000 * 60 * 60 * 24 * 7
  ); // 7 days

  const updatedAccountToken = (
    await db
      .update(account)
      .set({
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpiresAt: accessTokenExpiresAt,
        refreshTokenExpiresAt: refreshTokenExpiresAt,
      })
      .returning()
  ).at(0);

  if (!updatedAccountToken) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'internal_server_error',
    });
  }

  return {
    success: true,
    message: 'Login Successful',
    user: {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      tenantId: userExists.tenantId,
      createdAt: userExists.createdAt,
    },
    token: {
      accessToken: accessToken,
      refreshToken: refreshToken,
      tokenExpiresAt: accessTokenExpiresAt,
    },
    permissions: slugs,
  };
};
