import { initTRPC } from '@trpc/server';

/**
 * trpc instance
 */
export const trpc = initTRPC.create();

/**
 * Create an unprotected procedure
 */
export const publicProcedure = trpc.procedure;

export const authProcedure = trpc.procedure.use(async function isAuth(opts) {
  const { ctx } = opts;

  console.log(ctx);

  return opts.next();
});
