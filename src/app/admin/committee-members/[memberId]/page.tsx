"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import AdminLayout from "../../dashboard/AdminLayout";

import {
    deleteCommitteeMember,
  getCommitteeMemberById,
  updateCommitteeMember,
} from "@/services/committee";

interface Committee {
  assignmentId: string;
  committeeId: string;
  committeeName: string;
}

interface CommitteeMember {
  id: string;
  userId: string;
  loginId: string;
  email: string;
  role: string;
  isActive: boolean;
  committees: Committee[];
  createdAt: string;
  updatedAt: string;
}

export default function CommitteeMemberDetailsPage() {
  const router = useRouter();

  const params = useParams();

  const memberId = params.memberId as string;

  const [member, setMember] =
    useState<CommitteeMember | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    if (!memberId) return;

    loadMember();
  }, [memberId]);

  async function loadMember() {
    try {
      setLoading(true);

      const response =
        await getCommitteeMemberById(memberId);

      setMember(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load committee member."
      );

    } finally {

      setLoading(false);

    }
  }


async function handleToggleStatus() {
  if (!member) return;

  const action = member.isActive
    ? "deactivate"
    : "activate";

  const confirmed = window.confirm(
    `Are you sure you want to ${action} this committee member?`
  );

  if (!confirmed) return;

  try {
    setUpdating(true);

    await updateCommitteeMember(member.id, {
      isActive: !member.isActive,
    });

    await loadMember();

    alert(
      `Committee member ${action}d successfully.`
    );

  } catch (error: any) {

    alert(
      error?.response?.data?.message ??
      "Unable to update committee member."
    );

  } finally {

    setUpdating(false);

  }
}


async function handleDelete() {
  if (!member) return;

  if (member.committees.length > 0) {
    alert(
      "Remove all committee assignments before deleting this member."
    );
    return;
  }

  const confirmed = window.confirm(
    "Delete this committee member permanently?"
  );

  if (!confirmed) return;

  try {
    setDeleting(true);

    await deleteCommitteeMember(member.id);

    alert(
      "Committee member deleted successfully."
    );

    router.push("/admin/committee-members");

  } catch (error: any) {

    alert(
      error?.response?.data?.message ??
      "Unable to delete committee member."
    );

  } finally {

    setDeleting(false);

  }
}



  if (loading) {
    return (
      <AdminLayout>
        <div className="p-10 text-center">
          Loading committee member...
        </div>
      </AdminLayout>
    );
  }

  if (!member) {
    return (
      <AdminLayout>
        <div className="p-10 text-center">
          Committee member not found.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="p-8">

        <button
          onClick={() => router.back()}
          className="mb-6 text-[#0B6B3A] hover:underline"
        >
          ← Back to Committee Members
        </button>

        <div className="rounded-xl border bg-white p-8 shadow">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                {member.loginId}
              </h1>

              <p className="mt-2 text-gray-500">
                {member.email}
              </p>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                member.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {member.isActive
                ? "Active"
                : "Inactive"}
            </span>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">

            <div className="rounded-lg border p-5">

              <p className="text-sm text-gray-500">
                Login ID
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {member.loginId}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-sm text-gray-500">
                System Role
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {member.role}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-sm text-gray-500">
                Email Address
              </p>

              <h2 className="mt-2 break-all text-lg font-semibold">
                {member.email}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-sm text-gray-500">
                Assigned Committees
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {member.committees.length}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-sm text-gray-500">
                Created
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                {new Date(
                  member.createdAt
                ).toLocaleDateString()}
              </h2>

            </div>

            <div className="rounded-lg border p-5">

              <p className="text-sm text-gray-500">
                Last Updated
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                {new Date(
                  member.updatedAt
                ).toLocaleDateString()}
              </h2>

            </div>

          </div>

          <div className="mt-10">

            <h2 className="mb-5 text-2xl font-bold">
              Assigned Committees
            </h2>

                        <div className="overflow-hidden rounded-xl border">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-4 text-left">
                      Committee
                    </th>

                    <th className="p-4 text-center">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {member.committees.length === 0 ? (

                    <tr>

                      <td
                        colSpan={2}
                        className="p-10 text-center text-gray-500"
                      >
                        No committee assignments found.
                      </td>

                    </tr>

                  ) : (

                    member.committees.map((committee) => (

                      <tr
                        key={committee.assignmentId}
                        className="border-t"
                      >

                        <td className="p-4 font-medium">
                          {committee.committeeName}
                        </td>

                        <td className="p-4 text-center">

                          <Link
                            href={`/admin/committees/${committee.committeeId}`}
                            className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white hover:bg-green-700"
                          >
                            View Committee
                          </Link>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

          <div className="mt-10 flex justify-end gap-4">

            <button
  onClick={handleToggleStatus}
  disabled={updating}
  className={`rounded-lg px-6 py-3 text-white ${
    member.isActive
      ? "bg-yellow-600 hover:bg-yellow-700"
      : "bg-green-600 hover:bg-green-700"
  } disabled:cursor-not-allowed disabled:opacity-50`}
>
  {updating
    ? "Updating..."
    : member.isActive
    ? "Deactivate Member"
    : "Activate Member"}
</button>

           <button
  onClick={handleDelete}
  disabled={
    deleting ||
    member.committees.length > 0
  }
  className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {deleting
    ? "Deleting..."
    : "Delete Member"}
</button>

          </div>

          {member.committees.length > 0 && (

            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">

              <p className="text-sm text-yellow-700">

                This committee member cannot be deleted
                until all committee assignments have been
                removed.

              </p>

            </div>

          )}

        </div>

      </div>

    </AdminLayout>

  );

}