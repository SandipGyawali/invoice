'use client';
import { useState } from 'react';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@invoice/ui/stepper';
import SignUpStep1Form from '@/modules/auth/signup/step1.form';
import SignUpStep2Form from '@/modules/auth/signup/step2.form';
import SignUpStep3Form from '@/modules/auth/signup/step3.form';
import { Button } from '@invoice/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const steps = [1, 2, 3];

function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <div className="mx-auto relative w-full space-y-16 text-center">
        {currentStep > 1 && (
          <Button
            variant="outline"
            size="sm"
            className="absolute -top-13"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <ArrowLeft />
            Back
          </Button>
        )}
        <Stepper
          className="max-w-lg"
          value={currentStep}
          onValueChange={setCurrentStep}
        >
          {steps.map((step) => (
            <StepperItem key={step} step={step} className="not-last:flex-1">
              <StepperTrigger asChild>
                <StepperIndicator />
              </StepperTrigger>
              {step < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
        <div className="flex w-full max-w-lg mx-auto justify-center">
          {currentStep === 1 && (
            <SignUpStep2Form
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && (
            <SignUpStep1Form
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              className=""
            />
          )}
          {currentStep === 3 && <SignUpStep3Form />}
        </div>
      </div>

      <div className="text-center mt-6 text-sm">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </>
  );
}

export default SignUpPage;
