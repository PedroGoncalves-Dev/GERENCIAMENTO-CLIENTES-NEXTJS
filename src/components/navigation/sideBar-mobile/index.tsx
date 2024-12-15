"use client";

import { Button } from "@/components/ui/button";
import { RiMenu5Line } from "react-icons/ri";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideBar from "../sideBar";
import { Separator } from "@/components/ui/separator";

export function SideBarMobile() {
  return (
    <div className="grid grid-cols-2 gap-2 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <RiMenu5Line size={25} className="ml-2" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <Separator />
          <SideBar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
