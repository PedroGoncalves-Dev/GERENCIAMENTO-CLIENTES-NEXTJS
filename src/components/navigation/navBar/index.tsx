import Image from "next/image";
import { SideBarMobile } from "../sideBar-mobile";

const NavBar = () => {
  return (
    <header className="h-14 w-full bg-white  flex items-center mb-10">
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
