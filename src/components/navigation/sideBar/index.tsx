import { Separator } from "@/components/ui/separator";
import { FaUserTag, FaBuildingUser } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

import Link from "next/link";
import Image from "next/image";

const SideBar = () => {
  return (
    <aside className="h-full fixed w-1/5 bg-white lg:bg-[#154360] lg:shadow-2xl lg:h-screen">
      <nav>
        <div className="pt-8 pb-10 w-full">
          <Image
            src={"/icons/logo-integraSys2.png"}
            alt={"logo"}
            width={200}
            height={200}
            className={"mx-auto"}
          />
        </div>
        <ul>
          <Separator className="w-4/5 mx-auto bg-slate-500" />

          <Link
            href={"/clients"}
            className="flex items-center p-4 gap-3 transition-transform duration-200 ease-in-out hover:scale-95  "
          >
            <FaHome className="text-slate-300 " />

            <li className="font-medium py-2 text-slate-300  ">Dashboard</li>
          </Link>

          <Separator className="w-3/5 mx-auto bg-slate-500" />

          <Link
            href={"/clients"}
            className="flex items-center p-4 gap-3 transition-transform duration-200 ease-in-out hover:scale-95  "
          >
            <FaUserTag className="text-slate-300 " />
            <li className="font-medium py-2 text-slate-300  ">
              Gestão de Clientes
            </li>
          </Link>

          <Separator className="w-3/5 mx-auto bg-slate-500" />

          <Link
            href={"/"}
            className="flex items-center p-4 gap-3 transition-transform duration-200 ease-in-out hover:scale-95"
          >
            <FaBuildingUser className="text-slate-300" />
            <li className="font-medium py-2 text-slate-300">
              Gestão de funcionários
            </li>
          </Link>

          <Separator className="w-3/5 mx-auto bg-slate-500" />

          <Link
            href={"/"}
            className="flex items-center p-4 gap-3 transition-transform duration-200 ease-in-out hover:scale-95"
          >
            <BsBoxSeamFill className="text-slate-300" />
            <li className="font-medium py-2 text-slate-300">
              Gestão de produtos
            </li>
          </Link>

          <Separator className="w-3/5 mx-auto bg-slate-500" />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
