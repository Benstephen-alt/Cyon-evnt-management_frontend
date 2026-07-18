"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const adminSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name is required"),

    email: z
      .string()
      .email("Invalid email address"),

    phoneNumber: z.string().optional(),

    role: z.enum([
      "ADMIN",
      "SUPER_ADMIN",
    ]),

    password: z.string().optional(),

confirmPassword: z.string().optional(),
  })


  .superRefine((data, ctx) => {
  if (
    data.password ||
    data.confirmPassword
  ) {
    if (
      data.password !==
      data.confirmPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }

    if (
      data.password &&
      data.password.length < 6
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message:
          "Password must be at least 6 characters.",
      });
    }
  }
});

export type AdminFormValues = z.infer<
  typeof adminSchema
>;

interface AdminFormProps {
  loading?: boolean;

  defaultValues?: Partial<AdminFormValues>;

  isEdit?: boolean;

  onSubmit: (
    data: AdminFormValues
  ) => Promise<void>;
}

export default function AdminForm({
  loading = false,
  defaultValues,
  isEdit = false,
  onSubmit,
}: AdminFormProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const form =
    useForm<AdminFormValues>({
      resolver: zodResolver(adminSchema),

      defaultValues: {
        fullName:
          defaultValues?.fullName ?? "",

        email:
          defaultValues?.email ?? "",

        phoneNumber:
          defaultValues?.phoneNumber ?? "",

        role:
          defaultValues?.role ??
          "ADMIN",

        password: "",

        confirmPassword: "",
      },
    });

  async function handleSubmit(
    values: AdminFormValues
  ) {
    await onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          handleSubmit
        )}
        className="space-y-5"
      >

        {/* Full Name */}
<FormField
  control={form.control}
  name="fullName"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Full Name</FormLabel>

      <FormControl>
        <Input
          placeholder="Enter full name"
          {...field}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>

{/* Email */}
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email Address</FormLabel>

      <FormControl>
        <Input
          type="email"
          placeholder="example@email.com"
          {...field}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>

{/* Phone */}
<FormField
  control={form.control}
  name="phoneNumber"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone Number</FormLabel>

      <FormControl>
        <Input
          placeholder="08012345678"
          {...field}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>


{/* Role */}
<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>

      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectItem value="ADMIN">
            Administrator
          </SelectItem>

          <SelectItem value="SUPER_ADMIN">
            Super Administrator
          </SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>


{!isEdit && (
  <>
    {/* Password */}
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                {...field}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />

    {/* Confirm Password */}
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Confirm Password
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                {...field}
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  </>
)}


<div className="flex justify-end gap-3 pt-4">
  <Button
    type="submit"
    disabled={loading}
    className="min-w-[170px]"
  >
    {loading && (
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    )}

    {isEdit
      ? "Update Administrator"
      : "Create Administrator"}
  </Button>
</div>

</form>
</Form>
);
}
