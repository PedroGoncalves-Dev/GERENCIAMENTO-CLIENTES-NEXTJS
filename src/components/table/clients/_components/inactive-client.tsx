import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ModalInactiveClient = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deseja inativar o cliente</DialogTitle>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>Cancelar</Button>
        </DialogClose>
        <Button>Confirmar</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalInactiveClient;
