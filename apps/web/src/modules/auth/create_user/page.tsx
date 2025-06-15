'use client';
import { Link } from '@/i18n/navigation';
import { useTRPC } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@invoice/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@invoice/ui/form';
import { Input } from '@invoice/ui/input';
import { cn } from '@invoice/ui/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const _schema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().trim().email().optional(),
});

type _Schema = z.infer<typeof _schema>;

interface Props {
  className?: string;
  props?: any;
}

function CreateUserForm({ className, props }: Props) {
  const form = useForm<_Schema>({
    resolver: zodResolver(_schema),
    defaultValues: {},
  });

  const submit = (input: _Schema) => {};

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-6', className)}
        onSubmit={form.handleSubmit(submit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter credentials below to login to your account
          </p>
        </div>
        <div className="grid gap-8 mt-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-start">Name</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Enter Name"
                    className={`
                      ${
                        fieldState.error && 'border-red-500 focus:ring-red-500'
                      }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm text-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-start">Email</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="Enter Email"
                    className={`
                          ${
                            fieldState.error &&
                            'border-red-500 focus:ring-red-500'
                          }
                        `}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm text-start" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default CreateUserForm;
