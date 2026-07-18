"use client";

import { useState } from "react";
import { Copy, KeyRound, Loader2 } from "lucide-react";
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

import { Button } from "@/components/ui/button";

import { settingsService } from "@/services/admin";
import { Admin } from "@/types/settings";

interface ResetPasswordModalProps {
  open: boolean;
  admin: Admin | null;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function ResetPasswordModal({
  open,
  admin,
  onOpenChange,
  onSuccess,
}: ResetPasswordModalProps) {
  const [loading, setLoading] = useState(false);

  const [temporaryPassword, setTemporaryPassword] =
    useState<string | null>(null);

  if (!admin) return null;

  const currentAdmin = admin;

  async function handleReset() {
    try {
      setLoading(true);

      const response =
        await settingsService.resetPassword(currentAdmin.id);

      setTemporaryPassword(
        response.temporaryPassword
      );

      toast.success("Password reset successfully.");

      onSuccess?.();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ??
          "Unable to reset password."
      );

    } finally {

      setLoading(false);

    }
  }

  async function copyPassword() {
    if (!temporaryPassword) return;

    await navigator.clipboard.writeText(
      temporaryPassword
    );

    toast.success("Password copied.");
  }

  function handleClose() {
    setTemporaryPassword(null);
    onOpenChange(false);
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <AlertDialogContent>

        {!temporaryPassword ? (
          <>
            <AlertDialogHeader>

              <AlertDialogTitle>
                Reset Password
              </AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to reset the
                password for{" "}
                <strong>{currentAdmin.fullName}</strong>?

                <br />
                <br />

                A temporary password will be
                generated and must be shared with
                the administrator.
              </AlertDialogDescription>

            </AlertDialogHeader>

            <AlertDialogFooter>

              <AlertDialogCancel
                disabled={loading}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleReset();
                }}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                Reset Password
              </AlertDialogAction>

            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>

              <AlertDialogTitle>
                Temporary Password
              </AlertDialogTitle>

              <AlertDialogDescription>
                The password has been reset.

                <br />
                <br />

                Copy this password now. It will not
                be shown again after this dialog is
                closed.
              </AlertDialogDescription>

            </AlertDialogHeader>

            <div className="rounded-lg border bg-muted p-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <KeyRound className="h-5 w-5" />

                  <span className="font-mono text-lg font-semibold">
                    {temporaryPassword}
                  </span>

                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyPassword}
                >
                  <Copy className="h-4 w-4" />
                </Button>

              </div>

            </div>

            <AlertDialogFooter>

              <Button
                onClick={handleClose}
              >
                Done
              </Button>

            </AlertDialogFooter>
          </>
        )}

      </AlertDialogContent>
    </AlertDialog>
  );
}