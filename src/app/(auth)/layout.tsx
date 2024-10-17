"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayoutProps = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  return (
    <main className=" bg-neutral-100 min-h-screen">
      <div className=" mx-auto max-w-screen-2xl p-4">
        <nav className=" flex justify-between items-center">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <Button asChild variant={"secondary"}>
            <Link href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
              {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className=" flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayoutProps;
