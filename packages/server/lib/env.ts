import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string(),
  DB_NAME: z.string(),
  DB_URL: z.string().url(),
});

export const ENVIRONMENT = envSchema.parse(process.env);
