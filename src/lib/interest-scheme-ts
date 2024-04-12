import { object, string, TypeOf } from "zod";

export const getInterests = object({
  interest: string({ required_error: " is required" }).min(
    1,
    "Name is required",
  ),
});

export type GetInterestsInput = TypeOf<typeof getInterests>;
