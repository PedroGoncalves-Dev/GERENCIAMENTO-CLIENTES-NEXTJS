import { DataTable } from "@/components/table/clients/data-table";
import { columns } from "@/components/table/clients/columns";
import { getAllClients } from "@/data-access/clients/get-all";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Descrição da página",
};

export default async function clients() {
  // const data = await getAllClients();
  return (
    <main>
      <DataTable columns={columns} data={[]} />
    </main>
  );
}
