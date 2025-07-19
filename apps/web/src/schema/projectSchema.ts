// schema/projectSchema.ts
import { z } from 'zod';

export const zProjectSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    clientId: z.coerce.number(),
    pStatus: z.enum(['not_started', 'in_progress', 'completed']),
    status: z.string(),
    statusFTR: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.startDate && val.endDate) {
      const start = new Date(val.startDate);
      const end = new Date(val.endDate);

      if (start > end) {
        ctx.addIssue({
          path: ['endDate'],
          code: z.ZodIssueCode.custom,
          message: 'End date must be after start date',
        });
      }
    }
  });

export type TZProjectSchemaType = z.infer<typeof zProjectSchema>;

export const priorityEnum = z.enum(['low', 'medium', 'high']);
export const projectStatusEnum = z.enum([
  'not_started',
  'in_progress',
  'completed',
]); // adapt as needed

export const zTaskSchema = z.object({
  title: z.string().max(255),
  description: z.string().nullable().optional(),
  endDate: z.coerce.date().nullable().optional(),
  priority: priorityEnum.default('low'),
  tStatus: projectStatusEnum.default('not_started'),
});

export type TZTaskSchemaType = z.infer<typeof zTaskSchema>;
