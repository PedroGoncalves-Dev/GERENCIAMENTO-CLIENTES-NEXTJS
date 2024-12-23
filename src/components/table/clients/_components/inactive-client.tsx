import { inativeClient } from "@/actions/clients/inactve";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { FcOk } from "react-icons/fc";
import { set } from "zod";

interface IpropsInativeClient {
  id: string;
  nome: string;
  cpf: string;
  setInativeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalInactiveClient = ({
  nome,
  cpf,
  id,
  setInativeOpen,
}: IpropsInativeClient) => {
  const handleInactiveCliente = async () => {
    try {
      await inativeClient(id.toString());

      toast({
        title: "sucesso",
        description: (
          <div className="flex items-center gap-2 ">
            <FcOk size={22} />
            Usuario <span className="bg-yellow-200 text-black p-1">
              {nome}
            </span>{" "}
            inativado com sucesso
          </div>
        ),
        duration: 4000,
      });

      setInativeOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao inativar ",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Inativar cliente</DialogTitle>
        <DialogDescription>
          Deseja inativar o cliente de nome{" "}
          <span className="bg-yellow-200 text-black p-1">{nome}</span> do cpf
          <span className="bg-yellow-200 text-black p-1">{cpf}</span>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>Cancelar</Button>
        </DialogClose>
        <Button onClick={handleInactiveCliente}>Confirmar</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalInactiveClient;
