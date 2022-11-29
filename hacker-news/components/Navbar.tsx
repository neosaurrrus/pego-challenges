import React from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="bg-gray-800 px-4 h-[50px] items-center">
      {user ? (
        <div className="flex flex-row gap-8 justify-end items-center ">
          <Image
            src={user.picture as string}
            width={50}
            height={50}
            alt={user.name as string}
          />
          <span>{user.name}</span>
          <span>{user.email}</span>
          <a href="/api/auth/logout">Logout</a>
        </div>
      ) : (
        <a className="flex justify-end py-3" href="/api/auth/login">
          Login
        </a>
      )}
    </nav>
  );
}
