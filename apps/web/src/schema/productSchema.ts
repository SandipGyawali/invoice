import { z } from 'zod';

export const zProductSchema = z
  .object({
    category: z.coerce.number(),
    sku: z.coerce.number(),
    productName: z.string().min(1, 'Product name is required'),
    description: z.string().optional().default(''),
    price: z.coerce.number().positive('Price must be positive'),
    unit: z.coerce.number(),
    taxRate: z.coerce.number().nonnegative(),
    provider: z.string().optional().default(''),
    purchasePrice: z.coerce
      .number()
      .positive('Purchase price must be positive'),
  })
  .refine((data) => data.purchasePrice > data.price, {
    message: 'Selling Price must be greater then Purchase price',
    path: ['price'],
  });

export type ZProductSchemaInterface = z.infer<typeof zProductSchema>;
