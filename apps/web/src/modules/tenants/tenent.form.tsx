'use client';
import { Button } from '@invoice/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodError } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/utils/trpc';
import { ChevronDownIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@invoice/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@invoice/ui/popover';
import { format } from 'date-fns';
import { cn } from '@invoice/ui/lib/utils';
import { TRPCClientError } from '@trpc/client';

const _schema = z.object({
  name: z.string(),
  email: z.string().email().trim(),
  plan: z.string().trim().default('basic'),
  status: z.number().default(1),
  subscriptionStart: z.coerce.date(),
  subscriptionEnd: z.coerce.date(),
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
          if (err instanceof TRPCClientError) {
            if (err instanceof ZodError) {
              console.log(err);
              console.log(err.message);
              console.log('This is toast error');
            }
          }
          // const parsedError = JSON.parse(err?.message);
          // console.log(parsedError);

          // if (Array.isArray(parsedError)) {
          //   parsedError?.forEach((err) => {
          //     const fieldName = err.path?.[0];
          //     if (fieldName) {
          //       form.setError(fieldName, {
          //         type: err.code,
          //         message: err.message,
          //       });
          //     }
          //   });
          // } else {
          //   toast.error(parsedError?.message);
          // }
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
              name={`subscriptionStart`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subscription Start</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full bg-transparent justify-between font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? format(field?.value, 'PPP')
                            : 'Select a Date'}
                          <ChevronDownIcon />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`subscriptionEnd`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Subscription Start</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full bg-transparent justify-between font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? format(field?.value, 'PPP')
                            : 'Select a Date'}
                          <ChevronDownIcon />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
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
