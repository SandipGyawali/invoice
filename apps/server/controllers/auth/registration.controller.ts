import { z } from 'zod';
import { publicProcedure, trpc } from '~/lib/trpc.ts';
import { isNameValid } from '~/utils/validName.ts';
import { isEmailTemporary } from '~/utils/temp.mail.domains.ts';
import { db } from '~/db/db.ts';
import { account, user } from '~/models/user.ts';
import { eq } from 'drizzle-orm';
import { tenants } from '~/models/tenant.ts';
import { hash } from 'bcryptjs';
import { passwordSchema } from '~/schema/authSchema';
import { generateUUID } from '~/utils/generateUUID';

const _userRegistrationSchema = z.object({
  name: z.string().trim().min(1).max(30).refine(isNameValid),
  email: z.string().email().trim(),
  password: passwordSchema,
});

export const _orgRegistrationSchema = z.object({
  name: z.string().trim().min(1).max(30).refine(isNameValid),
  email: z.string().trim().email(),
});

export const orgRegistrationController = publicProcedure
  .input(_orgRegistrationSchema)
  .mutation(async ({ input }) => {
    const temporaryEmail = isEmailTemporary(input.email);

    if (temporaryEmail) {
      return {
        success: false,
        reason: 'temporaryMailNotAllowed',
      };
    }

    const emailExits = (
      await db.select().from(tenants).where(eq(tenants.email, input.email))
    ).at(0);

    if (emailExits) {
      return {
        success: false,
        reason: 'userAlreadyExists',
      };
    }

    const newUser = (
      await db
        .insert(tenants)
        .values({
          name: input.name,
          email: input.email,
        } as any)
        .returning()
    ).at(0);

    if (!newUser) {
      return {
        success: false,
        reason: 'userRegistrationError',
      };
    }

    // send token to mail for email verification
    // also add password field so that encryption can be done.

    return {
      success: true,
      reason: 'userRegistrationSuccessful',
    };
  });

/**
 * Note: User Registration controller to register the user with the super admin after organization is created
 */
export const userRegistrationController = publicProcedure
  .input(_userRegistrationSchema)
  .mutation(async ({ input }) => {
    // check email with every expects
    // 1. check if it is temporary email
    if (isEmailTemporary(input.email)) {
      return {
        success: false,
        reason: 'temporaryMailNotAllowed',
      };
    }

    const userExists = (
      await db.select().from(user).where(eq(user.email, input.email))
    ).at(0);

    if (userExists) {
      return {
        success: false,
        reason: 'userAlreadyExists',
      };
    }

    /**
     * setup the account for the user in the database
     */
    const hashPassword = await hash(input.password, 13);
    const generatedUUID = generateUUID(8);

    const userAccount = (
      await db
        .insert(account)
        .values({
          id: generatedUUID,
          userId: user?.id,
          providerId: 'credentials',
          password: hashPassword,
        } as any)
        .returning()
    ).at(0);

    if (!userAccount)
      return {
        success: false,
        reason: 'errorWhileCreatingUserAccount',
      };

    // send mail to email with token for verification process.
    return {
      success: true,
      token: 123455,
    };
  });
