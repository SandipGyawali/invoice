import jwt from 'jsonwebtoken';
import { ENVIRONMENT } from '../lib/env.ts';

export function signAccessToken(payload) {
  const accessToken = jwt.sign(payload, ENVIRONMENT.ACCESS_TOKEN_SECRET);
  return accessToken;
}

export function signRefreshToken(payload) {
  const refreshToken = jwt.sign(payload, ENVIRONMENT.REFRESH_TOKEN_SECRET);
  return refreshToken;
}
