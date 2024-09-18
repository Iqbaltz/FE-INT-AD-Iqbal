"use client";
import { LoginEntity, LoginSchema } from "@/src/entity/auth-entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  //eslint-disable-next-line
  const form = useForm<LoginEntity>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginEntity) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
      redirect: false,
      //eslint-disable-next-line
    }).then(({ ok }: any) => {
      if (ok) {
        router.push("/");
        router.refresh();
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <div className="my-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 bg-white mx-auto p-4 rounded-xl max-w-[400px]"
      >
        <h2 className="font-bold text-yellow-500">Login</h2>
        <input
          {...form.register("email")}
          className="bg-yellow-50 px-2 py-1"
          type="email"
          placeholder="Email"
        />
        <input
          {...form.register("password")}
          className="bg-yellow-50 px-2 py-1"
          type="password"
          placeholder="Password"
        />
        <button className="bg-yellow-400 px-2 py-1 text-white" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
