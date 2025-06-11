import crypto from 'node:crypto';

/**
 * Note: crypto module to generate random key with variable length.
 * @param len -> type
 * @returns length 8 hex value.
 */
export function generateUUID(len: number) {
  const generatedUUID = crypto.randomUUID().substring(0, 8);
  return generatedUUID;
}
