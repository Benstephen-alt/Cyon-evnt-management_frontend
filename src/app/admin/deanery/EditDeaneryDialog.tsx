"use client";

import { useState } from "react";
import { updateDeanery } from "@/services/deanery.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  deanery: {
    id: string;
    name: string;
  };

  onSuccess: () => void;
}

export default function EditDeaneryDialog({
  deanery,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(deanery.name);

  async function save() {
    if (!name.trim()) {
      alert("Deanery name is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await updateDeanery(
        deanery.id,
        {
          name,
        }
      );

      if (response.success) {
        setOpen(false);
        onSuccess();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to update deanery.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger>

        <Button>
          Edit
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Edit Deanery
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4 mt-4">

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            className="w-full bg-[#0B6B3A]"
            disabled={loading}
            onClick={save}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}