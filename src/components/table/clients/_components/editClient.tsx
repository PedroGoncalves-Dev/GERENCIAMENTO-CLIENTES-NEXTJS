import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Iclients } from "@/data-access/clients/get-all";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newClientSchema, TypeNewClient } from "@/schema/clients/schema-create";

interface IpropsModalEdit {
  cliente: Iclients;
}
const EditClient = ({ cliente }: IpropsModalEdit) => {
  const { register, handleSubmit } = useForm<TypeNewClient>({
    resolver: zodResolver(newClientSchema),
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription asChild>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                defaultValue={cliente.nome_cli}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue={cliente.email_cli}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="" className="block text-sm font-medium">
                Data de nascimento
              </label>
              <input type="text" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="" className="block text-sm font-medium">
                  CPF:
                </label>
                <input type="text" className="border-b" />
              </div>

              <div>
                <label htmlFor="" className="block text-sm font-medium">
                  Telefone:
                </label>
                <input type="text" className="border-b" />
              </div>
            </div>
          </form>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancelar</Button>
        <Button type="submit">Salvar alterações</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditClient;
