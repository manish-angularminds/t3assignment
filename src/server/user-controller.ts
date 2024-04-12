import { Context } from "../utils/trpc-context";
import { TRPCError } from "@trpc/server";
import { prisma } from "../lib/prisma";
import { UpdateUserInput, updateUser } from "~/lib/user-schema";

export const getUserHandler = async ({
  input,
}: {
  input: { email: string };
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const getUserByIdHandler = async ({
  input,
}: {
  input: { id: string };
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: input.id },
    });

    return {
      status: "success",
      data: {
        user,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

export const updateUserHandler = async ({
  input,
}: {
  input: UpdateUserInput;
}) => {
  try {
    const id = input.id.toString();
    const interests = input.interests ?? [];

    const user = await prisma.user.update({
      where: { id },
      data: { interests },
    });

    const { password, ...userWithoutPassword } = user;

    return {
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
