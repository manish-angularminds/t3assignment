import {
  createUser,
  loginUser,
  CreateUserInput,
  LoginUserInput,
} from "~/lib/user-schema";
import { protectedProcedure, publicProcedure, t } from "../utils/trpc-server";
import {
  loginHandler,
  logOutHandler,
  registerHandler,
} from "./auth-controller";

const authRouter = t.router({
  registerUser: publicProcedure
    .input(createUser)
    .mutation(({ input }: { input: CreateUserInput }) =>
      registerHandler({ input }),
    ),

  loginUser: publicProcedure
    .input(loginUser)
    .mutation(({ input }: { input: LoginUserInput }) =>
      loginHandler({ input }),
    ),

  logOutUser: protectedProcedure.mutation(() => logOutHandler()),
});

export default authRouter;
