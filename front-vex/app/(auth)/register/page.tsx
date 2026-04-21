"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo, Button, ButtonPutih } from "@/components/Componen";
import { VectorBox, VectorBlueBox } from "@/components/model/BoxModel";

export default function RegisterPage() {
    const slideUp = {
        initial: { y: "100vh", opacity: 0 },
        animate: { y: [0, -15, 0], opacity: 1 },
    };

    const floatingTransition = (d: number) => ({
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: d + 1.2 },
        opacity: { duration: 1.2, delay: d },
        default: { ease: "easeOut" }
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-main-blue overflow-hidden min-h-screen flex items-center justify-center p-4 relative text-white"
        >

            <motion.div
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                transition={{ duration: 2, ease: "circOut" }}
                className="absolute h-[95%] top-0 w-[95%] bg-secondary-color rounded-b-full shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
            >


                <motion.div
                    variants={slideUp} initial="initial" animate="animate"
                    transition={floatingTransition(0.2)}
                    className="absolute z-2 top-10 left-10"
                >
                    <VectorBlueBox className="h-[300px] w-[300px] rotate-45 " />
                </motion.div>

                <motion.div
                    variants={slideUp} initial="initial" animate="animate"
                    transition={floatingTransition(0.3)}
                    className="absolute z-2 top-10 right-10"
                >
                    <VectorBlueBox className="h-[300px] w-[300px] -rotate-12 " />
                </motion.div>

                <motion.div
                    variants={slideUp} initial="initial" animate="animate"
                    transition={floatingTransition(0.1)}
                    className="absolute z-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <VectorBlueBox className="h-[250px] w-[250px] rotate-90 " />
                </motion.div>

                <motion.div
                    variants={slideUp} initial="initial" animate="animate"
                    transition={floatingTransition(0.5)}
                    className="absolute z-2 bottom-20 left-1/4"
                >
                    <VectorBlueBox className="h-[100px] w-[100px] rotate-12 " />
                </motion.div>

                <motion.div
                    variants={slideUp} initial="initial" animate="animate"
                    transition={floatingTransition(0.6)}
                    className="absolute z-2 bottom-20 right-1/4"
                >
                    <VectorBlueBox className="h-[100px] w-[100px] -rotate-45 " />
                </motion.div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="z-10 bg-white border-2 border-white/20 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center scale-90"
            >
                <div className="flex flex-col items-center mb-8">
                    <Logo />
                </div>

                <div className="w-full space-y-4">
                    <input type="text" placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-main-blue/50 text-black" />
                    <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-main-blue/50 text-black" />
                    <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-main-blue/50 text-black" />
                </div>

                <div className="w-full mt-8 border-b-2 border-gray-400 pb-8">
                    <ButtonPutih link="/" className="w-full py-3 border-2 rounded-lg text-lg font-bold">
                        Daftar
                    </ButtonPutih>
                </div>

                <div className="mt-6 flex flex-col items-center w-full">
                    <span className="text-black text-sm mb-4">Sudah punya akun?</span>
                    <div className="w-full border-gray-300 ">
                        <Button link="/login" className="w-full  py-3 border-2 rounded-lg text-lg font-bold">Masuk</Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}