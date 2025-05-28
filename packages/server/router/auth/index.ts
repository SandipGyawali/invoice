import { trpc } from "../../lib/trpc.ts";
import { loginRoute } from "./login.ts";

export const authRouter = trpc.router({
  login: loginRoute,
});
