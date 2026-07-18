"use client";

import { useEffect, useState } from "react";
import AdminLayout from "../dashboard/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  getDeaneries,
  deleteDeanery,
} from "@/services/deanery.service";
import CreateDeaneryDialog from "./CreateDeaneryDialog";
import EditDeaneryDialog from "./EditDeaneryDialog";

export default function DeaneriesPage() {
  const [deaneries, setDeaneries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeaneries();
  }, []);

  async function loadDeaneries() {
    try {
      setLoading(true);

      const response = await getDeaneries();

      if (response.success) {
        setDeaneries(response.deaneries);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load deaneries.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this deanery?")) return;

    const response = await deleteDeanery(id);

    if (response.success) {
      loadDeaneries();
    } else {
      alert(response.message);
    }
  }

  return (
    <AdminLayout>

      <div className="p-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-[#0B6B3A]">
              Deaneries
            </h1>

            <p className="text-gray-500 mt-2">
              Manage diocesan deaneries.
            </p>

          </div>

          <CreateDeaneryDialog
            onSuccess={loadDeaneries}
          />

        </div>

        {loading ? (

          <div className="text-center mt-20">
            Loading...
          </div>

        ) : (

          <div className="mt-8 bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left p-4">
                    Name
                  </th>

                  <th className="text-left p-4">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {deaneries.map((deanery: any) => (

                  <tr
                    key={deanery.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {deanery.name}
                    </td>

                    <td className="p-4 flex gap-2">

                      <EditDeaneryDialog
                        deanery={deanery}
                        onSuccess={loadDeaneries}
                      />

                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleDelete(deanery.id)
                        }
                      >
                        Delete
                      </Button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </AdminLayout>
  );
}