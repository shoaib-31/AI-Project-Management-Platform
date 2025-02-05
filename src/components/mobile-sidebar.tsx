"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className=" lg:hidden">
          <MenuIcon className=" size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent className=" p-0" side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
