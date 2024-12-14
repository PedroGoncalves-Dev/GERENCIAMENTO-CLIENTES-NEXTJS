import Image from "next/image";
import { SideBarMobile } from "../sideBar-mobile";

const NavBar = () => {
  return (
    <header className="h-12 bg-[#f0ddb5] flex items-center">
      <Image
        src="/icons/logo.svg"
        alt="logo"
        width={80}
        height={50}
        className="ml-2"
      />
      <SideBarMobile />
    </header>
  );
};

export default NavBar;
