import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';
import { ENVIRONMENT } from './env.ts';

export type TRPCContext = {
  tenantId?: string | null;
  userId?: string | null;
  permissions: string[];
};

type JWTPayload = {
  tenantId?: string | null;
  userId?: string | null;
  permissions: string[];
};

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;

  let decodedPayload: JWTPayload | null = null;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(
        token,
        ENVIRONMENT['ACCESS_TOKEN_SECRET']
      ) as JWTPayload;

      decodedPayload = decoded;
    } catch (err) {
      console.warn('Invalid or expired JWT Token');
    }
  }

  return {
    tenantId: decodedPayload?.tenantId ?? null,
    userId: decodedPayload?.userId ?? null,
    permissions: decodedPayload?.permissions ?? [],
  };
};
