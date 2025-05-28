import { trpc } from "../lib/trpc.ts";
import { authRouter } from "./auth/index.ts";

/**
 * base index application router
 */
export const appRouter = trpc.router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
