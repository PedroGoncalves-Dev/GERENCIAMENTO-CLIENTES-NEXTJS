import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Iclients } from "@/data-access/clients/get-all";
import PhoneFormatter from "@/services/phoneFormated";

interface IpropsModal {
  cliente: Iclients;
}
const DetailsClient = ({ cliente }: IpropsModal) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do Cliente</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-repeat-1-min400px lg:grid-cols-repeat-2-min400px gap-4 ">
        <div className="bg-blue-800 rounded-l-2xl flex justify-end shadow-md">
          <div className="grid grid-cols-2 rounded-l-2xl gap-2 bg-slate-100 w-[98%] p-4">
            <h2 className="col-span-2 text-lg font-bold border-b pb-2 text-blue-900">
              Dados pessoais
            </h2>
            <span className="font-bold text-sm md:text-base">ID:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.id_cli}
            </span>
            <span className="font-bold text-sm md:text-base">Nome:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.nome_cli}
            </span>
            <span className="font-bold text-sm md:text-base">CPF:</span>
            <PhoneFormatter type="cpf" value={cliente.cpf_cli} />
            <span className="font-bold text-sm md:text-base">
              Data de nascimento:
            </span>
            <span className="text-sm md:text-base break-words">
              {cliente.data_nascimento_cli}
            </span>
          </div>
        </div>

        <div className="bg-blue-800 rounded-l-2xl flex justify-end shadow-md">
          <div className="grid grid-cols-2 gap-2 rounded-l-2xl bg-slate-100 w-[98%] p-4">
            <h2 className="col-span-2 text-lg font-bold border-b pb-2 text-blue-900">
              Endereço
            </h2>
            <span className="font-bold text-sm md:text-base">CEP:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.cep}
            </span>
            <span className="font-bold text-sm md:text-base">Logradouro:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.logradouro}
            </span>
            <span className="font-bold text-sm md:text-base">Complemento:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.complemento}
            </span>
            <span className="font-bold text-sm md:text-base">Bairro:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.bairro}
            </span>
            <span className="font-bold text-sm md:text-base">Cidade:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.cidade}
            </span>
            <span className="font-bold text-sm md:text-base">UF:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.estado}
            </span>
          </div>
        </div>

        <div className="bg-blue-800 rounded-l-2xl flex justify-end shadow-md">
          <div className="flex flex-col rounded-l-2xl bg-slate-100 w-[98%] p-4">
            <h2 className="text-lg font-bold border-b pb-2 text-blue-900">
              Contato
            </h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span className="font-bold text-sm md:text-base">Telefone: </span>
              <PhoneFormatter value={cliente.telefone_cli} type="celular" />
              <span className="font-bold text-sm md:text-base">email: </span>
              <span className="text-sm md:text-base break-all overflow-hidden">
                {cliente.email_cli}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-l-2xl flex justify-end shadow-md">
          <div className="grid grid-cols-2 gap-2 rounded-l-2xl bg-slate-100 w-[98%] p-4">
            <h2 className="col-span-2 text-lg font-bold border-b pb-2 text-blue-900">
              Observações:
            </h2>
            <span className="font-bold text-sm md:text-base">
              Cadastrado criado:
            </span>
            <span className="text-sm md:text-base break-words">
              {cliente.criado_em}
            </span>
            <span className="font-bold text-sm md:text-base">
              Atualizado em:
            </span>
            <span className="text-sm md:text-base break-words">
              {cliente.atualizado_em}
            </span>
            <span className="font-bold text-sm md:text-base">Status:</span>
            <span className="text-sm md:text-base break-words">
              {cliente.status ? "Ativo" : "Inativo"}
            </span>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button>Fechar</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DetailsClient;
