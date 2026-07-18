import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Admin } from "@/types/settings";

interface Props {
  admins: Admin[];

  loading: boolean;

  onEdit(admin: Admin): void;

  onDisable(admin: Admin): void;

  onEnable(admin: Admin): void;

  onReset(admin: Admin): void;
}

export default function AdminTable({
  admins,
  loading,
  onEdit,
  onDisable,
  onEnable,
  onReset,
}: Props) {
  return (
    <div className="rounded-lg border bg-white">

      <div className="flex items-center justify-between p-5">

        <div>

          <h2 className="text-lg font-semibold">
            Administrators
          </h2>

          <p className="text-sm text-muted-foreground">
            Manage administrator accounts.
          </p>

        </div>

      </div>

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Name</TableHead>

            <TableHead>Email</TableHead>

            <TableHead>Phone</TableHead>

            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-16"></TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {admins.map((admin) => (

            <TableRow key={admin.id}>

              <TableCell>

                {admin.fullName}

              </TableCell>

              <TableCell>

                {admin.email}

              </TableCell>

              <TableCell>

                {admin.phoneNumber || "-"}

              </TableCell>

              <TableCell>

                <Badge>

                  {admin.role}

                </Badge>

              </TableCell>

              <TableCell>

                {admin.isActive ? (
                  <Badge className="bg-green-600">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Disabled
                  </Badge>
                )}

              </TableCell>

              <TableCell>

                <DropdownMenu>

                  <DropdownMenuTrigger
  className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
>
  <MoreVertical className="h-4 w-4" />
</DropdownMenuTrigger>
                  <DropdownMenuContent align="end">

                    <DropdownMenuItem
                      onClick={() =>
                        onEdit(admin)
                      }
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        onReset(admin)
                      }
                    >
                      Reset Password
                    </DropdownMenuItem>

                    {admin.isActive ? (

                      <DropdownMenuItem
                        onClick={() =>
                          onDisable(admin)
                        }
                        className="text-red-600"
                      >
                        Disable
                      </DropdownMenuItem>

                    ) : (

                      <DropdownMenuItem
                        onClick={() =>
                          onEnable(admin)
                        }
                      >
                        Enable
                      </DropdownMenuItem>

                    )}

                  </DropdownMenuContent>

                </DropdownMenu>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>
  );
}