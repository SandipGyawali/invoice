import { useTRPC } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@invoice/ui/button';
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@invoice/ui/sheet';
import { useMutation } from '@tanstack/react-query';
import { Loader2, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const _schema = z.object({
  name: z.string().trim().min(3).max(8),
});

function AddRoleForm() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const trpc = useTRPC();
  const form = useForm({
    resolver: zodResolver(_schema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate: addRole, isPending } = useMutation(
    trpc.roles.createTenantRole.mutationOptions()
  );

  const handleFormReset = () => {
    form.reset();
  };

  const submit = (input: z.infer<typeof _schema>) => {
    const modifyData = {
      ...input,
      tenantId: 'e1065a8c',
    };

    addRole(modifyData, {
      onSuccess: (data) => {
        handleFormReset();
        setSheetOpen(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Sheet open={sheetOpen} onOpenChange={() => setSheetOpen((prev) => !prev)}>
      <SheetTrigger asChild>
        <Button size="sm" variant="default">
          <PlusIcon size={16} aria-hidden="true" />
          Add user
        </Button>
      </SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form
            className="flex flex-col h-full"
            onSubmit={form.handleSubmit(submit)}
          >
            <SheetHeader>
              <SheetTitle>Add New Role</SheetTitle>
              <SheetDescription>
                Assign a new Role to the system
              </SheetDescription>
            </SheetHeader>

            <div className="px-5 w-full mt-2">
              <div className="grid grid-cols-1">
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
              </div>
            </div>

            <SheetFooter>
              <Button type="submit" variant="default">
                {isPending && <Loader2 className="animate-spin" />}
                Create Role
              </Button>

              <SheetClose asChild>
                <Button onClick={() => handleFormReset()} variant="outline">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default AddRoleForm;
