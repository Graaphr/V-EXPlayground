import React from "react";
import {
    FaLinkedin,
    FaInstagram,
    FaYoutube,
    FaFacebook,
} from "react-icons/fa";

import {
    LogoWhite,
    LinkAkses,
    LinkAksesEks,
} from "@/components/Componen";

import { VectorBox } from "@/components/model/BoxModel";
import "@/app/globals.css";

export default function Footer() {
    return (
        <footer className="w-full bg-main-blue text-white overflow-hidden">

            <div className="relative flex flex-col lg:flex-row">

                {/* kiri */}
                <div className="w-full lg:w-[45%] px-6 sm:px-8 lg:px-10 pt-10 pb-8 flex flex-col justify-between relative z-10 overflow-hidden">

                    {/* logo */}
                    <div className="relative z-20">
                        <LogoWhite />
                    </div>

                    {/* copyright */}
                    <div className="mt-8 lg:mt-auto relative z-20">
                        <p className="text-xs sm:text-sm text-black font-normal tracking-wide">
                            All rights reserved. V-EX (Virtual Exhibition)
                        </p>
                    </div>

                    {/* vector */}
                    <div className="absolute bottom-[-140px] left-[-120px] opacity-20 lg:opacity-100 pointer-events-none z-0">

                        <VectorBox className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]" />

                    </div>

                </div>

                {/* kanan */}
                <div className="w-full lg:w-[55%] bg-white text-gray-800 rounded-t-[40px] lg:rounded-t-none lg:rounded-tl-[60px] px-6 sm:px-8 lg:px-16 py-10 flex flex-col gap-10 relative shadow-2xl mt-6 lg:mt-10">

                    {/* links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* solusi */}
                        <div>
                            <h3 className="font-extrabold text-main-blue mb-5 text-lg sm:text-xl tracking-wider">
                                Solusi
                            </h3>

                            <ul className="text-gray-500 font-normal space-y-2">
                                <li><LinkAkses link={"/"} title={"Pameran"} /></li>
                                <li><LinkAkses link={"/"} title={"Stan Pameran"} /></li>
                                <li><LinkAkses link={"/"} title={"Karya"} /></li>
                                <li><LinkAkses link={"/"} title={"Akun"} /></li>
                            </ul>
                        </div>

                        {/* sumber */}
                        <div>
                            <h3 className="font-extrabold text-main-blue mb-5 text-lg sm:text-xl tracking-wider">
                                Sumber
                            </h3>

                            <ul className="text-gray-500 font-normal space-y-2">
                                <li><LinkAkses link={"/"} title={"FAQs"} /></li>
                                <li><LinkAkses link={"/"} title={"Petunjuk"} /></li>
                                <li><LinkAkses link={"/"} title={"Pelayanan"} /></li>
                                <li><LinkAkses link={"/"} title={"Harga"} /></li>
                            </ul>
                        </div>

                        {/* hukum */}
                        <div>
                            <h3 className="font-extrabold text-main-blue mb-5 text-lg sm:text-xl tracking-wider">
                                Hukum
                            </h3>

                            <ul className="text-gray-500 font-normal space-y-2">
                                <li><LinkAksesEks link={"/"} title={"Syarat & Ketentuan"} /></li>
                                <li><LinkAksesEks link={"/"} title={"Kebijakan Privasi"} /></li>
                                <li><LinkAksesEks link={"/"} title={"Hubungi Kami"} /></li>
                            </ul>
                        </div>

                    </div>

                    {/* social */}
                    <div className="flex justify-start lg:justify-end items-center gap-5 text-main-blue">

                        <LinkAksesEks link={"/"}>
                            <FaLinkedin className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>

                        <LinkAksesEks link={"https://www.instagram.com/virtualexhibition204/"}>
                            <FaInstagram className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>

                        <LinkAksesEks link={"/"}>
                            <FaYoutube className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>

                        <LinkAksesEks link={"/"}>
                            <FaFacebook className="w-7 h-7 sm:w-8 sm:h-8 hover:scale-125 transition-all cursor-pointer" />
                        </LinkAksesEks>

                    </div>

                </div>

            </div>

        </footer>
    );
}