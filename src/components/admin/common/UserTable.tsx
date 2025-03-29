import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface UserTableProps<T> {
  data: T[];
  loading?: boolean;
  error?: string;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  columns?: ColumnDef<T>[];
}

export function UserTable<T extends BaseUser>({
  data,
  loading,
  error,
  onToggleStatus,
  onDelete,
  columns,
}: UserTableProps<T>) {
  const defaultColumns: ColumnDef<T>[] = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => row.original._id.substring(0, 6),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone",
      cell: ({ row }) => row.original.phoneNumber || "N/A",
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "success" : "destructive"}>
          {row.original.isActive ? "Active" : "Blocked"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant={row.original.isActive ? "warning" : "success"}
            onClick={() => onToggleStatus(row.original._id)}
          >
            {row.original.isActive ? "Block" : "Unblock"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(row.original._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns || defaultColumns}
      data={data}
      isLoading={loading}
      error={error}
    />
  );
}