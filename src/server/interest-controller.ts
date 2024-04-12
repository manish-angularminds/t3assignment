import { TRPCError } from "@trpc/server";
import { prisma } from "../lib/prisma";

export const getInterestHandler = async () => {
  try {
    const interests = await prisma.interests.findMany();

    return {
      status: "success",
      data: {
        interests,
      },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};
