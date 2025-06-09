import { initTRPC } from "@trpc/server";

/**
 * trpc instance
 */
export const trpc = initTRPC.create();

/**
 * Create an unprotected procedure
 */
export const publicProcedure = trpc.procedure;
