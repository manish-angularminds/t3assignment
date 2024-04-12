import { array, object, string, TypeOf } from "zod";

export const createUser = object({
  name: string({ required_error: "Name is required" }).min(
    1,
    "Name is required",
  ),
  email: string({ required_error: "Email is required" }).min(
    1,
    "Invalid Email",
  ),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password Incorrect",
  ),
});

export const loginUser = object({
  email: string({ required_error: "Email is required" }).min(
    1,
    "Invalid Email",
  ),
  password: string({ required_error: "Password is required" }).min(
    1,
    "Password Incorrect",
  ),
});

export const updateUser = object({
  id: string().min(1, "id Incorrect"),
  interests: array(string()).optional(),
});

export const getUser = object({
  email: string({ required_error: "Email is required" }).min(
    1,
    "Invalid Email",
  ),
});

export const getUserById = object({
  id: string({ required_error: "id is required" }).min(1, "Invalid id"),
});

export type CreateUserInput = TypeOf<typeof createUser>;
export type LoginUserInput = TypeOf<typeof loginUser>;
export type UpdateUserInput = TypeOf<typeof updateUser>;
