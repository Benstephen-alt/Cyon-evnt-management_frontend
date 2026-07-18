import { Event } from "@/types/events";

interface Props {
  events: Event[];
}

export default function EventTable({
  events,
}: Props) {
  if (events.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border bg-white p-12 text-center text-gray-500">
        No events available.
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-[#F4F7F5]">

          <tr>

            <th className="px-6 py-4 text-left">
              Event
            </th>

            <th className="px-6 py-4 text-left">
              Year
            </th>

            <th className="px-6 py-4 text-left">
              Registration
            </th>

            <th className="px-6 py-4 text-left">
              Active
            </th>

          </tr>

        </thead>

        <tbody>

          {events.map((event) => (

            <tr
              key={event.id}
              className="border-t hover:bg-green-50"
            >

              <td className="px-6 py-5">
                <div className="font-semibold">
                  {event.eventName}
                </div>

                <div className="text-sm text-gray-500">
                  {event.theme}
                </div>
              </td>

              <td className="px-6 py-5">
                {event.year}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    event.registrationOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event.registrationOpen
                    ? "Open"
                    : "Closed"}
                </span>

              </td>

              <td className="px-6 py-5">

                {event.isActive ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                    Inactive
                  </span>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}