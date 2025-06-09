"use client";
import { useTRPC } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();

  const {
    data: loginData,
    mutate,
    isPending,
  } = useMutation(trpc.auth.login.mutationOptions());

  console.log(loginData);
  console.log(isPending);

  return (
    <>
      <div className="">Hello</div>;
      <button
        disabled={isPending}
        onClick={() => mutate()}
        className="border rounded-lg"
      >
        Login
      </button>
    </>
  );
}
