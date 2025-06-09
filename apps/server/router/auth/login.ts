import { trpc } from "../../lib/trpc.ts";

const loginRoute = trpc.procedure
  //   .input(authSchema.login)
  .mutation(async ({ input, ctx }) => {
    console.log(ctx);
    console.log(input);

    // fetch from database
    const user = {};

    if (!user) return "err_invalid_credentials";

    // verify the password
    const passwordVerified = true;

    if (!passwordVerified) return "err_invalid_credentials";

    const tokens = {
      accessToken: "",
      refreshToken: "",
    };

    return {
      tokens,
      data: [
        {
          id: 1,
          name: "Sandip Gyawali",
          email: "sandip@gmail.com",
        },
      ],
    };
  });

export { loginRoute };
