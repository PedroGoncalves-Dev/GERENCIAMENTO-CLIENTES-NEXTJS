import type { Metadata } from "next";
import FormNewClient from "./_components/form-new-client";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Adicionar Cliente",
  description: "Adicionar novo cliente",
};

export default function addedClient() {
  return (
    <main className="bg-white w-[90%] mx-auto rounded-md p-5 my-4 ">
      <div>
        <h1 className="font-bold text-center">Cadastrar novo cliente</h1> 
      </div>

      <Separator className="my-4" />

      <FormNewClient />
    </main>
  );
}
