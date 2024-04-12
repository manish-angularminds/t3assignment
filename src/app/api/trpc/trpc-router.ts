import { getUser, getUserById, updateUser } from "~/lib/user-schema";
import type { UpdateUserInput } from "~/lib/user-schema";
import authRouter from "~/server/auth.route";
import { getInterestHandler } from "~/server/interest-controller";
import {
  getUserByIdHandler,
  getUserHandler,
  updateUserHandler,
} from "~/server/user-controller";
import { createContext } from "~/utils/trpc-context";
import { protectedProcedure, t } from "~/utils/trpc-server";

const statusCheckRouter = t.router({
  statusChecker: t.procedure.query(() => {
    return {
      status: "success",
      message: "Welcome to trpc server",
    };
  }),
});

const userRouter = t.router({
  getUser: protectedProcedure
    .input(getUser)
    .mutation(({ input }: { input: { email: string } }) =>
      getUserHandler({ input }),
    ),
  getUserById: protectedProcedure
    .input(getUserById)
    .mutation(({ input }: { input: { id: string } }) =>
      getUserByIdHandler({ input }),
    ),
  updateUser: protectedProcedure
    .input(updateUser)
    .mutation(({ input }: { input: UpdateUserInput }) =>
      updateUserHandler({ input }),
    ),
});

const interestRouter = t.router({
  getInterests: protectedProcedure.query(() => getInterestHandler()),
});

export const appRouter = t.mergeRouters(
  statusCheckRouter,
  userRouter,
  authRouter,
  interestRouter,
);

export const createCaller = t.createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
