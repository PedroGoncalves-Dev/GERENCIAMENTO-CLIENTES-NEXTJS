"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Iclients } from "@/data-access/clients/get-all";
import { FaSortAmountDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none hover:text-slate-500 hover:cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out">
            <FaSortAmountDown size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Inativar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
