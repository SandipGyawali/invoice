'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@invoice/ui/form';
import { Input } from '@invoice/ui/input';
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@invoice/ui/stepper';
import { Button } from '@invoice/ui/button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zClientSchema, ZClientSchemaInterface } from '@/schema/clientSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';

function AddClientForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<ZClientSchemaInterface>({
    resolver: zodResolver(zClientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      mobile: '',
      email: '',
      gender: 'Male',
      dob: '',
      vatId: '',
      taxId: '',
    },
  });

  const steps = [
    {
      step: 1,
      title: 'Personal Info',
      description: 'Your identity',
      descriptionTwo: 'Enter your valid personal information.',
    },
    {
      step: 2,
      title: 'Address',
      description: 'Your resident',
      descriptionTwo: 'Enter valid address information.',
    },
    {
      step: 3,
      title: 'Tax & VAT',
      description: 'Business identity',
      descriptionTwo: 'Enter your valid business identity.',
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (values: ZClientSchemaInterface) => {
    console.log('Submit:', values);
    // handle API or continue next step
    nextStep();
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Add New Client</PageTitle>
      </PageHeader>
      <PageContent>
        <div className="mt-10 text-center">
          <Stepper value={currentStep}>
            {steps.map(({ step, title, description }, index) => (
              <StepperItem
                key={step}
                step={step}
                className="flex-1 max-md:item-start"
              >
                <StepperTrigger
                  onClick={() => setCurrentStep(index + 1)}
                  className="rounded max-md:flex-col"
                >
                  <StepperIndicator />
                  <div className="text-center md:text-left">
                    <StepperTitle>{title}</StepperTitle>
                    <StepperDescription className="max-sm:hidden">
                      {description}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                {step < steps.length && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>

          <Card className="mt-6 text-left">
            <CardHeader>
              <CardTitle className="text-lg">
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {steps[currentStep - 1].descriptionTwo}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {currentStep === 1 && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="John" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Doe" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Eg: example@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <Input
                                  required
                                  type="tel"
                                  inputMode="numeric"
                                  maxLength={10}
                                  placeholder="eg: 9851029383"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Eg: 123 Kathmandu Marg"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address (cont.)</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Apartment, suite, unit, building, floor, etc."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g. Kathmandu"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Eg: Bagmati"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  inputMode="numeric"
                                  placeholder="Eg: 44600"
                                  min={0}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Eg: Nepal"
                                  min={0}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  {currentStep === 3 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* VAT ID */}
                      <FormField
                        control={form.control}
                        name="vatId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>VAT ID</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Eg: 123456789"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Tax ID */}
                      <FormField
                        control={form.control}
                        name="taxId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax ID</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Eg: PAN1234567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      variant="outline"
                    >
                      Previous
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">Create</Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageContainer>
  );
}

export default AddClientForm;
