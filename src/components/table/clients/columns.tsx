"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Iclients } from "@/data-access/clients/get-all";
import DropdownTable from "./_components/dropdown";
import InputFormatter from "@/services/phoneFormated";

interface CustomColumnMeta {
  className?: string;
}

export type CustomColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  meta?: CustomColumnMeta;
};

export const columns: CustomColumnDef<Iclients, string>[] = [
  {
    accessorKey: "id_cli",
    header: "ID",
  },
  {
    accessorKey: "nome_cli",
    header: "Nome",
  },
  {
    accessorKey: "cpf_cli",
    header: "CPF",
    cell: (row) => {
      const cpf = row.row.original.cpf_cli;

      return <InputFormatter value={cpf} type="cpf" />;
    },
  },
  {
    accessorKey: "email_cli",
    header: ({ column }) => (
      <span className="hidden md:inline-block font-semibold text-black">
        Email
      </span>
    ),
    meta: { className: "hidden md:table-cell" },
  },

  {
    accessorKey: "Ações",
    header: "Ações",
    cell: (props) => <DropdownTable {...props} />,
  },
];
