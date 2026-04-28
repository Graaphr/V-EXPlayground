"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaPlay,
  FaInstagram,
  FaYoutube,
  FaFacebookSquare,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";

import { Button } from "@/components/Componen";
import { useParams } from "next/navigation";

import { ALL_EXHIBITIONS } from "@/app/data/Pameran";

interface Status {
  isLogin?: boolean;
}

export default function DetailPameran({ isLogin = false }: Status) {
  const params = useParams();
  const id = params.id as string;

  const exhibitionData =
    ALL_EXHIBITIONS.find((p) => p.id === id) || ALL_EXHIBITIONS[0];

  const {
    title,
    subtitle,
    date,
    bannerImage,
    posterImage,
    description,
    stats,
    institution,
  } = exhibitionData;

  /* ===================== */
  /* STATUS EVENT */
  /* ===================== */

  const today = new Date();

  const openDate = convertDate(stats.startDate);
  const closeDate = convertDate(stats.endDate);

  const isBeforeOpen = today < openDate;
  const isAfterClose = today > closeDate;

  const isOpen = !isBeforeOpen && !isAfterClose;

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-gray-800 select-none">
      <main className="relative pb-16 bg-white">
        {/* Banner */}
        <div className="absolute hidden md:block relative w-full h-[60vh] overflow-hidden">
          <img
            src={bannerImage}
            alt="Banner"
            className="w-full h-full object-cover object-[50%_20%] opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        </div>

        {/* Main */}
        <div className="autoMid w-full relative z-10">
          <div className="py-6 md:py-8">
            {/* Poster + Title */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* MOBILE */}
              <div className="md:hidden">
                <h1 className="text-2xl font-bold uppercase">{title}</h1>

                <p className="text-gray-500 text-sm mt-1">{subtitle}</p>

                <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                  <FaRegCalendarAlt />
                  <span>{date}</span>
                </div>
              </div>

              {/* POSTER */}
              <div className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0">
                <img
                  src={posterImage}
                  alt={title}
                  className="w-full h-auto shadow-md object-cover aspect-[4/3] md:aspect-video"
                />
              </div>

              {/* DESKTOP */}
              <div className="w-full flex flex-col justify-between relative">
                {/* EDIT ICON */}
                {isLogin && (
                  <Link
                    href={`/admin/pameran/edit/${id}`}
                    className="cursor-pointer self-end absolute"
                  >
                    <HiPencilAlt size={30} />
                  </Link>
                  // <HiPencilAlt size={30} className="cursor-pointer self-end absolute" />
                )}

                <div className="hidden md:block mb-6">
                  <h1 className="text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-gray-900">
                    {title}
                  </h1>

                  <p className="text-gray-500 font-medium mt-2">{subtitle}</p>

                  <div className="flex items-center gap-2 text-gray-600 mt-3 font-medium">
                    <FaRegCalendarAlt className="text-[#6001D3]" />
                    <span>{date}</span>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-4 md:mt-0 w-full">
                  {isOpen ? (
                    <Button
                      link={`/exhibition/${id}`}
                      className="w-full sm:w-automin-w-[140px] py-4 px-6 sm:px-10 lg:px-[100px] flex items-center justify-center text-md rounded-md shadow-md/30 hover:bg-green-500/20"
                    >
                      <FaPlay />
                    </Button>
                  ) : (
                    <div className="w-full sm:w-auto min-w-[140px] py-4 px-6 sm:px-10 lg:px-[100px] flex items-center justify-center rounded-md bg-gray-300 text-gray-500 cursor-not-allowed">
                      <FaPlay />
                    </div>
                  )}

                  <div
                    className={`w-full sm:w-auto min-w-[140px] py-3 px-6 text-center text-white font-bold text-md rounded-md shadow-md/30 flex items-center justify-center ${
                      isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {isOpen ? "BUKA" : "TUTUP"}
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-10 md:mt-12">
              <h2 className="text-xl font-bold mb-4 pb-2">Deskripsi</h2>

              <div className="space-y-6 text-sm md:text-base text-gray-600 leading-relaxed">
                {description.map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {section.title}
                    </h3>

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

            {/* SOCIAL */}
            <div className="mt-12 flex justify-end items-center gap-[50px] pt-6 text-[30px]">
              <p className="font-bold text-main-blue">{institution}</p>

              <div className="flex gap-4 text-2xl text-main-blue">
                <FaInstagram className="text-[30px]" />
                <FaYoutube className="text-[30px]" />
                <FaFacebookSquare className="text-[30px]" />
              </div>
            </div>

            {/* STATISTIK */}
            <div className="mt-8 py-4 border-y">
              <div className="hidden md:flex justify-between items-center text-center divide-x divide-gray-400">
                <Stat title="Total Suka" value={stats.likes} />
                <Stat title="Total Karya" value={stats.karya} />
                <Stat title="Tanggal Buka" value={stats.startDate} />
                <Stat title="Tanggal Tutup" value={stats.endDate} />
                <Stat title="Program Studi" value={stats.studyLevel} />
              </div>

              <div className="md:hidden space-y-3 text-sm">
                <Row title="Total Suka" value={stats.likes} />
                <Row title="Total Karya" value={stats.karya} />
                <Row title="Tanggal Buka" value={stats.startDate} />
                <Row title="Tanggal Tutup" value={stats.endDate} />
                <Row title="Program Studi" value={stats.studyLevel} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ===================== */
/* HELPER */
/* ===================== */

function convertDate(value: string) {
  const split = value.split("/");

  return new Date(
    Number(split[2]),
    Number(split[1]) - 1,
    Number(split[0]),
    0,
    0,
    0,
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="flex-1 px-4">
      <p className="text-xs text-gray-400 uppercase mb-1">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Row({ title, value }: { title: string; value: any }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{title}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
