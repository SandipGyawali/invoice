'use client';
import { useState } from 'react';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@invoice/ui/stepper';
import SignUpForm from '@/modules/auth/signup.form';
import SignUpStep1Form from '@/modules/auth/signup/step1.form';
import SignUpStep2Form from '@/modules/auth/signup/step2.form';

const steps = [1, 2];

function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map((step) => (
          <StepperItem key={step} step={step} className="not-last:flex-1">
            <StepperTrigger asChild>
              <StepperIndicator />
            </StepperTrigger>
            {step < steps.length && <StepperSeparator />}
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex justify-center space-x-4">
        {currentStep === 1 && (
          <SignUpStep1Form
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && <SignUpStep2Form />}
        {currentStep === 3 && <>Completed</>}

        {/* <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep > steps.length}
        >
          Next step
        </Button> */}

        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
