"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import Login from "./Login/page";
import { useEffect, useState } from "react";
import { prisma } from "~/lib/prisma";
import { faker } from "@faker-js/faker";


//for faker
// export function main() {
//   Array.from({ length: 100 }).map(async (_, i) => {
//     await prisma.interests.create({
//       data: {
//         id: faker.string.uuid(),
//         interest: faker.commerce.productName(),
//       },
//     });
//   });
// }

export default function Home() {
  const [isAuthorised, setIsAuthorised] = useState(false);

  const router = useRouter();

  let token;

  useEffect(() => {
    token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    } else {
      setIsAuthorised(true);
    }
  }, []);

  return <div>{isAuthorised ? <></> : <Login />}</div>;
}
