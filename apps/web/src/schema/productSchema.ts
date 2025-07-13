import { z } from 'zod';

export const zProductSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  sku: z.string().min(1, 'SKU is required'),
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  taxRate: z.coerce.number().nonnegative(),
  provider: z.string().min(1, 'Provider name is required'),
  purchasePrice: z.coerce.number().positive('Purchase price must be positive'),
});

export type ZProductSchemaInterface = z.infer<typeof zProductSchema>;
