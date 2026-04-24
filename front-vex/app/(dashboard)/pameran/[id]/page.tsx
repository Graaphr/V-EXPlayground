"use client";
import React from "react";
import {
    FaPlay,
    FaInstagram,
    FaYoutube,
    FaFacebookSquare,
    FaRegCalendarAlt
} from "react-icons/fa";
import { Button } from "@/components/Componen";
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// Dummy Data
import { ALL_EXHIBITIONS } from '@/app/data/Pameran';

export default function PameranDetail() {
    // Ambil id dari Parameter 
    const Params = useParams();
    const id = Params.id;
    const exhibitionData = ALL_EXHIBITIONS.find(p => p.id === id) || ALL_EXHIBITIONS[0];

    const { title, subtitle, date, bannerImage, posterImage, description, stats, institution } = exhibitionData;

    return (

        <div className=" min-h-screen  bg-gray-50 font-sans text-gray-800">

            {/* MAIN CONTENT */}
            <main className="relative pb-16 bg-white">

                <div className="absolute hidden md:block relative w-full h-[60vh] overflow-hidden">
                    {/* Banner */}
                    <img
                        src={bannerImage}
                        alt="Banner"
                        className="w-full h-full  object-cover object-[50%_20%] opacity-80"
                    />
                    {/* Gradasi Putih */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                </div>

                {/* Main Content */}
                <div className="autoMid w-full relative z-10">

                    <div className="py-6 md:py-8">

                        {/* Poster & Title*/}
                        <div className="flex flex-col md:flex-row gap-8">

                            <div className="md:hidden">
                                <h1 className="text-2xl font-bold uppercase">{title}</h1>
                                <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                                <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                                    <FaRegCalendarAlt />
                                    <span>{date}</span>
                                </div>
                            </div>

                            {/* Poster Image */}
                            <div className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0">
                                <img
                                    src={posterImage}
                                    alt={title}
                                    className="w-full h-auto shadow-md object-cover aspect-[4/3] md:aspect-video"
                                />
                            </div>

                            {/* Title & Play Button */}
                            <div className="w-full flex flex-col justify-between">
                                <div className="hidden md:block mb-6">
                                    <h1 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-gray-900">{title}</h1>
                                    <p className="text-gray-500 font-medium mt-2">{subtitle}</p>
                                    <div className="flex items-center gap-2 text-gray-600 mt-3 font-medium">
                                        <FaRegCalendarAlt className="text-[#6001D3]" />
                                        <span>{date}</span>
                                    </div>
                                </div>

                                {/* Play Button */}
                                <div className="flex flex-col sm:flex-row gap-6 mt-4 md:mt-0">
                                    <Button link={"/exhibition"} className="flex-1 md:flex-none py-4 px-[100px] items-center text-md flex rounded-md shadow-md/30 hover:bg-green-500/20">
                                        <FaPlay />
                                    </Button>

                                    {/* Status Pameran BUKA / TUTUP */}
                                    <div className="flex-1 md:flex-none bg-green-500 hover:bg-green-500 text-white  font-bold py-3 px-[40px] text-md rounded-md transition shadow-md/30">
                                        BUKA
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mt-10 md:mt-12">
                            <h2 className="text-xl font-bold mb-4 pb-2">Deskripsi</h2>
                            <div className="space-y-6 text-sm md:text-base text-gray-600 leading-relaxed">
                                {description.map((section, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-gray-800 mb-1">{section.title}</h3>
                                        {section.content && <p>{section.content}</p>}
                                        {section.list && (
                                            <ul className="list-disc pl-5 space-y-1">
                                                {section.list.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-12 flex justify-end items-center gap-[50px] pt-6 text-[30px]">
                            <p className="font-bold text-main-blue">{institution}</p>
                            <div className="flex gap-4 text-2xl text-main-blue">
                                <a href="https://www.instagram.com/polibatamofficial/" className="hover:opacity-80 transition"><FaInstagram className="text-[30px]" /></a>
                                <a href="https://www.youtube.com/@PolibatamTV" className="hover:opacity-80 transition"><FaYoutube className="text-[30px]" /></a>
                                <a href="https://www.facebook.com/polibatamofficial/" className="hover:opacity-80 transition"><FaFacebookSquare className="text-[30px]" /></a>
                            </div>
                        </div>

                        {/* Histori Pameran */}
                        <div className="mt-8 py-4 border-y-1">

                            <div className="hidden md:flex justify-between items-center text-center divide-x divide-gray-400">
                                <div className="flex-1 px-4">
                                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-1">Total Suka</p>
                                    <p className="font-semibold text-gray-800">{stats.likes}</p>
                                </div>
                                <div className="flex-1 px-4">
                                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-1">Total Karya</p>
                                    <p className="font-semibold text-gray-800">{stats.karya}</p>
                                </div>
                                <div className="flex-1 px-4">
                                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-1">Tanggal Buka</p>
                                    <p className="font-semibold text-gray-800">{stats.startDate}</p>
                                </div>
                                <div className="flex-1 px-4">
                                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-1">Tanggal Tutup</p>
                                    <p className="font-semibold text-gray-800">{stats.endDate}</p>
                                </div>
                                <div className="flex-1 px-4">
                                    <p className="text-xs text-gray-400 font-light uppercase tracking-wider mb-1">Program Studi</p>
                                    <p className="font-semibold text-gray-800">{stats.studyLevel}</p>
                                </div>
                            </div>

                            {/* Mobile Histori Pameran */}
                            <div className="md:hidden space-y-3 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Total Suka</span>
                                    <span className="font-bold">{stats.likes}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Total Karya</span>
                                    <span className="font-bold">{stats.karya}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Tanggal Buka</span>
                                    <span className="font-bold">{stats.startDate}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Tanggal Tutup</span>
                                    <span className="font-bold">{stats.endDate}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-500">Program Studi</span>
                                    <span className="font-bold">{stats.studyLevel}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}