"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { FaRegCopy, FaRegEdit, FaSortAmountDown } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcOk } from "react-icons/fc";
import { TiExportOutline } from "react-icons/ti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DetailsClient from "./detailsClient";
import EditClient from "./editClient";

const DropdownTable = ({ row }: { row: any }) => {
  const { toast } = useToast();
  const cliente = row.original;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cliente.id_cli.toString());
      toast({
        title: "Sucesso",
        description: (
          <div className="flex items-center gap-2">
            <FcOk />
            ID copiado com sucesso!
          </div>
        ),
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar ID",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDetailsClick = () => {
    setIsDetailsOpen(true);
    setDropdownOpen(false);
    setModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
    setDropdownOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger className="outline-none hover:text-slate-500 hover:cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out">
            <FaSortAmountDown size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer flex justify-between"
              onClick={handleCopy}
            >
              Copiar ID <FaRegCopy />
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer flex justify-between"
                onClick={handleDetailsClick}
              >
                Detalhes <TbListDetails />
              </DropdownMenuItem>
            </DialogTrigger>

            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer flex justify-between"
                onClick={handleEditClick}
              >
                Editar <FaRegEdit />
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem className="cursor-pointer flex justify-between">
              Exportar dados <TiExportOutline />
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex justify-between">
              Inativar <MdOutlineAutoDelete />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Modal de Detalhes */}

        {isDetailsOpen && <DetailsClient cliente={cliente} />}

        {isEditOpen && <EditClient cliente={cliente} />}
      </Dialog>
    </>
  );
};

export default DropdownTable;
