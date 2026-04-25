
"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { Logo, TextNav, Button } from "@/components/Componen";

// ===== TYPES =====
interface NavItem {
  title: string;
  subtitle: string;
  link: string;
}

interface NavbarProps {
  menuItems: NavItem[];
  isLogin?: boolean;
}

// ===== COMPONENT =====
export default function Navbar({ menuItems, isLogin = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  // Component Desktop
  const AuthDesktop = () => (
    isLogin ? (
      <Link href="/profile">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-main-blue text-white hover:scale-110 transition-all duration-300 shadow-md">
          <FaUser size={30} className="rounded-full" />
        </div>
      </Link>
    ) : (
      <Button
        link="/login"
        className="px-5 py-2 text-sm font-bold rounded-md hover:scale-110 transition"
      >
        Masuk
      </Button>
    )
  );
 // Component Desktop
  const AuthMobile = () => (
    isLogin ? (
      <Link
        href="/profile"
        onClick={() => setOpen(false)}
        className="flex items-center justify-center gap-2 py-3 bg-main-blue text-white rounded-lg"
      >
        <FaUser size={30} className="rounded-full"/>
        <span>Profile</span>
      </Link>
    ) : (
      <Button
        link="/login"
        className="w-full py-3 text-sm font-bold rounded-md"
      >
        Masuk
      </Button>
    )
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm rounded-b-2xl font-poppins">

      {/* ===== TOP BAR ===== */}
      <div className="max-w-[80rem] mx-auto px-[20px] h-[72px] w-full flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="hover:opacity-80 transition">
          <div className="h-12 w-32 flex items-center">
            <Logo />
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item, index) => (
            <TextNav
              key={index}
              link={item.link}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
        </div>

        <div className="hidden lg:block">
          <AuthDesktop />
        </div>

        {/* BURGER BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-main-blue text-3xl"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-5 flex flex-col gap-4">

          {menuItems.map((item, index) => (
            <TextNav
              key={index}
              link={item.link}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}

          <AuthMobile />

        </div>
      </div>

    </nav>
  );
}

//*
//*
//=== DATA LAMA JANGAN DI HAPUS
//*
//* 

// "use client";

// import { useState, useEffect } from "react"; // Tambahkan useEffect untuk cek status login
// import Link from "next/link";
// import { HiMenu, HiX } from "react-icons/hi";
// import { Logo, TextNav, Button } from "@/components/Componen";
// import "@/app/globals.css";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
  
//   // Simulasi status login Admin. 
//   // Nanti ganti dengan pengecekan asli dari token/session/context kamu.
//   const [isAdmin, setIsAdmin] = useState(false);

//   // Contoh logika pengambilan status admin (Opsional)
//   useEffect(() => {
//     // Misal ambil data user dari localStorage
//     const userRole = localStorage.getItem("role"); 
//     if (userRole === "admin") {
//       setIsAdmin(true);
//     }
//   }, []);

//   return (
//     <nav className="sticky top-0 z-50 py-1 rounded-b-2xl bg-white font-poppins shadow-sm">

//       {/* Top Bar */}
//       <div className="max-w-[80rem] mx-auto px-[20px] h-[72px] w-full flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="items-center gap-2 hover:opacity-80 transition-opacity">
//           <div className="flex items-center relative h-15 w-35">
//             <Logo />
//           </div>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden lg:flex items-center gap-[40px]">
//           <TextNav link={"/"} title={"BERANDA"} subtitle={"UTAMA"} />
//           <TextNav link={"/pameran"} title={"PAMERAN"} subtitle={"3D BOOTH"} />
          
//           {/* Admin Muncul */}
//           {isAdmin && (
//             <TextNav 
//               link={"/admin"} 
//               title={"DASHBOARD"} 
//               subtitle={"ADMIN"} 
//             />
//           )}
//         </div>

//         {/* Desktop Button */}
//         <div className="hidden lg:block">
//           <Button
//             link={"/login"}
//             className="px-5 py-2 hover:scale-110 text-sm font-bold rounded-md transition-all duration-300"
//           >
//             Masuk
//           </Button>
//         </div>

//         {/* Burger Button */}
//         <button onClick={() => setOpen(!open)} className="lg:hidden text-main-blue text-3xl">
//           {open ? <HiX /> : <HiMenu />}
//         </button>

//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="lg:hidden max-w-[80rem] mx-auto px-[20px] pb-5">
//           <div className="flex flex-col gap-4 pt-2">
//             <TextNav link={"/"} title={"BERANDA"} subtitle={"UTAMA"} />
//             <TextNav link={"/pameran"} title={"PAMERAN"} subtitle={"3D BOOTH"} />

//             {/* LOGIKA ADMIN MOBILE */}
//             {isAdmin && (
//               <TextNav 
//                 link={"/admin/dashboard"} 
//                 title={"DASHBOARD"} 
//                 subtitle={"ADMIN"} 
//               />
//             )}

//             <Button link={"/login"} className="w-full py-3 text-sm font-bold rounded-md">
//               Masuk
//             </Button>
//           </div>
//         </div>
//       )}

//     </nav>
//   );
// }


