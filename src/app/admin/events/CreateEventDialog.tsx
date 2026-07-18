"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { createEvent } from "@/services/event.service";

interface Props {
  onSuccess: () => void;
}

export default function CreateEventDialog({
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    eventName: "",
    theme: "",
    year: new Date().getFullYear(),
    registrationFee: 0,
    startDate: "",
    endDate: "",
  });

  async function handleSubmit() {
    try {
      setLoading(true);

      await createEvent(form);

      setOpen(false);

      onSuccess();

    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger>

        
          New Event

      </DialogTrigger>

      <DialogContent className="max-w-xl rounded-3xl">

        <DialogHeader>

          <DialogTitle>
            Create Event
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4 mt-4">

          <Input
            placeholder="Event Name"
            value={form.eventName}
            onChange={(e) =>
              setForm({
                ...form,
                eventName: e.target.value,
              })
            }
          />

          <Input
            placeholder="Theme"
            value={form.theme}
            onChange={(e) =>
              setForm({
                ...form,
                theme: e.target.value,
              })
            }
          />

          <Input
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year: Number(e.target.value),
              })
            }
          />

          <Input
            type="number"
            placeholder="Registration Fee"
            value={form.registrationFee}
            onChange={(e) =>
              setForm({
                ...form,
                registrationFee: Number(e.target.value),
              })
            }
          />

          <Input
            type="date"
            value={form.startDate}
            onChange={(e) =>
              setForm({
                ...form,
                startDate: e.target.value,
              })
            }
          />

          <Input
            type="date"
            value={form.endDate}
            onChange={(e) =>
              setForm({
                ...form,
                endDate: e.target.value,
              })
            }
          />

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-[#0B6B3A]"
          >
            {loading
              ? "Creating..."
              : "Create Event"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}