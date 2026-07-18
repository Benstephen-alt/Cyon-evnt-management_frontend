"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminLayout from "../../dashboard/AdminLayout";

import {
  getCommitteeById,
  getCommitteeMembers,
  createCommitteeAssignment,
} from "@/services/committee";

interface CommitteeMember {
  id: string;
  loginId: string;
  email: string;
  role: string;
}

interface Assignment {
  id: string;
  committeeMember: CommitteeMember;
}

interface Committee {
  id: string;
  committeeName: string;
  description: string | null;
  permissions: string[];
  assignments: Assignment[];
  createdAt: string;
}

export default function CommitteeDetailsPage() {
  const router = useRouter();

  const params = useParams();

  const committeeId = params.committeeId as string;

  const [committee, setCommittee] =
    useState<Committee | null>(null);

  const [members, setMembers] =
    useState<CommitteeMember[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [assigning, setAssigning] =
    useState(false);

  const [showAssignModal, setShowAssignModal] =
    useState(false);

  const [selectedMember, setSelectedMember] =
    useState("");

  useEffect(() => {
    if (!committeeId) return;

    initialize();
  }, [committeeId]);

  async function initialize() {
    setLoading(true);

    await Promise.all([
      loadCommittee(),
      loadMembers(),
    ]);

    setLoading(false);
  }

  async function loadCommittee() {
    try {
      const response =
        await getCommitteeById(committeeId);

      setCommittee(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load committee.");
    }
  }

  async function loadMembers() {
    try {
      const response =
        await getCommitteeMembers();

      setMembers(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  async function handleAssign() {
    if (!selectedMember) {
      alert("Select a committee member.");
      return;
    }

    try {
      setAssigning(true);

      await createCommitteeAssignment({
        committeeId,
        committeeMemberId: selectedMember,
      });

      await loadCommittee();

      setSelectedMember("");

      setShowAssignModal(false);

      alert("Member assigned successfully.");

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
          "Unable to assign member."
      );

    } finally {
      setAssigning(false);
    }
  }

  const availableMembers = useMemo(() => {
    if (!committee) return members;

    return members.filter(
      (member) =>
        !committee.assignments.some(
          (assignment) =>
            assignment.committeeMember.id === member.id
        )
    );
  }, [committee, members]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          Loading committee...
        </div>
      </AdminLayout>
    );
  }

  if (!committee) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          Committee not found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">

        <button
          onClick={() => router.back()}
          className="mb-6 text-green-700 hover:underline"
        >
          ← Back to Committees
        </button>

        <div className="rounded-xl border bg-white p-8 shadow">

          <h1 className="text-3xl font-bold">
            {committee.committeeName}
          </h1>

          <p className="mt-4 text-gray-600">
            {committee.description ||
              "No description provided."}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">

            <div className="rounded-lg border p-5">

              <p className="text-gray-500">
                Assigned Members
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {committee.assignments.length}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-gray-500">
                Permissions
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {committee.permissions.length}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-gray-500">
                Created
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                {new Date(
                  committee.createdAt
                ).toLocaleDateString()}
              </h2>

            </div>

          </div>

          <div className="mt-10">

            <h2 className="mb-4 text-xl font-bold">
              Permissions
            </h2>

            <div className="flex flex-wrap gap-3">

              {committee.permissions.map(
                (permission) => (
                  <span
                    key={permission}
                    className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
                  >
                    {permission}
                  </span>
                )
              )}

            </div>

          </div>


                    <div className="mt-12">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-bold">
                Assigned Members
              </h2>

              <button
                onClick={() => setShowAssignModal(true)}
                className="rounded-lg bg-[#0B6B3A] px-5 py-3 text-white hover:bg-green-700"
              >
                Assign Member
              </button>

            </div>

            <div className="overflow-hidden rounded-xl border">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-4 text-left">
                      Login ID
                    </th>

                    <th className="p-4 text-left">
                      Email
                    </th>

                    <th className="p-4 text-left">
                      Role
                    </th>

                    <th className="p-4 text-center">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {committee.assignments.length === 0 ? (

                    <tr>

                      <td
                        colSpan={4}
                        className="p-10 text-center text-gray-500"
                      >
                        No members assigned yet.
                      </td>

                    </tr>

                  ) : (

                    committee.assignments.map(
                      (assignment) => (

                        <tr
                          key={assignment.id}
                          className="border-t"
                        >

                          <td className="p-4">
                            {
                              assignment
                                .committeeMember
                                .loginId
                            }
                          </td>

                          <td className="p-4">
                            {
                              assignment
                                .committeeMember
                                .email
                            }
                          </td>

                          <td className="p-4">
                            {
                              assignment
                                .committeeMember
                                .role
                            }
                          </td>

                          <td className="p-4 text-center">

                            <button
                              className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                              Remove
                            </button>

                          </td>

                        </tr>

                      )

                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {showAssignModal && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-[500px] rounded-xl bg-white p-6 shadow-xl">

              <h2 className="mb-6 text-2xl font-bold">
                Assign Committee Member
              </h2>

              <select
                value={selectedMember}
                onChange={(e) =>
                  setSelectedMember(e.target.value)
                }
                className="w-full rounded-lg border p-3"
              >

                <option value="">
                  Select Committee Member
                </option>

                {availableMembers.length === 0 ? (

                  <option disabled>
                    No available members
                  </option>

                ) : (

                  availableMembers.map((member) => (

                    <option
                      key={member.id}
                      value={member.id}
                    >

                      {member.loginId}
                      {" - "}
                      {member.email}

                    </option>

                  ))

                )}

              </select>

              <div className="mt-8 flex justify-end gap-3">

                <button
                  onClick={() =>
                    setShowAssignModal(false)
                  }
                  className="rounded-lg border px-5 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAssign}
                  disabled={
                    assigning ||
                    availableMembers.length === 0
                  }
                  className="rounded-lg bg-[#0B6B3A] px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {assigning
                    ? "Assigning..."
                    : "Assign"}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}