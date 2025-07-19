import { Button } from '@invoice/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@invoice/ui/dialog';
import { Input } from '@invoice/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@invoice/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TZTaskSchemaType, zTaskSchema } from '@/schema/projectSchema';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/utils/trpc';
import { PenBox } from 'lucide-react';

interface UpdateTaskInterface {
  taskData: any;
  refetch: () => void;
}

export function UpdateTask({ taskData, refetch }: UpdateTaskInterface) {
  const trpc = useTRPC();

  const form = useForm<TZTaskSchemaType>({
    resolver: zodResolver(zTaskSchema),
    defaultValues: {
      title: taskData?.title || '',
      description: taskData?.description || '',
      endDate: taskData?.endDate
        ? new Date(taskData.endDate).toISOString().slice(0, 16)
        : undefined,
      priority: taskData?.priority || 'low',
      tStatus: taskData?.tStatus || 'not_started',
    },
  });

  const { mutate: updateTask } = useMutation(
    trpc.tasks.updateTask.mutationOptions()
  );

  const onSubmit = (values: TZTaskSchemaType) => {
    const payload = {
      ...values,
      id: taskData.id,
      endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
    };

    updateTask(payload, {
      onSuccess: () => {
        refetch();
        form.reset();
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <Dialog
      defaultOpen={false}
      onOpenChange={() => {
        form.reset();
      }}
    >
      <DialogTrigger className="w-fit" asChild>
        <Button size="icon" variant="ghost" className="h-6 w-6">
          <PenBox className="" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
              <DialogDescription>
                Make changes to this task and save.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Task description (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
