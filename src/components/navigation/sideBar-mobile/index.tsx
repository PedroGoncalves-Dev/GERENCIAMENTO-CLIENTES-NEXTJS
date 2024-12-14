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

export function SideBarMobile() {
  return (
    <div className="grid grid-cols-2 gap-2 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <RiMenu5Line size={25} className="ml-2" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Dashboard</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
