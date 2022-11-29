import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="bg-gray-800 px-8 h-[50px] items-center flex justify-between ">
      <p>Hacker News App</p>

      {user && (
        <div className="flex flex-row gap-8 justify-end items-center">
          {user.picture && (
            <Image
              src={user.picture as string}
              width={50}
              height={50}
              alt={user.name as string}
            />
          )}
          <span>{user.name}</span>
          <span>{user.email}</span>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      )}
    </nav>
  );
}
