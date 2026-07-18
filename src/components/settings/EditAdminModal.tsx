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
import { Admin } from "@/types/settings";

interface EditAdminModalProps {
  open: boolean;

  admin: Admin | null;

  onOpenChange: (open: boolean) => void;

  onSuccess?: () => void;
}

export default function EditAdminModal({
  open,
  admin,
  onOpenChange,
  onSuccess,
}: EditAdminModalProps) {
  const [loading, setLoading] =
    useState(false);

  if (!admin) return null;

  const currentAdmin = admin;

  async function handleSubmit(
    values: AdminFormValues
  ) {
    try {
      setLoading(true);

      await settingsService.updateAdmin(currentAdmin.id, {
  fullName: values.fullName,
  email: values.email,
  phoneNumber: values.phoneNumber,
  role: values.role,
});

      toast.success(
        "Administrator updated successfully."
      );

      onOpenChange(false);

      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to update administrator."
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
            Edit Administrator
          </DialogTitle>

          <DialogDescription>
            Update administrator
            information.
          </DialogDescription>
        </DialogHeader>

        <AdminForm
          isEdit
          loading={loading}
          defaultValues={{
  fullName: currentAdmin.fullName,
  email: currentAdmin.email,
  phoneNumber: currentAdmin.phoneNumber,
  role: currentAdmin.role,
}}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}