import { useTRPC } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@invoice/ui/button';
import { Checkbox } from '@invoice/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@invoice/ui/form';
import { Input } from '@invoice/ui/input';
import { Label } from '@invoice/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@invoice/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';
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
import { useForm } from 'react-hook-form';
import { ZTaxSchema, TZTaxSchema } from '@/schema/taxSchema';
import { toast } from 'sonner';
import type { ITax } from '@/interfaces/ITax';

interface Props {
  refetchTaxList: () => void;
  defaultValue: Partial<ITax>;
  handleCloseSheet: () => void;
  state: boolean;
}

function UpdateTax({
  refetchTaxList,
  //   defaultValue,
  handleCloseSheet,
  state,
}: Props) {
  const trpc = useTRPC();
  const form = useForm({
    resolver: zodResolver(ZTaxSchema),
    defaultValues: {
      name: '',
      rate: 0,
      applicableTo: [''],
      type: '',
    },
  });

  const { mutate: addTax, isPending } = useMutation(
    trpc.tax.addTax.mutationOptions()
  );

  const handleFormReset = () => {
    form.reset();
  };

  const submit = (input: TZTaxSchema) => {
    const modifyData = {
      ...input,
      tenantId: 'e1065a8c',
    };

    addTax(modifyData, {
      onSuccess: (response) => {
        handleFormReset();
        console.log(response);
        toast.success(response.message);
        refetchTaxList();
        handleCloseSheet();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Sheet
      open={state}
      onOpenChange={() => {
        handleFormReset();
        handleCloseSheet();
      }}
    >
      <SheetTrigger asChild>
        <Button size="sm" variant="default">
          <PlusIcon size={16} aria-hidden="true" />
          Add
        </Button>
      </SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form
            className="flex flex-col h-full"
            onSubmit={form.handleSubmit(submit)}
          >
            <SheetHeader>
              <SheetTitle>Add New Tax</SheetTitle>
              <SheetDescription>Add a new taxation module</SheetDescription>
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
                          placeholder="Enter Tax Name"
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inclusive">Inclusive</SelectItem>
                            <SelectItem value="exclusive">Exclusive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="applicableTo"
                  render={({ field }) => {
                    const selectedValues = field.value || [];

                    const toggleValue = (type: string) => {
                      const newValue = selectedValues.includes(type)
                        ? selectedValues.filter((v) => v !== type)
                        : [...selectedValues, type];
                      field.onChange(newValue);
                    };

                    return (
                      <FormItem>
                        <FormLabel>Applicable To</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between"
                            >
                              {selectedValues.length > 0
                                ? selectedValues.join(', ')
                                : 'Select Applicables'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full">
                            <div className="flex flex-col gap-2">
                              {['product', 'task', 'project'].map((type) => (
                                <Label
                                  key={type}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <Checkbox
                                    checked={selectedValues.includes(type)}
                                    onCheckedChange={() => toggleValue(type)}
                                  />
                                  <span className="capitalize">{type}</span>
                                </Label>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <SheetFooter>
              <Button type="submit" variant="default" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Create Tax
              </Button>

              <SheetClose asChild disabled={isPending}>
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

export default UpdateTax;
