import React from 'react';
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { Card, LogoWhite, LinkAkses, LinkAksesEks, TextNav, Button } from "@/components/Componen";
import { VectorBox } from "@/components/model/BoxModel";
import "@/app/globals.css";

export default function Footer() {
    return (
        <footer className="w-full bg-main-blue text-white overflow-hidden">

            <div className="relative pt-[80px] max-h-[360px] flex flex-col  md:flex-row">
                {/* kiri */}
                <div className="w-full md:w-[45%] flex flex-col justify-between p-16 relative z-10">
                    <div className="">

                        <div className="flex items-start gap-4">
                            <LogoWhite />
                        </div>
                    </div>

                    <div className="mt-6 text-gray-300 z-20">
                        <p className="text-sm text-gray-300 font-bold tracking-wide">
                            All rights reserved. V-EX (Virtual Exhibition)
                        </p>
                    </div>

                    <div className="relative left-0 bottom-20">
                        <VectorBox className='w-[500px] relative h-[500px] ' />

                    </div>

                </div>

                {/* kanan */}
                <div className="w-full md:w-[55%] bg-white text-gray-800 rounded-tl-[120px] p-16 flex flex-col justify-between relative shadow-2xl">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
                        {/* solusi */}
                        <div>
                            <h3 className="font-extrabold text-main-blue mb-6 text-xl tracking-wider">Solusi</h3>
                            <ul className=" text-gray-500 font-semibold">
                                <li> <LinkAkses link={"/"} title={"Pameran"} /></li>
                                <li><LinkAkses link={"/"} title={"Stan Pameran"} /></li>
                                <li><LinkAkses link={"/"} title={"Karya"} /></li>
                                <li><LinkAkses link={"/"} title={"Akun"} /></li>
                            </ul>
                        </div>
                        {/* sumber */}

                        <div>
                            <h3 className="font-extrabold text-main-blue mb-6 text-xl tracking-wider">Sumber</h3>
                            <ul className=" text-gray-500 font-semibold">
                                <li> <LinkAkses link={"/"} title={"FAQs"} /></li>
                                <li><LinkAkses link={"/"} title={"Petunjuk"} /></li>
                                <li><LinkAkses link={"/"} title={"Pelayanan"} /></li>
                                <li><LinkAkses link={"/"} title={"Harga"} /></li>
                            </ul>
                        </div>
                        {/* hukum */}

                        <div>
                            <h3 className="font-extrabold text-main-blue mb-6 text-xl tracking-wider">Hukum</h3>
                            <ul className=" text-gray-500 font-semibold">
                                <li> <LinkAksesEks link={"/"} title={"Syarat & Ketentuan"} /></li>
                                <li><LinkAksesEks link={"/"} title={"Kebijakan Privasi"} /></li>
                                <li><LinkAksesEks link={"/"} title={"Hubungi Kami"} /></li>
                            </ul>
                        </div>
                    </div>
                    {/* sosial link */}
                    <div className="flex justify-end text-main-blue items-center gap-6">
                        <LinkAksesEks link={"/"} >
                            <FaLinkedin className="w-9 h-9 text-main-blue hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>
                        <LinkAksesEks link={"/"} >
                            <FaInstagram className="w-9 h-9 text-main-blue hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>
                        <LinkAksesEks link={"/"} >
                            <FaYoutube className="w-9 h-9 text-main-blue hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>
                        <LinkAksesEks link={"/"} >
                            <FaFacebook className="w-9 h-9 text-main-blue hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>



                    </div>
                </div>

            </div>
        </footer>
    );
};

