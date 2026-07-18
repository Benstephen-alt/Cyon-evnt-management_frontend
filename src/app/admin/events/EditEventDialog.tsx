"use client";

import { useEffect, useState } from "react";
import { getEvent, updateEvent } from "@/services/event.service";
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
  eventId: string;
  onSuccess: () => void;
}

export default function EditEventDialog({
  eventId,
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
    registrationOpen: true,
  });

  useEffect(() => {
    if (open) loadEvent();
  }, [open]);

  async function loadEvent() {
    try {
      const response = await getEvent(eventId);

      if (response.success) {
        setForm(response.event);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function save() {
    try {
      setLoading(true);

      const response = await updateEvent(eventId, form);

      if (response.success) {
        alert("Event updated.");

        setOpen(false);

        onSuccess();
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger>
          Edit

      </DialogTrigger>

      <DialogContent className="max-w-xl">

        <DialogHeader>

          <DialogTitle>
            Edit Event
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            value={form.eventName}
            placeholder="Event Name"
            onChange={(e) =>
              setForm({
                ...form,
                eventName: e.target.value,
              })
            }
          />

          <Input
            value={form.theme}
            placeholder="Theme"
            onChange={(e) =>
              setForm({
                ...form,
                theme: e.target.value,
              })
            }
          />

          <Input
            type="number"
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
            value={form.startDate?.substring(0,10)}
            onChange={(e)=>
              setForm({
                ...form,
                startDate:e.target.value,
              })
            }
          />

          <Input
            type="date"
            value={form.endDate?.substring(0,10)}
            onChange={(e)=>
              setForm({
                ...form,
                endDate:e.target.value,
              })
            }
          />

          <label className="flex gap-2 items-center">

            <input
              type="checkbox"
              checked={form.registrationOpen}
              onChange={(e)=>
                setForm({
                  ...form,
                  registrationOpen:e.target.checked,
                })
              }
            />

            Registration Open

          </label>

          <Button
            className="w-full bg-[#0B6B3A]"
            onClick={save}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  );
}