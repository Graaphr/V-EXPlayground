"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
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
  const [openProfile, setOpenProfile] = useState(false);

  // ===== AUTH DESKTOP =====
  const AuthDesktop = () =>
    isLogin ? (
      <button
        onClick={() => setOpenProfile(true)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-main-blue text-white hover:scale-110 transition-all duration-300 shadow-md"
      >
        <FaUser size={24} className="rounded-full"/>
      </button>
    ) : (
      <Button
        link="/login"
        className="px-5 py-2 text-sm font-bold rounded-md hover:scale-110 transition"
      >
        Masuk
      </Button>
    );

  // ===== AUTH MOBILE =====
  const AuthMobile = () =>
    isLogin ? (
      <button
        onClick={() => {
          setOpen(false);
          setOpenProfile(true);
        }}
        className="flex items-center justify-center gap-2 py-3 bg-main-blue text-white rounded-lg"
      >
        <FaUser size={22} className="rounded-full"/>
        <span>Profile</span>
      </button>
    ) : (
      <Button link="/login" className="w-full py-3 text-sm font-bold rounded-md">
        Masuk
      </Button>
    );

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-sm rounded-b-2xl font-poppins">

        {/* ===== TOP BAR ===== */}
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="hover:opacity-80 transition">
            <div className="h-10 w-28 sm:h-12 sm:w-32 flex items-center">
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

          {/* AUTH DESKTOP */}
          <div className="hidden lg:block">
            <AuthDesktop />
          </div>

          {/* BURGER */}
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
          <div className="px-4 pb-5 flex flex-col gap-4">

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

      {/* ===== PROFILE SIDEBAR ===== */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          openProfile ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() => setOpenProfile(false)}
          className="absolute inset-0 bg-black/40 -sm"
        />

        {/* DRAWER */}
        <div
          className={`absolute top-0 right-0 min-h-[400px] w-[85%] sm:w-[320px] bg-white shadow-2xl p-4 transform transition-transform duration-300 rounded-l-xl
          ${openProfile ? "translate-x-0" : "translate-x-full"}`}
        >

          <div className="flex flex-col h-100">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-main-blue flex items-center justify-center text-white">
                  <FaUser size={20} className="rounded-full"/>
                </div>
                <div>
                  <p className="font-semibold">User</p>
                  <p className="text-sm text-gray-400">user@mail.com</p>
                </div>
              </div>

              <button onClick={() => setOpenProfile(false)}>
                <HiX size={24} />
              </button>
            </div>

            {/* MENU */}
            <div className="flex flex-col mt-4">
              <Link
                href="/forgot-password"
                onClick={() => setOpenProfile(false)}
                className="p-3 flex items-center gap-3 hover:bg-gray-100 transition border-b-2"
              >
                <FaLock size={18} />
                Lupa Password
              </Link>
            </div>

            {/* LOGOUT  */}
            <div className="mt-auto pt-4 border-t">
              <button
                onClick={() => {
                  setOpenProfile(false);
                  alert("Logout berhasil");
                }}
                className="w-full p-3 flex items-center justify-center gap-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition active:scale-95"
              >
                <FiLogOut />
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}