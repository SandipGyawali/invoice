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
  zProductSchema,
  ZProductSchemaInterface,
} from '@/schema/productSchema';
import { Textarea } from '@invoice/ui/textarea';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/utils/trpc';
import { SearchableSelect } from '@invoice/ui/select-search';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

function UpdateProductForm() {
  const params = useParams();
  const trpc = useTRPC();
  const router = useRouter();
  const [productEditData, setProductEditData] = useState<any | null>(null);

  const {
    data: productUpdateData,
    isLoading: isProductDataLoading,
    isSuccess,
  } = useQuery(
    trpc.product.listProduct.queryOptions({
      page: DEFAULT_PAGE_INDEX + 1,
      pageSize: 1,
      search: '',
      status: '1',
      id: Number(params.id ?? 0),
    })
  );

  const form = useForm<ZProductSchemaInterface>({
    resolver: zodResolver(zProductSchema),
  });

  console.log(productEditData);

  // First effect: store the product data in state
  useEffect(() => {
    if (isSuccess && productUpdateData?.data?.[0]) {
      setProductEditData(productUpdateData.data[0]);
    }
  }, [isSuccess, productUpdateData]);

  // Second effect: reset form when productEditData is available
  useEffect(() => {
    if (productEditData) {
      form.reset({
        productName: productEditData.pName,
        price: productEditData.sPrice,
        sku: productEditData.sku,
        category: productEditData.pCatId,
        description: productEditData.description,
        provider: productEditData.provider,
        purchasePrice: productEditData.pPrice,
        taxRate: productEditData?.taxRate,
        unit: productEditData.pUnit,
      });
    }
  }, [productEditData, form]);

  const [productUnitSearch, setProductUnitSearch] = useState<string>('');
  const [productCategorySearch, setProductCategorySearch] =
    useState<string>('');

  const { data: productUnitList } = useQuery(
    trpc.productUnit.listUnit.queryOptions({
      page: DEFAULT_PAGE_INDEX + 1,
      pageSize: DEFAULT_PAGE_SIZE + 40,
      search: productUnitSearch,
      status: '1',
    })
  );
  const { data: productCategoryList } = useQuery(
    trpc.productCategory.listCategory.queryOptions({
      page: DEFAULT_PAGE_INDEX + 1,
      pageSize: DEFAULT_PAGE_SIZE + 40,
      search: productCategorySearch,
      status: '1',
    })
  );
  const { data: taxList } = useQuery(
    trpc.tax.listTax.queryOptions({
      page: DEFAULT_PAGE_INDEX + 1,
      pageSize: DEFAULT_PAGE_SIZE + 40,
      search: productCategorySearch,
      status: '1',
    })
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

  if (isProductDataLoading) return <Loader className="w-full h-full" />;

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
                          <SearchableSelect
                            value={Number(field.value ?? '')}
                            onChange={field.onChange}
                            onSearch={setProductCategorySearch}
                            searchValue={productCategorySearch}
                            options={
                              productCategoryList?.data?.map((val) => ({
                                label: val.catName as string,
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
                            value={Number(field.value ?? '')}
                            onChange={field.onChange}
                            onSearch={setProductUnitSearch}
                            searchValue={productUnitSearch}
                            options={
                              productUnitList?.data?.map((val) => ({
                                label: val.name,
                                value: val.id,
                              })) ?? []
                            }
                            placeholder="Select Unit"
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
                          <SearchableSelect
                            value={Number(field.value ?? '')}
                            onChange={field.onChange}
                            onSearch={setProductUnitSearch}
                            searchValue={productUnitSearch}
                            options={
                              taxList?.data?.map((val) => ({
                                label: val.name,
                                value: val.id,
                              })) ?? []
                            }
                            placeholder="Select Tax"
                          />
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
                    Edit Product
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
