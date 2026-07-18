"use client";

import { useEffect, useState } from "react";
import ParishAccessTable from "@/components/settings/ParishAccessTable";
import RegenerateAccessModal from "@/components/settings/RegenerateAccessModal";

import { ParishAccess } from "@/types/settings";
import AdminTable from "@/components/settings/AdminTable";
import CreateAdminModal from "@/components/settings/CreateAdminModal";
import EditAdminModal from "@/components/settings/EditAdminModal";
import AdminStatusModal from "@/components/settings/AdminStatusModal";
import ResetPasswordModal from "@/components/settings/ResetPasswordModal";

import { Button } from "@/components/ui/button";

import { settingsService } from "@/services/admin";

import { Admin } from "@/types/settings";

export default function SettingsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedAdmin, setSelectedAdmin] =
    useState<Admin | null>(null);

  const [statusAction, setStatusAction] =
    useState<"enable" | "disable">("disable");

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [statusOpen, setStatusOpen] =
    useState(false);

  const [resetPasswordOpen, setResetPasswordOpen] =
    useState(false);


    const [parishes, setParishes] = useState<ParishAccess[]>([]);

const [selectedParish, setSelectedParish] =
  useState<ParishAccess | null>(null);

const [regenerateOpen, setRegenerateOpen] =
  useState(false);




  async function fetchAdmins() {
    try {
      setLoading(true);

      const response =
        await settingsService.getAdmins();

      setAdmins(response.data ?? response);

    } finally {

      setLoading(false);

    }
  }


  async function fetchParishes() {
  try {
    const response =
      await settingsService.getParishes();


    setParishes(response.data ?? response);

    

  } catch (error) {

    console.error(error);

  }
}



  useEffect(() => {
  fetchAdmins();
  fetchParishes();
}, []);



  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-muted-foreground">
            Manage administrators and system
            settings.
          </p>

        </div>

        <Button
          onClick={() =>
            setCreateOpen(true)
          }
        >
          Create Administrator
        </Button>

      </div>

      <AdminTable
        admins={admins}
        loading={loading}
        onEdit={(admin) => {
          setSelectedAdmin(admin);
          setEditOpen(true);
        }}
        onDisable={(admin) => {
          setSelectedAdmin(admin);
          setStatusAction("disable");
          setStatusOpen(true);
        }}
        onEnable={(admin) => {
          setSelectedAdmin(admin);
          setStatusAction("enable");
          setStatusOpen(true);
        }}
        onReset={(admin) => {
          setSelectedAdmin(admin);
          setResetPasswordOpen(true);
        }}
      />

      <CreateAdminModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={fetchAdmins}
      />

      <EditAdminModal
        open={editOpen}
        admin={selectedAdmin}
        onOpenChange={setEditOpen}
        onSuccess={fetchAdmins}
      />

      <AdminStatusModal
        open={statusOpen}
        admin={selectedAdmin}
        action={statusAction}
        onOpenChange={setStatusOpen}
        onSuccess={fetchAdmins}
      />

      <ResetPasswordModal
        open={resetPasswordOpen}
        admin={selectedAdmin}
        onOpenChange={setResetPasswordOpen}
        onSuccess={fetchAdmins}
      />



       
       <ParishAccessTable
  parishes={parishes}
  loading={loading}
  onRegenerate={(parish) => {
    setSelectedParish(parish);
    setRegenerateOpen(true);
  }}
/>



 <RegenerateAccessModal
  open={regenerateOpen}
  parish={selectedParish}
  onOpenChange={setRegenerateOpen}
  onSuccess={fetchParishes}
/>





    </div>
  );
}