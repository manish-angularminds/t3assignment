import { CreateUserInput, LoginUserInput } from "~/lib/user-schema";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import {faker} from "@faker-js/faker"
import { cookies } from "next/headers";
// import { main } from "~/app/page";

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {
    const hashPassword = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashPassword,
      },
    });

    const { password, ...userWithoutPassword } = user;

    return {
      status: "success",
      data: {
        user: userWithoutPassword,
      },
    };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Email already exists",
      });
    }

    throw err;
  }
};

// function to fetch 100 data 

// function main() {
//   Array.from({ length: 100 }).map(async (_, i) => {
//     await prisma.interests.create({
//       data: {
//         id: faker.string.uuid(),
//         interest: faker.commerce.productName(),
//       },
//     });
//   });
// }

export const loginHandler = async ({ input }: { input: LoginUserInput }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid email or password",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "JWT secret is not defined.",
      });
    }

    const token = jwt.sign({ sub: user.id }, secret, {
      expiresIn: 60 * 60,
    });

    const cookieOptions = {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
    };

    cookies().set("token", token, cookieOptions);

    return {
      status: "success",
      token,
    };
  


  } catch (err: any) {
    throw err;
  }
};

export const logOutHandler = async () => {
  try {
    cookies().set("token", "", { maxAge: -1 });

    return { status: "success" };
  } catch (err: any) {
    throw err;
  }
};
