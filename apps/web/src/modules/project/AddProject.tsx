'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@invoice/ui/select';
import { Button } from '@invoice/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { zProjectSchema, TZProjectSchemaType } from '@/schema/projectSchema';
import { useTRPC } from '@/utils/trpc';
import { useMutation, useQuery } from '@tanstack/react-query';

function AddProjectForm() {
  const trpc = useTRPC();
  const router = useRouter();

  const form = useForm<TZProjectSchemaType>({
    resolver: zodResolver(zProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      pStatus: 'not_started',
      status: '1',
      statusFTR: '',
    },
  });

  const { data: listClient } = useQuery(trpc.client.listClient.queryOptions());
  const { mutate: addProject } = useMutation(
    trpc.project.addProject.mutationOptions()
  );

  const onSubmit = (values: TZProjectSchemaType) => {
    const modifyData = {
      ...values,
      endDate: values.endDate,
    };
    console.log('Creating project:', modifyData);

    addProject(modifyData, {
      onSuccess: (data) => {
        console.log(data);
        // handleFormReset();
        // setSheetOpen(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl max-w-5xl mx-auto">
          Create New Project
        </PageTitle>
      </PageHeader>
      <PageContent className="max-w-5xl mx-auto">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Project Form</CardTitle>
            <CardDescription>
              Enter all required project details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Progress Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select project status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem defaultChecked value="not_started">
                                Not Started
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    name="clientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign Client</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value?.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select project status" />
                            </SelectTrigger>
                            <SelectContent>
                              {listClient?.map((client) => (
                                <SelectItem
                                  key={`client-${client.id}`}
                                  defaultChecked
                                  value={client.id?.toString()}
                                >
                                  {`${client.firstName} ${
                                    client.lastName ?? ''
                                  } - ${client.email}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                            placeholder="Enter Project Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <Button type="submit">Create Project</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}

export default AddProjectForm;
