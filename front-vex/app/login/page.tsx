"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Komponen & Assets
import { Logo, Button, ButtonPutih } from "@/app/components/Componen";
import { VectorBox } from "@/app/components/model/BoxModel";

export default function LoginPage() {
  const slideUp = {
    initial: { y: "100vh", opacity: 0 },
    animate: { 
      y: [0, -15, 0], 
      opacity: 1 
    },
  };

  const floatingTransition = (d: number) => ({
    y: {
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: d + 1.2, 
    },
    
    opacity: { duration: 1.2, delay: d },
    default: { ease: "easeOut" }
  });

  return (
    <div className="bg-secondary-color overflow-hidden min-h-screen flex items-center justify-center p-4 relative text-black">
      
      {/* 1. Background Biru - Load dari bawah */}
      <motion.div 
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "circOut" }}
        className="absolute h-[95%] bottom-0 w-[95%] bg-main-blue rounded-t-full"
      >
        
        {/* --- 3 VECTOR KIRI --- */}
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.2)}
          className="absolute z-2 bottom-0 left-8"
        >
          <VectorBox className="h-[250px] w-[250px] rotate-12" />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.4)}
          className="absolute z-2 top-20 left-20"
        >
          <VectorBox className="h-[200px] w-[200px] opacity-90 -rotate-12 " />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.6)}
          className="absolute z-2 bottom-50 left-60"
        >
          <VectorBox className="h-[100px] w-[100px] opacity-80 rotate-45 " />
        </motion.div>


        {/* --- 1 VECTOR TENGAH --- */}
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.1)}
          className="absolute z-2 top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <VectorBox className="h-[400px] w-[400px] rotate-45" />
        </motion.div>


        {/* --- 3 VECTOR KANAN --- */}
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.3)}
          className="absolute z-2 bottom-0 right-5"
        >
          <VectorBox className="h-[250px] w-[250px] -rotate-12" />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.5)}
          className="absolute z-2 top-10 right-10"
        >
          <VectorBox className="h-[200px] w-[200px] rotate-12 opacity-90" />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.7)}
          className="absolute z-2 bottom-50 right-60"
        >
          <VectorBox className="h-[100px] w-[100px] -rotate-45 opacity-90" />
        </motion.div>

      </motion.div>

      {/* --- FORM LOGIN --- */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="z-10 bg-white scale-90 rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo />
        </div>

        <div className="w-full space-y-5">
          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-main-blue/50 text-black" />
          <input type="password" placeholder="Kata Sandi" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-main-blue/50 text-black" />
          <div className="flex justify-end">
            <Link href="#" className="text-sm hover:text-main-blue">Lupa Kata Sandi?</Link>
          </div>
        </div>

        <div className="w-full mt-8 border-b-2 border-gray-300 pb-8">
          <Button link="/" className="w-full  py-3 border-2 rounded-lg text-lg font-bold">Masuk</Button>
        </div>

        <div className="mt-6 flex flex-col   items-center w-full">
          <span className=" text-sm mb-4">Belum punya akun?</span>
          <div className="w-full mt-1 border-b border-gray-200 pb-1">
 <ButtonPutih className="w-full py-3 border-2 rounded-lg text-lg font-bold" link="/register">Daftar</ButtonPutih>
          </div>
         
        </div>
      </motion.div>
    </div>
  );
}