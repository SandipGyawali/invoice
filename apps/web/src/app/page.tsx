'use client';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/utils/trpc';
import { useMutation } from '@tanstack/react-query';

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
      <Button
        variant="default"
        // className="bg-red-500"
        // disabled={isPending}
        // onClick={() => mutate()}
        // className="border rounded-lg"
      >
        Login
      </Button>
      <h1 className="text-primary">Hello</h1>
    </>
  );
}
