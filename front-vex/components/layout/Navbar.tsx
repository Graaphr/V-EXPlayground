
"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { Logo, TextNav, Button } from "@/components/Componen";
import "@/app/globals.css";

// Definisi tipe data untuk menu agar tidak error di TypeScript
interface NavItem {
  title: string;
  subtitle: string;
  link: string;
}

interface NavbarProps {
  menuItems: NavItem[]; // Menerima daftar menu dari luar
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 py-1 rounded-b-2xl bg-white font-poppins shadow-sm">
      <div className="max-w-[80rem] mx-auto px-[20px] h-[72px] w-full flex items-center justify-between">
        
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div className="flex items-center relative h-15 w-35">
            <Logo />
          </div>
        </Link>

        {/* Desktop Menu - Mengambil dari props menuItems */}
        <div className="hidden lg:flex items-center gap-[40px]">
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
          <Button link="/login" className="px-5 py-2 hover:scale-110 text-sm font-bold rounded-md transition-all duration-300">
            Masuk
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-main-blue text-3xl">
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu - Mengambil dari props menuItems */}
      {open && (
        <div className="lg:hidden max-w-[80rem] mx-auto px-[20px] pb-5">
          <div className="flex flex-col gap-4 pt-2">
            {menuItems.map((item, index) => (
              <TextNav 
                key={index}
                link={item.link} 
                title={item.title} 
                subtitle={item.subtitle} 
              />
            ))}
            <Button link="/login" className="w-full py-3 text-sm font-bold rounded-md">
              Masuk
            </Button>
          </div>
        </div>
      )}
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


