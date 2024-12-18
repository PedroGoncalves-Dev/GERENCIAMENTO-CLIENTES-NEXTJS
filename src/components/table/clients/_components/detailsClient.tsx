import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Iclients } from "@/data-access/clients/get-all";

interface IpropsModal {
  cliente: Iclients;
}
const DetailsClient = ({ cliente }: IpropsModal) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do Cliente</DialogTitle>
        <DialogDescription asChild>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold">ID:</span>
              <span>{cliente.id_cli}</span>

              <span className="font-semibold">Nome:</span>
              <span>{cliente.nome_cli}</span>

              <span className="font-semibold">Email:</span>
              <span>{cliente.email_cli}</span>

              <span className="font-semibold">CPF:</span>
              <span>{cliente.cpf_cli}</span>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
        //   onClick={() => {
        //     setIsDetailsOpen(false);
        //     setModalOpen(false);
        //   }}
        >
          Fechar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DetailsClient;
