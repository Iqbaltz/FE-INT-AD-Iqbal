"use client";
import { RegisterEntity, RegisterSchema } from "@/src/entity/auth-entity";
import { authService } from "@/src/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  //eslint-disable-next-line
  const form = useForm<RegisterEntity>({
    resolver: zodResolver(RegisterSchema),
  });

  const { register } = authService;

  // Handle form submission
  const handleRegister = async (data: RegisterEntity) => {
    const res = await register(data);
    console.log("res", res);
    if (res?.access_token) {
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
          alert("Register failed");
        }
      });
    }
  };

  // Handle form submission
  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem("token", data.token); // Save the token
  //       router.push("/"); // Redirect after successful registration
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || "Registration failed");
  //     }
  //   } catch (error) {
  //     setError("An error occurred. Please try again.");
  //     console.error("Error during registration:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="my-4">
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="flex flex-col space-y-4 bg-white mx-auto p-4 rounded-xl max-w-[400px]"
      >
        <h2 className="font-bold text-yellow-500">Register</h2>
        <input
          className="bg-yellow-50 px-2 py-1"
          type="email"
          placeholder="Email"
          {...form.register("email")}
        />
        <input
          className="bg-yellow-50 px-2 py-1"
          type="text"
          placeholder="Name"
          {...form.register("name")}
        />
        <input
          className="bg-yellow-50 px-2 py-1"
          type="password"
          placeholder="Password"
          {...form.register("password")}
        />
        <input
          className="bg-yellow-50 px-2 py-1"
          type="password"
          placeholder="Password Confirmation"
          required
          {...form.register("password_confirmation")}
        />
        {/* {form.formState.errors && <p className="text-red-500">{form.formState.errors.email?.message}</p>} */}
        <button
          className="bg-yellow-400 px-2 py-1 text-white"
          type="submit"
          disabled={form.formState.isLoading}
        >
          Register
        </button>
      </form>
    </div>
  );
}
