"use client";

import { useState } from "react";
import { createDeanery } from "@/services/deanery.service";

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
  onSuccess: () => void;
}

export default function CreateDeaneryDialog({
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  async function save() {
    if (!name.trim()) {
      alert("Deanery name is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await createDeanery({
        name,
      });

      if (response.success) {
        setName("");
        setOpen(false);
        onSuccess();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to create deanery.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger>

        <Button className="bg-[#0B6B3A] hover:bg-green-700">
          New Deanery
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create Deanery
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4 mt-4">

          <Input
            placeholder="Deanery Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            className="w-full bg-[#0B6B3A]"
            disabled={loading}
            onClick={save}
          >
            {loading ? "Saving..." : "Create Deanery"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}