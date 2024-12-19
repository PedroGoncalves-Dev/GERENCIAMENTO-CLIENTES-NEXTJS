"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel, // Adicione este import
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Importe o componente Button
import { CustomColumnDef } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Adicione este modelo
    initialState: {
      pagination: {
        pageSize: 10, // Define o número de itens por página
      },
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-slate-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.columnDef.meta?.className ||
                      "font-semibold text-black"
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-white even:bg-slate-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className || ""}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/*controles de paginação */}
      <div className="flex items-center justify-end py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="gap-1 pl-2.5"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Anterior</span>
              </Button>
            </PaginationItem>

            <PaginationItem>
              <span className="px-4">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount()}
              </span>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="gap-1 pr-2.5"
              >
                <span>Próxima</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
