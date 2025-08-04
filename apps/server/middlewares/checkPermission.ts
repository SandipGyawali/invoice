import { TRPCError } from '@trpc/server';
import { trpc } from '../lib/trpc.ts';

export const checkPermission = (slug: string) => {
  return trpc.middleware(async ({ ctx, next }) => {
    const hasPermission = ctx.permissions.some((perm) => perm === slug);

    if (!hasPermission) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You don't have the required permission to access the module`,
      });
    }

    return next();
  });
};
