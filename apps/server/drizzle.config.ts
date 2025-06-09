import { defineConfig } from "drizzle-kit";
import { ENVIRONMENT } from "./lib/env";

// drizzle config setup
export default defineConfig({
  schema: "./models/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: ENVIRONMENT["DB_URL"],
  },
  verbose: ENVIRONMENT.NODE_ENV === "development",
  strict: true,
});
