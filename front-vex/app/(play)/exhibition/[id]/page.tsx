"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

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
  const router =
    useRouter();

  const params =
    useParams();

  const id =
    params.id as string;

  /**
   * poster
   */
  const [
    posterOpen,
    setPosterOpen,
  ] = useState(false);

  /**
   * esc menu
   */
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  /**
   * sound
   */
  const [
    soundOn,
    setSoundOn,
  ] = useState(true);

  const [
    posterData,
    setPosterData,
  ] = useState<PosterData>({
    src: "",
    booth: "",
  });

  /**
   * ESC buka menu
   */
  useEffect(() => {
    const down = (
      e: KeyboardEvent
    ) => {
      if (
        e.key ===
          "Escape" &&
        !posterOpen
      ) {
        setMenuOpen(true);

        document.exitPointerLock?.();
      }
    };

    window.addEventListener(
      "keydown",
      down
    );

    return () =>
      window.removeEventListener(
        "keydown",
        down
      );
  }, [posterOpen]);

  /**
   * buka poster
   */
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

  /**
   * lock game
   */
  const controlsLocked =
    !posterOpen &&
    !menuOpen;

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black">
      {/* GAME */}
      <Canvas
        shadows
        camera={{
          position: [
            0, 2, 5,
          ],
          fov: 75,
        }}
      >
        <Experience
          exhibitionId={
            id
          }
          openPoster={
            openPoster
          }
          controlsLocked={
            controlsLocked
          }
          soundOn={
            soundOn
          }
        />
      </Canvas>

      {/* CROSSHAIR */}
      {controlsLocked && (
        <Crosshair />
      )}

      {/* MENU ESC */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99998] bg-black/75 flex items-center justify-center">
          <div className="w-[380px] rounded-2xl bg-zinc-900 border border-white/10 p-6 text-white space-y-4">
            <h1 className="text-2xl font-bold">
              Menu
            </h1>

            <button
              onClick={() =>
                setSoundOn(
                  !soundOn
                )
              }
              className="w-full h-12 rounded-xl bg-white/10"
            >
              Sound :{" "}
              {soundOn
                ? "ON"
                : "OFF"}
            </button>

            <button
              onClick={() =>
                setMenuOpen(
                  false
                )
              }
              className="w-full h-12 rounded-xl bg-green-500 font-bold"
            >
              Lanjut
            </button>

            <button
              onClick={() =>
                router.push(
                  `/pameran/${id}`
                )
              }
              className="w-full h-12 rounded-xl bg-red-500 font-bold"
            >
              Keluar
            </button>
          </div>
        </div>
      )}

      {/* POSTER */}
      {posterOpen && (
        <PosterViewer
          id={id}
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
  id,
  src,
  booth,
  onClose,
}: {
  id: string;
  src: string;
  booth: string;
  onClose: () => void;
}) {
  const [zoom, setZoom] =
    useState(1);

  const [info, setInfo] =
    useState<InfoData>({
      judul:
        "Loading...",
      tim: "-",
      deskripsi:
        "Loading...",
    });

  /**
   * load text
   */
  useEffect(() => {
    const load =
      async () => {
        try {
          const res =
            await fetch(
              `/uploads/${id}/${booth}-teks.txt?time=${Date.now()}`
            );

          const txt =
            await res.text();

          setInfo({
            judul:
              txt.match(
                /Judul:\s*(.*)/i
              )?.[1] ||
              "-",

            tim:
              txt.match(
                /Tim:\s*(.*)/i
              )?.[1] ||
              "-",

            deskripsi:
              txt.match(
                /Deskripsi:\s*([\s\S]*)/i
              )?.[1] ||
              "-",
          });
        } catch {
          setInfo({
            judul:
              "Data Tidak Ditemukan",
            tim: "-",
            deskripsi:
              "File teks belum tersedia.",
          });
        }
      };

    load();
  }, [id, booth]);

  /**
   * esc close
   */
  useEffect(() => {
    const down = (
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
      down
    );

    return () =>
      window.removeEventListener(
        "keydown",
        down
      );
  }, [onClose]);

  /**
   * zoom
   */
  const wheel = (
    e: React.WheelEvent
  ) => {
    e.preventDefault();

    setZoom((p) =>
      Math.min(
        Math.max(
          p -
            e.deltaY *
              0.0015,
          0.5
        ),
        5
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[99997] bg-black/95 flex">
      {/* LEFT */}
      <div
        onWheel={wheel}
        className="w-[65%] h-full flex items-center justify-center p-10 border-r border-white/10 overflow-auto"
      >
        <img
          src={src}
          draggable={
            false
          }
          style={{
            transform: `scale(${zoom})`,
          }}
          className="max-w-full max-h-full select-none"
        />
      </div>

      {/* RIGHT */}
      <div className="w-[35%] h-full text-white flex flex-col">
        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <h1 className="font-bold text-lg">
            Detail Booth
          </h1>

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

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <p className="text-white/50 text-sm">
              Judul
            </p>

            <h1 className="text-2xl font-bold">
              {
                info.judul
              }
            </h1>
          </div>

          <div>
            <p className="text-white/50 text-sm">
              Tim
            </p>

            <p>
              {info.tim}
            </p>
          </div>

          <div>
            <p className="text-white/50 text-sm mb-2">
              Deskripsi
            </p>

            <p className="whitespace-pre-line text-white/80 leading-relaxed">
              {
                info.deskripsi
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}