"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { settingsService } from "@/services/admin";
import { Admin } from "@/types/settings";

interface DisableAdminModalProps {
  open: boolean;
  admin: Admin | null;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function DisableAdminModal({
  open,
  admin,
  onOpenChange,
  onSuccess,
}: DisableAdminModalProps) {
  const [loading, setLoading] = useState(false);

  if (!admin) return null;

  const currentAdmin = admin;

  async function handleDisable() {
    try {
      setLoading(true);

      await settingsService.disableAdmin(currentAdmin.id);

      toast.success("Administrator disabled successfully.");

      onOpenChange(false);

      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Unable to disable administrator."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Disable Administrator
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to disable{" "}
            <strong>{currentAdmin.fullName}</strong>?
            <br />
            <br />
            This administrator will no longer be able
            to sign in until their account is enabled
            again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDisable();
            }}
          >
            {loading ? "Disabling..." : "Disable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}