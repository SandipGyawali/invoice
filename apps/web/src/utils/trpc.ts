import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@multi-tenant/server";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
