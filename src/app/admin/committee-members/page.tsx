"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminLayout from "../dashboard/AdminLayout";

import { createCommitteeMember, getAvailableCommitteeUsers, getCommitteeMembers } from "@/services/committee";

interface CommitteeMember {
  id: string;
  loginId: string;
  email: string;
  role: string;
  isActive: boolean;
  totalAssignments: number;
  createdAt: string;
}

export default function CommitteeMembersPage() {
  const [members, setMembers] = useState<
    CommitteeMember[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadMembers();
  }, []);


  const [availableUsers, setAvailableUsers] =
  useState<any[]>([]);

const [showModal, setShowModal] =
  useState(false);

const [selectedUser, setSelectedUser] =
  useState("");

const [creating, setCreating] =
  useState(false);

  

  async function loadAvailableUsers() {
  try {
    const response =
      await getAvailableCommitteeUsers();

    setAvailableUsers(response.data);

  } catch (error) {
    console.error(error);
  }
}


async function handleCreateMember() {
  if (!selectedUser) {
    alert("Select a user.");
    return;
  }

  try {

    setCreating(true);

    await createCommitteeMember({
      userId: selectedUser,
    });

    await loadMembers();

    setSelectedUser("");

    setShowModal(false);

    alert(
      "Committee member created successfully."
    );

  } catch (error: any) {

    alert(
      error?.response?.data?.message ??
      "Unable to create committee member."
    );

  } finally {

    setCreating(false);

  }
}



  async function loadMembers() {
    try {
      const response =
        await getCommitteeMembers();

      setMembers(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load committee members."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <AdminLayout>

      <div className="p-8">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Committee Members
            </h1>

            <p className="mt-2 text-gray-500">
              Total Members: {members.length}
            </p>

          </div>

          <button
  onClick={async () => {

    await loadAvailableUsers();

    setShowModal(true);

  }}
  className="rounded-lg bg-[#0B6B3A] px-5 py-3 text-white hover:bg-green-700"
>
  Add Member
</button>

        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Login ID
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-center">
                  Role
                </th>

                <th className="p-4 text-center">
                  Committees
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={6}
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : members.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="p-10 text-center"
                  >
                    No committee members found.
                  </td>

                </tr>

              ) : (

                members.map((member) => (

                  <tr
                    key={member.id}
                    className="border-t"
                  >

                    <td className="p-4 font-medium">
                      {member.loginId}
                    </td>

                    <td className="p-4">
                      {member.email}
                    </td>

                    <td className="p-4 text-center">
                      {member.role}
                    </td>

                    <td className="p-4 text-center">
                      {member.totalAssignments}
                    </td>

                    <td className="p-4 text-center">

                      {member.isActive ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Active
                        </span>

                      ) : (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Inactive
                        </span>

                      )}

                    </td>

                    <td className="p-4 text-center">

                      <Link
                        href={`/admin/committee-members/${member.id}`}
                        className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white hover:bg-green-700"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>


          {showModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

<div className="w-[500px] rounded-xl bg-white p-6">

<h2 className="mb-6 text-2xl font-bold">

Add Committee Member

</h2>

<select
value={selectedUser}
onChange={(e)=>
setSelectedUser(e.target.value)
}
className="w-full rounded-lg border p-3"
>

<option value="">
Select User
</option>

{availableUsers.length === 0 ? (

<option disabled>

No available users

</option>

) : (

availableUsers.map((user)=>(

<option
key={user.id}
value={user.id}
>

{user.loginId}
{" - "}
{user.email}

</option>

))

)}

</select>

<div className="mt-8 flex justify-end gap-3">

<button
onClick={()=>
setShowModal(false)
}
className="rounded-lg border px-5 py-2"
>

Cancel

</button>

<button
  onClick={handleCreateMember}
  disabled={!selectedUser || creating}
  className="rounded-lg bg-[#0B6B3A] px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {creating ? "Creating..." : "Create"}
</button>

</div>

</div>

</div>

)} 





    </AdminLayout>
  );
}