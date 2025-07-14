import { z } from 'zod';

export const zClientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  address2: z.string().optional(), // optional second address line
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address'),
  gender: z.enum(['Male', 'Female', 'Other']),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  vatId: z.string().optional(),
  taxId: z.string().optional(),
  tenantId: z.string(),
});

export type ZClientSchemaInterface = z.infer<typeof zClientSchema>;
