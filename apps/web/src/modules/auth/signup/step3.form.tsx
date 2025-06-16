'use client';
import { useSignUpStore } from '@/store/signupStore';
import { Button } from '@invoice/ui/button';
import { Form } from '@invoice/ui/form';
import { cn } from '@invoice/ui/lib/utils';
import { useForm } from 'react-hook-form';
import { _schema as step1Schema } from './step1.form';
import { _schema as step2Schema } from './step2.form';
import { useTRPC } from '@/utils/trpc';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle, Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  props?: any;
}

function SignUpStep3Form({ className, props }: Props) {
  const router = useRouter();
  const trpc = useTRPC();
  const { user, org } = useSignUpStore();
  const form = useForm();
  const [counter, setCounter] = useState(5);

  const { mutate, isPending, isSuccess } = useMutation(
    trpc.auth.requestTenantUserRegistration.mutationOptions()
  );

  const submit = () => {
    const validateStep1Data = step1Schema.safeParse(org);
    if (!validateStep1Data.success) {
      console.log('Step 1 data');
    }

    const validateStep2Data = step2Schema.safeParse(user);

    if (!validateStep2Data.success) {
      console.log('Step 2 data');
    }

    const modifyData = {
      userName: user.name,
      userEmail: user.email ?? '',
      orgName: org.name,
      orgEmail: org?.email,
      password: user.password,
    };

    console.log(modifyData);

    mutate(modifyData, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSuccess) {
      interval = setInterval(() => {
        setCounter((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push('/auth/verify-otp');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSuccess, router]);

  return (
    <>
      {!isSuccess ? (
        <Form {...form}>
          <form
            className={cn('flex w-full flex-col gap-6', className)}
            onSubmit={form.handleSubmit(submit)}
            {...props}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Proceed Your Information</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Are you sure you want to proceed with the Information.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Card className="text-center p-6">
          <CardHeader>
            <CheckCircle className="mx-auto text-primary h-12 w-12" />
            <CardTitle className="mt-4 text-xl">
              Registration Successful
            </CardTitle>
            <CardDescription>
              Your account has been created successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4">
            <p className="text-muted-foreground">
              Redirecting to email-verification for email:{' '}
              <span className="font-semibold">{user?.email} in </span>
              <span className="text-xl font-semibold text-primary">
                {counter} seconds.
              </span>{' '}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default SignUpStep3Form;
