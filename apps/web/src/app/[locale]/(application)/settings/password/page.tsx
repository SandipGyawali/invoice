'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@invoice/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import { Input } from '@invoice/ui/input';
import { Label } from '@invoice/ui/label';
import { useEffect, useState } from 'react';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

function Page() {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  // 4. Handle submit
  const onSubmit = (data: PasswordForm) => {
    console.log('Form data:', data);
  };

  const newPassword = watch('newPassword', '');

  useEffect(() => {
    // Simple strength calculation: count how many criteria the password meets
    let strength = 0;

    if (newPassword.length >= 8) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[a-z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;

    setPasswordStrength(strength);
  }, [newPassword]);

  const getBarColor = (index: number) => {
    if (passwordStrength >= index + 1) {
      // Stronger = green, medium = yellow, weak = red
      if (passwordStrength <= 2) return 'bg-red-500';
      if (passwordStrength === 3 || passwordStrength === 4)
        return 'bg-yellow-400';
      if (passwordStrength === 5) return 'bg-green-500';
    }
    return 'bg-neutral-300 dark:bg-neutral-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password & Security</CardTitle>
        <CardDescription>
          Update your password and manage security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="Enter your current password"
            {...register('currentPassword')}
            aria-invalid={!!errors.currentPassword}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter your new password"
            {...register('newPassword')}
            aria-invalid={!!errors.newPassword}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
          {/* Password Strength Indicator (optional, static for now) */}
          <div className="space-y-2">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`h-1 w-full rounded ${getBarColor(index)}`}
                />
              ))}
            </div>
            <p
              className={`text-xs ${
                passwordStrength <= 2
                  ? 'text-red-400'
                  : passwordStrength <= 4
                  ? 'text-yellow-400'
                  : 'text-green-500'
              }`}
            >
              {passwordStrength <= 2
                ? 'Weak - Add more characters and symbols'
                : passwordStrength <= 4
                ? 'Medium - Good but can be stronger'
                : 'Strong password!'}
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            {...register('confirmPassword')}
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="border-t border-t-2 p-4">
          <h4 className="font-medium mb-3">Password Requirements</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 bg-gray-500 rounded-full"></div>
              At least 8 characters long
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 bg-gray-500 rounded-full"></div>
              Contains uppercase and lowercase letters
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 bg-gray-500 rounded-full"></div>
              Contains at least one number
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <div className="h-1.5 w-1.5 bg-gray-500 rounded-full"></div>
              Contains at least one special character
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            size="sm"
            variant="destructive"
            type="button"
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button size="sm" type="submit" onClick={handleSubmit(onSubmit)}>
            Update Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Page;
