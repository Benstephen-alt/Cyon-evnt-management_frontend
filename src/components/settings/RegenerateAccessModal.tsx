"use client";

import { useState } from "react";

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

import {
  Copy,
  KeyRound,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { settingsService } from "@/services/admin";

import { ParishAccess } from "@/types/settings";

interface RegenerateAccessModalProps {
  open: boolean;
  parish: ParishAccess | null;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function RegenerateAccessModal({
  open,
  parish,
  onOpenChange,
  onSuccess,
}: RegenerateAccessModalProps) {
  const [loading, setLoading] = useState(false);

  const [newAccessCode, setNewAccessCode] =
    useState<string | null>(null);

  if (!parish) return null;

  const currentParish = parish;

  async function handleRegenerate() {
    try {
      setLoading(true);

      const response =
        await settingsService.regenerateAccessCode(
          currentParish.id
        );

      setNewAccessCode(response.accessCode);

      toast.success(
        "Access code regenerated successfully."
      );

      onSuccess?.();

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ??
          "Unable to regenerate access code."
      );

    } finally {

      setLoading(false);

    }
  }

  async function copyCode() {
    if (!newAccessCode) return;

    await navigator.clipboard.writeText(
      newAccessCode
    );

    toast.success("Access code copied.");
  }

  function handleClose() {
    setNewAccessCode(null);
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

        {!newAccessCode ? (
          <>

            <AlertDialogHeader>

              <AlertDialogTitle>
                Regenerate Access Code
              </AlertDialogTitle>

              <AlertDialogDescription>

                This will invalidate the current
                access code for the parish below.

              </AlertDialogDescription>

            </AlertDialogHeader>

            <div className="space-y-4 rounded-lg border p-4">

              <div>

                <p className="text-sm text-muted-foreground">
                  Parish
                </p>

                <p className="font-semibold">
                  {currentParish.parishName}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  Current Access Code
                </p>

                <p className="font-mono text-lg font-semibold">
                  {currentParish.accessCode}
                </p>

              </div>

            </div>

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
                  handleRegenerate();
                }}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                Regenerate

              </AlertDialogAction>

            </AlertDialogFooter>

          </>
        ) : (
          <>

            <AlertDialogHeader>

              <AlertDialogTitle>
                New Access Code
              </AlertDialogTitle>

              <AlertDialogDescription>

                Share this access code with the
                parish president.

              </AlertDialogDescription>

            </AlertDialogHeader>

            <div className="space-y-4 rounded-lg border p-4">

              <div>

                <p className="text-sm text-muted-foreground">
                  Parish
                </p>

                <p className="font-semibold">
                  {currentParish.parishName}
                </p>

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  New Access Code
                </p>

                <div className="flex items-center justify-between rounded-md bg-muted p-3">

                  <div className="flex items-center gap-3">

                    <KeyRound className="h-5 w-5" />

                    <span className="font-mono text-lg font-semibold">
                      {newAccessCode}
                    </span>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyCode}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>

                </div>

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