// schema/projectSchema.ts
import { z } from 'zod';

export const zProjectSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    tenantId: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    clientId: z.number(),
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
  projectId: z.number().int(),
  title: z.string().max(255),
  description: z.string().nullable().optional(),
  endDate: z.coerce.date().nullable().optional(),
  priority: priorityEnum.default('low'),
  tStatus: projectStatusEnum.default('not_started'),
  createdAt: z.date().optional(), // usually auto-generated
  updatedAt: z.date().optional(), // updated via trigger/function
});

export type TZTaskSchemaType = z.infer<typeof zTaskSchema>;

export const zTaskUpdateSchema = zTaskSchema.extend({
  id: z.number(),
});

export type TZTaskUpdateSchemaType = z.infer<typeof zTaskUpdateSchema>;
