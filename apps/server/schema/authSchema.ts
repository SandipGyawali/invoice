import { z } from 'zod';
import { isNameValid } from '../utils/validName.ts';

export const passwordSchema = z
  .string({
    errorMap: () => ({
      message: 'Please enter your password.',
    }),
  })
  .min(8, 'Password must be at least 8 characters long.')
  .max(32, 'Password must be less than 32 characters long.')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase character.')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase character.')
  .regex(/[0-9]/, 'Password must contain at least 1 number.')
  .regex(
    /[!@#$%^&*()_+{}[\]\\|:"'<>,./`~ ]/,
    'Password must contain at least 1 symbol.'
  );

export const phoneSchema = z
  .string({
    errorMap: () => ({
      message: 'Please enter your phone number.',
    }),
  })
  .regex(/^9[78][0-9]{8}$/, 'Please enter a valid phone number.');

export const authSchema = {
  login: z.object({
    email: z
      .string({ errorMap: () => ({ message: 'Please enter a valid email.' }) })
      .trim()
      .min(4)
      .email(),
    password: passwordSchema,
  }),
  signup: z.object({
    fullName: z
      .string({ errorMap: () => ({ message: 'Please enter your full name.' }) })
      .trim()
      .min(2),
    email: z
      .string({ errorMap: () => ({ message: 'Please enter your email.' }) })
      .trim()
      .email(),
    password: passwordSchema,
    mobile: phoneSchema,
    otp: z.string(),
  }),
  forgot: z.object({
    email: z
      .string({ errorMap: () => ({ message: 'Please enter a valid email.' }) })
      .trim()
      .min(4)
      .email(),
    password: passwordSchema.optional(),
    confirm_password: passwordSchema.optional(),
    otp: z.string(),
  }),
};

export const ZRegistrationSchema = z.object({
  userName: z.string().trim().min(1).max(30).refine(isNameValid),
  userEmail: z.string().email().trim(),
  password: passwordSchema,
  orgName: z.string().trim().min(1).max(30).refine(isNameValid),
  orgEmail: z.string().trim().email().optional(),
});

export type TZRegistrationSchema = z.infer<typeof ZRegistrationSchema>;
export type TZLoginSchema = z.infer<typeof authSchema.login>;
