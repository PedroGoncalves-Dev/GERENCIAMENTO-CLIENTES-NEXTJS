import { Separator } from "@/components/ui/separator";
import { FaUserTag } from "react-icons/fa6";
import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="h-full px-4">
      <nav>
        <ul>
          <Link href={"/"} className="flex items-center gap-3">
            <FaUserTag />
            <li className="font-semibold py-2">Gestão de Clientes</li>
          </Link>

          <Separator />

          <Link href={"/"}>
            <li className="font-semibold py-2">Item 2</li>
          </Link>

          <Separator />

          <Link href={"/"}>
            <li className="font-semibold py-2">Item 3</li>
          </Link>

          <Separator />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
