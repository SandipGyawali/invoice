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
import { Button } from '@invoice/ui/button';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';
import {
  zProductSchema,
  ZProductSchemaInterface,
} from '@/schema/productSchema';
import { Textarea } from '@invoice/ui/textarea';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/utils/trpc';
import { SearchableSelect } from '@invoice/ui/select-search';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { useState } from 'react';

interface Props {
  refetchTaxList: () => void;
  defaultValue: Partial<any>;
  handleCloseSheet: () => void;
  state: boolean;
}

function UpdateProductForm() {
  const trpc = useTRPC();
  const router = useRouter();
  const form = useForm<ZProductSchemaInterface>({
    resolver: zodResolver(zProductSchema),
    defaultValues: {
      category: 0,
      sku: 1,
      productName: '',
      description: '',
      price: 0,
      taxRate: 0,
      provider: '',
      purchasePrice: 0,
    },
  });

  const [productUnitSearch, setProductUnitSearch] = useState<string>('');

  const { data: productUnitList, isLoading: isProductUnitLoading } = useQuery(
    trpc.productUnit.listUnit.queryOptions({
      page: DEFAULT_PAGE_INDEX + 1,
      pageSize: DEFAULT_PAGE_SIZE + 40,
      search: productUnitSearch,
      status: '1',
    })
  );

  const { data: productCategoryList } = useQuery(
    trpc.productCategory.listCategory.queryOptions()
  );
  const { mutate: addProduct } = useMutation(
    trpc.product.addProduct.mutationOptions()
  );

  const onSubmit = (values: ZProductSchemaInterface) => {
    const modifyData = {
      pName: values.productName,
      pCatId: values.category,
      pPrice: values.purchasePrice,
      pUnit: values.unit,
      sPrice: values.price,
      pDescription: values.description,
      providerName: values.provider,
      sku: values.sku,
      tenantId: 'e1065a8c',
    };

    addProduct(modifyData, {
      onSuccess: (data) => {
        console.log(data);
        // handleFormReset();
        // setSheetOpen(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });

    console.log('Product submitted:', values);
    // Add your API call here
  };

  console.log(form.watch('category'));

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Add New Product</PageTitle>
      </PageHeader>
      <PageContent>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Product Form</CardTitle>
            <CardDescription>
              Fill in the product details accurately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <>hello</>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* SKU */}
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Enter Sock"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Name */}
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Eg: Wireless Mouse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <SearchableSelect
                            value={field.value?.toString()}
                            onChange={field.onChange}
                            options={
                              productUnitList?.data?.map((val) => ({
                                label: val.name,
                                value: val.id,
                              })) ?? []
                            }
                            placeholder="Select Category"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Purchase Price */}
                  <FormField
                    control={form.control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Price</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min={0} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Tax Rate */}
                  <FormField
                    control={form.control}
                    name="taxRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Provider Name */}
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Eg: ABC Suppliers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Product Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder="Describe the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" size="sm">
                    Create Product
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </PageContent>
    </PageContainer>
  );
}

export default UpdateProductForm;
