'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/utils/trpc';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const _schema = z.object({
  name: z.string().trim(),
  email: z.string().email().trim(),
  plan: z.string().trim().default('basic'),
  status: z.number().default(1),
  subscriptionStart: z.string().default(new Date().toString()),
  subscriptionEnd: z.string().default(new Date().toString()),
});

export function TenantForm() {
  const trpc = useTRPC();
  const form = useForm({
    resolver: zodResolver(_schema),
  });

  /**
   * mutation hook
   */
  const { mutate: addTenant, isPending: addTenantPending } = useMutation(
    trpc.tenant.addTenant.mutationOptions()
  );

  function submit(input: z.infer<typeof _schema>) {
    addTenant(
      {
        ...input,
      },
      {
        onSuccess: () => {},
        onError: (err) => {
          const parsedError = JSON.parse(err?.message);

          if (Array.isArray(parsedError)) {
            parsedError?.forEach((err) => {
              const fieldName = err.path?.[0];
              if (fieldName) {
                form.setError(fieldName, {
                  type: err.code,
                  message: err.message,
                });
              }
            });
          } else {
          }
        },
      }
    );
  }

  return (
    <Card className="max-w-full lg:max-w-3xl mx-auto">
      <form
        action=""
        onSubmit={form.handleSubmit(submit)}
        className="space-y-5"
      >
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Setup New Tenant</CardTitle>
          <CardDescription>sdf</CardDescription>
        </CardHeader>

        <CardContent className="my-4 space-y-6">
          <Form {...form}>
            <FormField
              control={form.control}
              name={`name`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    autoFocus
                    placeholder="Enter Name"
                    className={`
                        ${
                          fieldState.error &&
                          'border-red-500 focus:ring-red-500'
                        }
                    `}
                    {...field}
                  />
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`email`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    autoFocus
                    placeholder="Enter Name"
                    className={`
                        ${
                          fieldState.error &&
                          'border-red-500 focus:ring-red-500'
                        }
                    `}
                    {...field}
                  />
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`email`}
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subscription Start</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full bg-transparent justify-between font-normal"
                      >
                        Select a Date
                        {/* {date ? date.toLocaleDateString() : 'Select date'} */}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        // selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          // setDate(date);
                          // setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`email`}
              render={({ field, fieldState }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subscription Start</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full bg-transparent justify-between font-normal"
                      >
                        Select a Date
                        {/* {date ? date.toLocaleDateString() : 'Select date'} */}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        // selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          // setDate(date);
                          // setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </Form>
        </CardContent>

        <CardFooter className="border-t p-4 flex items-center justify-end">
          <Button type="submit" disabled={addTenantPending} size="sm">
            {addTenantPending && <Loader2 />}
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
