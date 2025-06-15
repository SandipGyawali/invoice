'use client';
import { useSignUpStore } from '@/store/signupStore';
import { Button } from '@invoice/ui/button';
import { Form } from '@invoice/ui/form';
import { cn } from '@invoice/ui/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { _schema as step1Schema } from './step1.form';
import { _schema as step2Schema } from './step2.form';

interface Props {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  className: string;
  props: any;
}

function SignUpStep3Form({ setCurrentStep, className, props }: Props) {
  const { user, org } = useSignUpStore();
  const form = useForm();

  const submit = () => {
    console.log('submitted');

    const validateStep1Data = step1Schema.safeParse(org);
    if (!validateStep1Data.success) {
      console.log('Step 1 data');
    }

    const validateStep2Data = step2Schema.safeParse(user);

    if (!validateStep2Data.success) {
      console.log('Step 2 data');
    }

    // const {} = useMutation();
  };

  return (
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

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SignUpStep3Form;
