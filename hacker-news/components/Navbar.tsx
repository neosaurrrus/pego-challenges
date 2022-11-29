import React from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav>
      {user ? (
        <div>
          <Image
            src={user.picture as string}
            width={50}
            height={50}
            alt={user.name as string}
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <a href="/api/auth/logout">Logout</a>
        </div>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </nav>
  );
}
