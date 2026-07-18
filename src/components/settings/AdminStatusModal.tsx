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

import { Loader2 } from "lucide-react";

import { settingsService } from "@/services/admin";
import { Admin } from "@/types/settings";

interface AdminStatusModalProps {
  open: boolean;
  admin: Admin | null;
  action: "enable" | "disable";
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function AdminStatusModal({
  open,
  admin,
  action,
  onOpenChange,
  onSuccess,
}: AdminStatusModalProps) {
  const [loading, setLoading] = useState(false);

  if (!admin) return null;

  const currentAdmin = admin;

  const isEnable = action === "enable";

  async function handleAction() {
    try {
      setLoading(true);

      if (isEnable) {
        await settingsService.enableAdmin(currentAdmin.id);
      } else {
        await settingsService.disableAdmin(currentAdmin.id);
      }

      toast.success(
        `Administrator ${
          isEnable ? "enabled" : "disabled"
        } successfully.`
      );

      onOpenChange(false);

      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          `Unable to ${
            isEnable ? "enable" : "disable"
          } administrator.`
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
            {isEnable
              ? "Enable Administrator"
              : "Disable Administrator"}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isEnable ? (
              <>
                Are you sure you want to enable{" "}
                <strong>{currentAdmin.fullName}</strong>?
                <br />
                <br />
                This administrator will regain
                access to the system immediately.
              </>
            ) : (
              <>
                Are you sure you want to disable{" "}
                <strong>{currentAdmin.fullName}</strong>?
                <br />
                <br />
                This administrator will no longer
                be able to sign in until enabled
                again.
              </>
            )}
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
              handleAction();
            }}
          >
            {loading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {isEnable ? "Enable" : "Disable"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}