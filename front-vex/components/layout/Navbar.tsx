// src/components/Navbar.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icon/logo-vex-ok.svg";
import { Card, Logo, TextNav, Button } from "@/components/Componen";
import "@/app/globals.css";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 py-1 rounded-b-2xl  h-16  w-full  bg-white  font-poppins">
      <div className="max-w-[80rem] mx-auto px-[60px]  h-full w-full  flex items-center justify-between ">

        <div >
          <Link href="/" className="items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center relative h-15 w-35 ">
              <Logo />
            </div>
            <span className="font-bold  dark:text-white hidden sm:block">

            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <>
            <TextNav
              link={"/"}
              title={"BERANDA"}
              subtitle={"UTAMA"} />
          </>
          <>
            <TextNav
              link={"/"}
              title={"PAMERAN"}
              subtitle={"3D BOOTH"} />
          </>
        </div>

        <div className="h-auto w-auto">
          <Button link={"/login"}
            className="h-auto w-auto  px-5 py-2  hover:scale-110 text-sm font-bold border-2 border-transparent rounded-md ease-in-out transitioin-all duration-300" onClick={() => console.log("Login Clicked")}>
            Masuk
          </Button>
        </div>


      </div>
    </nav>
  );
}
