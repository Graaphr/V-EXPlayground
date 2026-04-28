import type { Metadata } from "next";
import { Geist, Geist_Mono, Tilt_Warp, Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import NavAdmin from "@/components/dashboard/NavAdmin";

export const metadata: Metadata = {
  title: "V-EX | Admin",
  description: "Virtual Exhibition",
};

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userMenu = [
    { title: "BERANDA", subtitle: "UTAMA", link: "/" },
    { title: "PAMERAN", subtitle: "3D BOOTH", link: "/pameran" },
    { title: "DASHBOARD", subtitle: "ADMIN", link: "/admin" },
  ];
  return (
    <div>
      <Navbar menuItems={userMenu} isLogin={true} />
      <NavAdmin />
      {children}
    </div>
  );
}
