import { initTRPC, TRPCError } from '@trpc/server';
import type { TRPCContext } from './context';
import superjson from 'superjson';

/**
 * trpc instance
 */
export const trpc = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape }) => {
    return shape;
  },
});

/**
 * Create an unprotected procedure
 */
export const publicProcedure = trpc.procedure;

export const privateProcedure = trpc.procedure.use(({ ctx, next }) => {
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Should login to access information',
    });
  }

  return next({
    ctx: {
      user,
    },
  });
});

/**
 * for this user must be part of the organization where
 * the tenant subscription is active at present time
 */
export const proProcedure = privateProcedure.use(({ ctx, next }) => {
  return next();
});
