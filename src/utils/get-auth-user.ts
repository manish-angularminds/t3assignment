"use server";

import { redirect } from "next/navigation";
import { createAsyncCaller } from "~/app/api/trpc/trpc-router";

export const getAuthUser = async ({
  shouldRedirect = false,
  id,
}: {
  shouldRedirect: boolean;
  id: string;
}) => {
  const caller = await createAsyncCaller();

  return caller
    .getUserById({ id })
    .then((result) => {
      console.log(result, "user");
      result.data.user;
    })
    .catch((e) => {
      if (e.code === "UNAUTHORIZED" && shouldRedirect) {
        redirect("/Login");
      }

      return null;
    });
};
