import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@invoice/server';

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
