import { DataTable } from "@/components/table/clients/data-table";
import { columns } from "@/components/table/clients/columns";
import { getAllClients } from "@/data-access/clients/get-all";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Descrição da página",
};

export default async function clients() {
  const data = await getAllClients();
  return (
    <main className="bg-white w-[90%] mx-auto rounded-md p-5 my-4 ">
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tabela de clientes</h1>

        <div>
          <Button>Ativos</Button>
        </div>
      </section>
      <Separator className="my-4" />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
