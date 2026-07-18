"use client";

import { useEffect, useState } from "react";
import CreateEventDialog from "@/app/admin/events/CreateEventDialog";
import AdminLayout from "@/app/admin/dashboard/AdminLayout";
import EventTable from "@/app/admin/events/EventTable";
import EditEventDialog from "./EditEventDialog";
import { getEvents, activateEvent, deleteEvent, toggleRegistration } from "@/services/event.service";
import { Event } from "@/types/events";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
const [selectedEvent, setSelectedEvent] = useState<any>(null);


  async function loadEvent() {
    try {
      const response = await getEvents();

      setEvents(response.data ?? response.events ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  loadEvents();
}, []);

async function loadEvents() {
  try {
    setLoading(true);

    const response = await getEvents();

    console.log(response);

    if (response.success) {
      setEvents(response.events);
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to load events.");
  } finally {
    setLoading(false);
  }
}

async function handleDelete(id: string) {
  const confirmed = confirm("Delete this event?");

  if (!confirmed) return;

  try {
    const response = await deleteEvent(id);

    if (response.success) {
      await loadEvents();
      alert("Event deleted successfully.");
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to delete event.");
  }
}

async function handleRegistration(
  id: string,
  status: boolean
) {
  try {
    const response = await toggleRegistration(
      id,
      !status
    );

    if (response.success) {
      await loadEvents();
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error(error);
    alert("Unable to update registration.");
  }
}


  return (
    <AdminLayout>
      <div className="p-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-[#0B6B3A]">
              Events
            </h1>

            <p className="mt-2 text-gray-500">
              Manage diocesan events.
            </p>
          </div>

         <CreateEventDialog
  onSuccess={loadEvents}
/>
        </div>

        {loading ? (
  <div className="mt-10 text-center">
    Loading events...
  </div>
) : (
 <div className="mt-8 bg-white rounded-2xl shadow">

  <table className="w-full">

    <thead className="bg-gray-100">

      <tr>

        <th className="text-left p-4">Event</th>

        <th className="text-left p-4">Theme</th>

        <th className="text-left p-4">Year</th>

        <th className="text-left p-4">Registration</th>

        <th className="text-left p-4">Actions</th>

      </tr>

    </thead>

    <tbody>

      {events.length === 0 ? (

        <tr>
          <td
            colSpan={5}
            className="text-center py-10 text-gray-500"
          >
            No events found.
          </td>
        </tr>

      ) : (

        events.map((event: any) => (

          <tr
            key={event.id}
            className="border-t"
          >

            <td className="p-4">
              {event.eventName}
            </td>

            <td className="p-4">
              {event.theme}
            </td>

            <td className="p-4">
              {event.year}
            </td>

            <td className="p-4">

  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      event.registrationOpen
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {event.registrationOpen ? "Open" : "Closed"}
  </span>

</td>

            <td className="p-4 flex gap-2">

              <EditEventDialog
  eventId={event.id}
  onSuccess={loadEvents}
/>

              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </td>

          </tr>

        ))

      )}

    </tbody>

  </table>

</div>
)}


      </div>
    </AdminLayout>
  );
}