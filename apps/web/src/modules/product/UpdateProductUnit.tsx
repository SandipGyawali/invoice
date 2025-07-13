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
} from '@invoice/ui/sheet';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const _schema = z.object({
  id: z.number(),
  name: z.string(),
  namePlural: z.string().default(''),
  status: z.string().default('1'),
  statusFTR: z.string().default(''),
  tenantId: z.string(),
});

type TSchema = z.infer<typeof _schema>;

function UpdateProductUnit({
  setOpenEditSheet,
  openEditSheet,
  defaultData,
  refetch,
}: {
  setOpenEditSheet: Dispatch<SetStateAction<boolean>>;
  openEditSheet: boolean;
  defaultData: TSchema;
  refetch: () => void;
}) {
  const trpc = useTRPC();
  const form = useForm({
    resolver: zodResolver(_schema),
    defaultValues: {
      ...defaultData,
    },
  });

  const { mutate: updateUnit, isPending } = useMutation(
    trpc.productUnit.updateUnit.mutationOptions()
  );

  const handleFormReset = () => {
    form.reset();
  };

  const submit = (input: TSchema) => {
    const modifyData = {
      ...input,
      tenantId: defaultData.tenantId,
      id: defaultData.id,
    };

    updateUnit(modifyData, {
      onSuccess: () => {
        handleFormReset();
        refetch();
        setOpenEditSheet(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Sheet
      open={openEditSheet}
      onOpenChange={() => setOpenEditSheet((prev) => !prev)}
    >
      <SheetContent>
        <Form {...form}>
          <form
            className="flex flex-col h-full"
            onSubmit={form.handleSubmit(submit)}
          >
            <SheetHeader>
              <SheetTitle>Edit Product Category</SheetTitle>
              <SheetDescription>
                Modify the existing product category
              </SheetDescription>
            </SheetHeader>

            <div className="px-5 w-full mt-2">
              <div className="grid grid-cols-1 gap-6">
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

                <FormField
                  control={form.control}
                  name="namePlural"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-start">
                        Name (Plural)
                      </FormLabel>
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
                {isPending ? 'Editing...' : 'Edit Category'}
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

export default UpdateProductUnit;
