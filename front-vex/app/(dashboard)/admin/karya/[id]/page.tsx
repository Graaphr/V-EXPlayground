"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  FaPlay,
  FaInstagram,
  FaYoutube,
  FaFacebookSquare,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { useParams } from "next/navigation";

import { Button } from "../model/Button";

import karyaData from "@/public/data/Karya.json";
import pameranData from "@/public/data/Pameran.json";

interface Status {
  isLogin?: boolean;
}

export default function DetailKarya({
  isLogin = false,
}: Status) {
  const params = useParams();
  const id = params.id as string;

  /* =======================
     AMBIL DATA KARYA
  ======================= */
  const karya = useMemo(() => {
    return (
      karyaData.find(
        (item: any) =>
          item.id.toString() === id
      ) || karyaData[0]
    );
  }, [id]);

  /* =======================
     AMBIL DATA PAMERAN
  ======================= */
  const exhibition = useMemo(() => {
    return pameranData.find(
      (item: any) =>
        item.id === karya.pameranId
    );
  }, [karya]);

  const {
    title,
    category,
    image,
    description,
    booth,
    year,
  } = karya;

  const today = new Date();

  const openDate = convertDate(
    exhibition?.stats?.startDate ||
      "01/01/2000"
  );

  const closeDate = convertDate(
    exhibition?.stats?.endDate ||
      "01/01/2000"
  );

  const isBeforeOpen =
    today < openDate;

  const isAfterClose =
    today > closeDate;

  const isOpen =
    !isBeforeOpen &&
    !isAfterClose;

  return (
    <div className="min-h-screen bg-gray-50 font-poppins text-gray-800">
      <main className="relative pb-16 bg-white">

        {/* BANNER */}
        <div className="hidden md:block relative w-full h-[55vh] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="autoMid relative z-10 py-6 md:py-8">

          <div className="flex flex-col md:flex-row gap-8">

            {/* POSTER */}
            <div className="w-full md:w-[45%]">
              <img
                src={image}
                alt={title}
                className="w-full rounded-xl shadow-lg object-cover"
              />
            </div>

            {/* RIGHT */}
            <div className="flex-1 relative">

              {/* EDIT */}
              {isLogin && (
                <Link
                  href={`/admin/karya/edit/${id}`}
                  className="absolute top-0 right-0 bg-white border rounded-full p-2 shadow"
                >
                  <HiPencilAlt size={20} />
                </Link>
              )}

              {/* TITLE */}
              <h1 className="text-3xl md:text-4xl font-extrabold uppercase">
                {title}
              </h1>

              <p className="text-gray-500 mt-2">
                {category}
              </p>

              <div className="flex items-center gap-2 mt-3 text-gray-600">
                <FaRegCalendarAlt className="text-main-blue" />
                <span>{year}</span>
              </div>

              {/* BUTTON */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                {isOpen ? (
                  <Button
                    link={`/exhibition/${exhibition?.id}`}
                    className="w-full sm:w-auto px-10 py-4 rounded-md flex items-center justify-center"
                  >
                    <FaPlay />
                  </Button>
                ) : (
                  <div className="w-full sm:w-auto px-10 py-4 rounded-md bg-gray-300 text-gray-500 flex items-center justify-center">
                    <FaPlay />
                  </div>
                )}

                <div
                  className={`px-8 py-4 rounded-md text-white font-bold text-center ${
                    isOpen
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {isOpen
                    ? "PAMERAN BUKA"
                    : "PAMERAN TUTUP"}
                </div>
              </div>

              {/* INFO */}
              <div className="mt-8 space-y-2 text-sm">
                <p>
                  <span className="font-bold">
                    Booth:
                  </span>{" "}
                  {booth}
                </p>

                <p>
                  <span className="font-bold">
                    Pameran:
                  </span>{" "}
                  {exhibition?.title}
                </p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">
              Deskripsi
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* SOCIAL */}
          <div className="mt-12 flex justify-end items-center gap-8">
            <p className="font-bold text-main-blue">
              {exhibition?.institution}
            </p>

            <div className="flex gap-4 text-main-blue text-2xl">
              <FaInstagram />
              <FaYoutube />
              <FaFacebookSquare />
            </div>
          </div>

          {/* STATS */}
          <div className="mt-10 py-4 border-y">

            <div className="hidden md:flex justify-between divide-x">
              <Stat
                title="Jenis Booth"
                value={booth}
              />
              <Stat
                title="Kategori"
                value={category}
              />
              <Stat
                title="Tahun"
                value={year}
              />
              <Stat
                title="Tanggal Buka"
                value={
                  exhibition?.stats
                    ?.startDate
                }
              />
              <Stat
                title="Tanggal Tutup"
                value={
                  exhibition?.stats
                    ?.endDate
                }
              />
            </div>

            <div className="md:hidden space-y-3">
              <Row
                title="Jenis Booth"
                value={booth}
              />
              <Row
                title="Kategori"
                value={category}
              />
              <Row
                title="Tahun"
                value={year}
              />
              <Row
                title="Tanggal Buka"
                value={
                  exhibition?.stats
                    ?.startDate
                }
              />
              <Row
                title="Tanggal Tutup"
                value={
                  exhibition?.stats
                    ?.endDate
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =======================
   HELPER
======================= */
function convertDate(
  value: string
) {
  const split =
    value.split("/");

  return new Date(
    Number(split[2]),
    Number(split[1]) - 1,
    Number(split[0])
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="flex-1 px-4 text-center">
      <p className="text-xs text-gray-400 uppercase">
        {title}
      </p>

      <p className="font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">
        {title}
      </span>

      <span className="font-bold">
        {value}
      </span>
    </div>
  );
}