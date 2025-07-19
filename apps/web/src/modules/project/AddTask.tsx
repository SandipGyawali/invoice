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
import { Plus } from 'lucide-react';
import { TZTaskSchemaType, zTaskSchema } from '@/schema/projectSchema';
import { useMutation } from '@tanstack/react-query';
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
import { useTRPC } from '@/utils/trpc';

interface AddTaskInterface {
  state: boolean;
  onOpenState: () => void;
  projectData: any;
  refetch: () => void;
}

export function AddTask({
  state,
  onOpenState,
  projectData,
  refetch,
}: AddTaskInterface) {
  const trpc = useTRPC();

  const form = useForm<TZTaskSchemaType>({
    resolver: zodResolver(zTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      endDate: undefined,
      priority: 'low',
      tStatus: 'not_started',
    },
  });

  const { mutate: addTask } = useMutation(trpc.tasks.addTask.mutationOptions());

  console.log(form.formState.errors);

  const onSubmit = (values: TZTaskSchemaType) => {
    const payload = {
      ...values,
      projectId: projectData.id,
      endDate: values.endDate ? new Date(values.endDate).toISOString() : null,
    };

    console.log(payload);

    addTask(payload, {
      onSuccess: () => {
        refetch();
        onOpenState();
        form.reset();
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <Dialog
      open={state}
      onOpenChange={() => {
        form.reset();
        onOpenState();
      }}
    >
      <DialogTrigger className="w-fit" asChild>
        <Button variant="default">
          <Plus />
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Fill in the task details and click create to add it.
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

              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
