"use client";

import {
  useEffect,
  useState,
} from "react";

import { Canvas } from "@react-three/fiber";
import Experience from "@/app/component/experience";
import Crosshair from "@/app/component/crosshair";

type PosterData = {
  src: string;
  booth: string;
};

type InfoData = {
  judul: string;
  tim: string;
  deskripsi: string;
};

export default function Page() {
  const [posterOpen, setPosterOpen] =
    useState(false);

  const [posterData, setPosterData] =
    useState<PosterData>({
      src: "",
      booth: "",
    });

  const openPoster = (
    src: string,
    booth: string
  ) => {
    setPosterData({
      src,
      booth,
    });

    setPosterOpen(true);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Canvas
        shadows
        camera={{
          position: [0, 2, 5],
          fov: 75,
        }}
      >
        <Experience
          openPoster={
            openPoster
          }
          controlsLocked={
            !posterOpen
          }
        />
      </Canvas>

      {!posterOpen && (
        <Crosshair />
      )}

      {posterOpen && (
        <PosterViewer
          src={
            posterData.src
          }
          booth={
            posterData.booth
          }
          onClose={() =>
            setPosterOpen(
              false
            )
          }
        />
      )}
    </div>
  );
}

/* ========================= */
/* POSTER VIEWER */
/* ========================= */

function PosterViewer({
  src,
  booth,
  onClose,
}: {
  src: string;
  booth: string;
  onClose: () => void;
}) {
  const [zoom, setZoom] =
    useState(1);

  const [info, setInfo] =
    useState<InfoData>({
      judul: "Loading...",
      tim: "-",
      deskripsi:
        "Loading...",
    });

  /**
   * LOAD TXT
   */
  useEffect(() => {
    const loadText =
      async () => {
        try {
          const res =
            await fetch(
              `/uploads/${booth}-teks.txt?time=${Date.now()}`
            );

          if (!res.ok)
            throw new Error();

          const txt =
            await res.text();

          const judul =
            txt.match(
              /Judul:\s*(.*)/i
            )?.[1] ||
            "-";

          const tim =
            txt.match(
              /Tim:\s*(.*)/i
            )?.[1] ||
            "-";

          const deskripsi =
            txt.match(
              /Deskripsi:\s*([\s\S]*)/i
            )?.[1] ||
            "-";

          setInfo({
            judul:
              judul.trim(),
            tim: tim.trim(),
            deskripsi:
              deskripsi.trim(),
          });
        } catch {
          setInfo({
            judul:
              "Data Tidak Ditemukan",
            tim: "-",
            deskripsi:
              `File /uploads/${booth}-teks.txt belum tersedia.`,
          });
        }
      };

    loadText();
  }, [booth]);

  /**
   * ESC CLOSE
   */
  useEffect(() => {
    const keyDown = (
      e: KeyboardEvent
    ) => {
      if (
        e.key ===
        "Escape"
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      keyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyDown
      );
  }, [onClose]);

  /**
   * ZOOM HANYA GAMBAR
   */
  const handlePosterWheel = (
    e: React.WheelEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setZoom((prev) => {
      const next =
        prev -
        e.deltaY *
          0.0015;

      return Math.min(
        Math.max(
          next,
          0.5
        ),
        5
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/95 flex">
      {/* LEFT IMAGE */}
      <div
        onWheel={
          handlePosterWheel
        }
        className="w-[65%] h-full overflow-auto flex items-center justify-center p-10 border-r border-white/10"
      >
        <img
          src={src}
          draggable={
            false
          }
          style={{
            transform: `scale(${zoom})`,
            transition:
              "transform 0.1s linear",
          }}
          className="max-w-full max-h-full select-none"
        />
      </div>

      {/* RIGHT INFO */}
      <div className="w-[35%] h-full flex flex-col text-white">
        {/* HEADER */}
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <div className="font-bold text-lg">
            Detail Booth
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setZoom(
                  1
                )
              }
              className="px-4 h-10 rounded-lg bg-white/10"
            >
              Reset
            </button>

            <button
              onClick={
                onClose
              }
              className="px-4 h-10 rounded-lg bg-red-500"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <p className="text-white/50 text-sm mb-1">
              Judul
            </p>

            <h1 className="text-2xl font-bold leading-tight">
              {
                info.judul
              }
            </h1>
          </div>

          <div>
            <p className="text-white/50 text-sm mb-1">
              Tim
            </p>

            <p className="text-lg">
              {info.tim}
            </p>
          </div>

          <div>
            <p className="text-white/50 text-sm mb-2">
              Deskripsi
            </p>

            <p className="text-white/80 leading-relaxed whitespace-pre-line">
              {
                info.deskripsi
              }
            </p>
          </div>

          <div className="text-sm text-white/40 pt-6">
            Scroll di poster =
            zoom
          </div>
        </div>
      </div>
    </div>
  );
}