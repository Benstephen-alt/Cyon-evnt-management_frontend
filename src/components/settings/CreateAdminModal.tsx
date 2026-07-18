"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AdminForm, {
  AdminFormValues,
} from "./AdminForm";

import { settingsService } from "@/services/admin";

interface CreateAdminModalProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;
}

export default function CreateAdminModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateAdminModalProps) {
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    values: AdminFormValues
  ) {
    try {
      setLoading(true);

      const payload = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber:
          values.phoneNumber,
        role: values.role,
        password: values.password,
      };

      await settingsService.createAdmin(
        payload
      );

      toast.success(
        "Administrator created successfully."
      );

      onOpenChange(false);

      onSuccess?.();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Unable to create administrator."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>
            Create Administrator
          </DialogTitle>
 
          <DialogDescription>
            Create a new administrator
            account for the event
            management system.
          </DialogDescription>

        </DialogHeader>

        <AdminForm
          loading={loading}
          onSubmit={handleSubmit}
        />

      </DialogContent>
    </Dialog>
  );
}

