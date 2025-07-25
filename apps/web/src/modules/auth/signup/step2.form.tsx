'use client';
import { useSignUpStore } from '@/store/signupStore';
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
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const _schema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().trim().email().optional(),
  password: z.string().trim().length(8),
});

type _Schema = z.infer<typeof _schema>;

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  className?: string;
  props?: any;
}

function SignUpStep2Form({ setCurrentStep, className, props }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const { user, updateUser } = useSignUpStore();
  const form = useForm<_Schema>({
    resolver: zodResolver(_schema),
    defaultValues: {
      ...user,
    },
  });

  const submit = (input: _Schema) => {
    updateUser(input);
    setCurrentStep(2);
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-6', className)}
        onSubmit={form.handleSubmit(submit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create a User</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your information to create a user
          </p>
        </div>
        <div className="grid gap-8">
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
                      ${fieldState.error && 'border-red-500 focus:ring-red-500'}
                    `}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm text-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-start">Password</FormLabel>
                <div className="relative">
                  <Input
                    // className="pe-9"
                    className={`
                      ${fieldState.error && 'border-red-500 focus:ring-red-500'}
                    `}
                    {...field}
                    placeholder="Enter Password"
                    type={isVisible ? 'text' : 'password'}
                  />
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? (
                      <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                      <EyeIcon size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignUpStep2Form;
