import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { FaCopy, FaRegEdit, FaSortAmountDown } from "react-icons/fa";
import { MdOutlineAutoDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcOk } from "react-icons/fc";
import { TiExportOutline } from "react-icons/ti";

const DropdownTable = ({ row }: { row: any }) => {
  const { toast } = useToast();
  const cliente = row.original;

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hover:text-slate-500 hover:cursor-pointer hover:rotate-90 transition-all duration-300 ease-in-out">
        <FaSortAmountDown size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex justify-between"
          onClick={handleCopy}
        >
          Copiar ID <FaCopy />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex justify-between">
          Detalhes <TbListDetails />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex justify-between">
          Editar <FaRegEdit />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex justify-between">
          Exportar dados <TiExportOutline />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex justify-between">
          Inativar <MdOutlineAutoDelete />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTable;
