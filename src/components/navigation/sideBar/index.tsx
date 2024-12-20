import { Separator } from "@/components/ui/separator";
import { FaUserTag } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="h-full px-4 bg-white lg:bg-orange-50 shadow-2xl lg:h-screen">
      <nav>
        <ul>
          <Link
            href={"/home"}
            className="flex items-center justify-center gap-3 transition-transform duration-200 ease-in-out hover:scale-95"
          >
            <FaHome />
            <li className="font-semibold py-8 text-center">Dashboard</li>
          </Link>

          <Separator />

          <Link
            href={"/clients"}
            className="flex items-center gap-3 transition-transform duration-200 ease-in-out hover:scale-95"
          >
            <FaUserTag />
            <li className="font-semibold py-2">Gestão de Clientes</li>
          </Link>

          <Separator />

          <Link
            href={"/"}
            className="flex items-center gap-3 transition-transform duration-200 ease-in-out hover:scale-95"
          >
            <li className="font-semibold py-2">Item 2</li>
          </Link>

          <Separator />

          <Link
            href={"/"}
            className="flex items-center gap-3 transition-transform duration-200 ease-in-out hover:scale-95"
          >
            <li className="font-semibold py-2">Item 3</li>
          </Link>

          <Separator />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
