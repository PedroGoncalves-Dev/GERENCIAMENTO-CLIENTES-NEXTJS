"use client";
import DownloadPdf from "@/components/pdf/download-button";
import { ImSpinner } from "react-icons/im";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useClient } from "@/context/client-context";

const ModalPdfOrAxcel = () => {
  const { client } = useClient();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Download</DialogTitle>
        <DialogDescription>Deseja fazer o downloado para ...</DialogDescription>
      </DialogHeader>
      <div className="flex gap-4 justify-center items-center">
        <Button className="bg-green-500 focus:outline-none hover:bg-green-300 hover:text-slate-500 transition-colors duration-300 ease-out">
          Excel
        </Button>
        {client ? (
          <div className="flex gap-4">
            <DownloadPdf />
            {/* Outros botões de exportação */}
          </div>
        ) : (
          <Button className="bg-blue-500 ">
            <ImSpinner className="animate-spin" />
          </Button>
        )}
      </div>
    </DialogContent>
  );
};

export default ModalPdfOrAxcel;
