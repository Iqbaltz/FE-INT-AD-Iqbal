"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login", redirect: true });
  };
  return (
    <nav className="bg-yellow-500 text-white">
      <div className="flex justify-between items-center mx-auto py-2 max-w-[800px] container">
        <Link href={"/"}>
          <h1 className="font-bold">YAPPER</h1>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="flex items-center gap-4">
                <button className="bg-yellow-400 px-4 py-1 rounded-xl font-bold">
                  + Post Yap
                </button>
                <p className="opacity-75 font-bold">{session.user?.name}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <button>Login</button>
              </Link>
              |
              <Link href={"/register"}>
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
