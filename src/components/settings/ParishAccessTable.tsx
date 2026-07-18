"use client";

import { useMemo, useState } from "react";
import { MoreVertical, Search, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ParishAccess } from "@/types/settings";

interface ParishAccessTableProps {
  parishes: ParishAccess[];
  loading?: boolean;
  onRegenerate: (parish: ParishAccess) => void;
}

export default function ParishAccessTable({
  parishes,
  loading = false,
  onRegenerate,
}: ParishAccessTableProps) {
  const [search, setSearch] = useState("");

  const filteredParishes = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return parishes;

    return parishes.filter((parish) =>
      parish.parishName.toLowerCase().includes(keyword) ||
      parish.deaneryName.toLowerCase().includes(keyword) ||
      parish.accessCode.toLowerCase().includes(keyword)
    );
  }, [parishes, search]);

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Parish Access Codes
        </CardTitle>

        <CardDescription>
          Manage parish login access codes.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-5">

        <div className="relative max-w-md">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search parish..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-9"
          />

        </div>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>Parish</TableHead>

              <TableHead>Deanery</TableHead>

              <TableHead>Access Code</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="w-20" />

            </TableRow>

          </TableHeader>

          <TableBody>

            {!loading &&
              filteredParishes.map((parish) => (

                <TableRow key={parish.id}>

                  <TableCell className="font-medium">
                    {parish.parishName}
                  </TableCell>

                  <TableCell>
                    {parish.deaneryName}
                  </TableCell>

                  <TableCell>

                    <span className="font-mono font-semibold">
                      {parish.accessCode}
                    </span>

                  </TableCell>

                  <TableCell>

                    {parish.isApproved ? (
                      <Badge>
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Pending Approval
                      </Badge>
                    )}

                  </TableCell>

                  <TableCell className="text-right">

                    <DropdownMenu>

                      <DropdownMenuTrigger
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">

                        <DropdownMenuItem
                          onClick={() =>
                            onRegenerate(parish)
                          }
                        >
                          <KeyRound className="mr-2 h-4 w-4" />
                          Regenerate Access Code
                        </DropdownMenuItem>

                      </DropdownMenuContent>

                    </DropdownMenu>

                  </TableCell>

                </TableRow>

              ))}

            {!loading &&
              filteredParishes.length === 0 && (
                <TableRow>

                  <TableCell
                    colSpan={5}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No parish found.
                  </TableCell>

                </TableRow>
              )}

          </TableBody>

        </Table>

      </CardContent>

    </Card>
  );
}