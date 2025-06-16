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
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const _schema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().trim().email().optional(),
});

type _Schema = z.infer<typeof _schema>;

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  className?: string;
  props?: any;
}

function SignUpStep1Form({ setCurrentStep, className, props }: Props) {
  const { updateOrg, org } = useSignUpStore();
  const form = useForm<_Schema>({
    resolver: zodResolver(_schema),
    defaultValues: {
      ...org,
    },
  });

  const submit = (input: _Schema) => {
    updateOrg(input);
    setCurrentStep(3);
  };

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-6', className)}
        onSubmit={form.handleSubmit(submit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your organization</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your organization details to get started
          </p>
        </div>
        <div className="mt-6 grid gap-8">
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
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SignUpStep1Form;
