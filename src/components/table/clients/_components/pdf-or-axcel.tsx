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
import { exportToExcel } from "@/components/excel/function-excel";
import { toast } from "@/hooks/use-toast";
import { FcOk } from "react-icons/fc";

const ModalPdfOrAxcel = () => {
  const { client } = useClient();
  const dadosCliente = [
    {
      Id: client?.id_cli,
      Nome: client?.nome_cli,
      CPF: client?.cpf_cli,
      Email: client?.email_cli,
      Telefone: client?.telefone_cli,
      Data_nascimento: client?.data_nascimento_cli,
      Sexo: client?.sexo_cli,
      Status: client?.status,
      Criado_em: client?.criado_em,
      Atualizado_em: client?.atualizado_em,
    },
  ];
  const hanldeExportToExcel = async () => {
    try {
      await exportToExcel(dadosCliente, "dados-cliente");
      toast({
        title: "Sucesso",
        description: (
          <div className="flex items-center gap-2">
            <FcOk />
            Download para excel com sucesso!
          </div>
        ),
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer o download",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Download</DialogTitle>
        <DialogDescription>Deseja fazer o downloado para ...</DialogDescription>
      </DialogHeader>
      <div className="flex gap-4 justify-center items-center">
        <Button
          onClick={hanldeExportToExcel}
          className="bg-green-500 focus:outline-none hover:bg-green-300 hover:text-slate-500 transition-colors duration-300 ease-out"
        >
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
