'use client';
import { HeroSection } from '@/components/custom/HeroSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
   <div><HeroSection></HeroSection></div>
  );
}
