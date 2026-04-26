"use client";

import {
  useEffect,
  useRef,
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

  const [
    isMobile,
    setIsMobile,
  ] = useState(false);

  const [
    isPortrait,
    setIsPortrait,
  ] = useState(false);

  const [
    posterOpen,
    setPosterOpen,
  ] = useState(false);

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

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

  /* MOVE */
  const [
    mobileMove,
    setMobileMove,
  ] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  /* LOOK */
  const lookDelta =
    useRef({
      x: 0,
      y: 0,
    });

  /* ====================== */
  /* DETECT MOBILE */
  /* ====================== */

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth <
        1024
      );

      setIsPortrait(
        window.matchMedia(
          "(orientation: portrait)"
        ).matches
      );
    };

    check();

    window.addEventListener(
      "resize",
      check
    );

    window.addEventListener(
      "orientationchange",
      check
    );

    return () => {
      window.removeEventListener(
        "resize",
        check
      );

      window.removeEventListener(
        "orientationchange",
        check
      );
    };
  }, []);

  /* ====================== */
  /* ESC MENU */
  /* ====================== */

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

  const controlsLocked =
    !posterOpen &&
    !menuOpen;

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative touch-none">

      {/* PORTRAIT WARNING */}
      {isMobile &&
        isPortrait && (
          <div className="fixed inset-0 z-[999999] bg-black text-white flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl font-bold mb-4">
              Putar HP Anda
            </h1>

            <p className="text-white/70 text-lg">
              Gunakan mode
              landscape untuk
              masuk pameran 3D
            </p>
          </div>
        )}

      {/* GAME */}
      {(!isMobile ||
        !isPortrait) && (
          <>
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
                mobile={
                  isMobile
                }
                mobileMove={
                  mobileMove
                }
                lookDelta={
                  lookDelta
                }
              />
            </Canvas>

            {!isMobile &&
              controlsLocked && (
                <Crosshair />
              )}

            {isMobile &&
              controlsLocked && (
                <MobileHUD
                  setMobileMove={
                    setMobileMove
                  }
                  lookDelta={
                    lookDelta
                  }
                />
              )}
          </>
        )}

      {/* MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99998] bg-black/75 flex items-center justify-center">
          <div className="w-[380px] max-w-[90%] rounded-2xl bg-zinc-900 p-6 text-white space-y-4">

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
              Sound :
              {soundOn
                ? " ON"
                : " OFF"}
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

/* ======================= */
/* MOBILE HUD */
/* ======================= */

function MobileHUD({
  setMobileMove,
  lookDelta,
}: any) {
  const moveBase = useRef<any>(null);
  const moveStick = useRef<any>(null);

  const lookBase = useRef<any>(null);
  const lookStick = useRef<any>(null);

  const moveTouchId =
    useRef<number | null>(null);

  const lookTouchId =
    useRef<number | null>(null);

  const clamp = (
    n: number,
    min: number,
    max: number
  ) =>
    Math.max(
      min,
      Math.min(max, n)
    );

  const updateMove = (
    touch: Touch
  ) => {
    const rect =
      moveBase.current.getBoundingClientRect();

    const x =
      touch.clientX -
      rect.left -
      rect.width / 2;

    const y =
      touch.clientY -
      rect.top -
      rect.height / 2;

    const dx = clamp(x, -35, 35);
    const dy = clamp(y, -35, 35);

    moveStick.current.style.transform =
      `translate(${dx}px,${dy}px)`;

    setMobileMove({
      w: dy < -10,
      s: dy > 10,
      a: dx < -10,
      d: dx > 10,
    });
  };

  const updateLook = (
    touch: Touch
  ) => {
    const rect =
      lookBase.current.getBoundingClientRect();

    const x =
      touch.clientX -
      rect.left -
      rect.width / 2;

    const y =
      touch.clientY -
      rect.top -
      rect.height / 2;

    const dx = clamp(x, -35, 35);
    const dy = clamp(y, -35, 35);

    lookStick.current.style.transform =
      `translate(${dx}px,${dy}px)`;

    lookDelta.current = {
      x: dx * 0.0015,
      y: dy * 0.0015,
    };
  };

  /* MOVE START */
  const moveStart = (e: any) => {
    const touch =
      e.changedTouches[0];

    moveTouchId.current =
      touch.identifier;

    updateMove(touch);
  };

  const moveMove = (e: any) => {
    for (const touch of e.touches) {
      if (
        touch.identifier ===
        moveTouchId.current
      ) {
        updateMove(touch);
      }
    }
  };

  const moveEnd = (e: any) => {
    for (const touch of e.changedTouches) {
      if (
        touch.identifier ===
        moveTouchId.current
      ) {
        moveTouchId.current =
          null;

        moveStick.current.style.transform =
          `translate(0px,0px)`;

        setMobileMove({
          w: false,
          a: false,
          s: false,
          d: false,
        });
      }
    }
  };

  /* LOOK START */
  const lookStart = (e: any) => {
    const touch =
      e.changedTouches[0];

    lookTouchId.current =
      touch.identifier;

    updateLook(touch);
  };

  const lookMove = (e: any) => {
    for (const touch of e.touches) {
      if (
        touch.identifier ===
        lookTouchId.current
      ) {
        updateLook(touch);
      }
    }
  };

  const lookEnd = (e: any) => {
    for (const touch of e.changedTouches) {
      if (
        touch.identifier ===
        lookTouchId.current
      ) {
        lookTouchId.current =
          null;

        lookStick.current.style.transform =
          `translate(0px,0px)`;

        lookDelta.current = {
          x: 0,
          y: 0,
        };
      }
    }
  };

  return (
    <>
      {/* LEFT */}
      <div
        ref={moveBase}
        onTouchStart={moveStart}
        onTouchMove={moveMove}
        onTouchEnd={moveEnd}
        className="fixed bottom-5 left-5 z-[99999] w-28 h-28 rounded-full bg-white/10 border border-white/20"
      >
        <div
          ref={moveStick}
          className="absolute left-1/2 top-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-white/60"
        />
      </div>

      {/* RIGHT */}
      <div
        ref={lookBase}
        onTouchStart={lookStart}
        onTouchMove={lookMove}
        onTouchEnd={lookEnd}
        className="fixed bottom-5 right-5 z-[99999] w-28 h-28 rounded-full bg-white/10 border border-white/20"
      >
        <div
          ref={lookStick}
          className="absolute left-1/2 top-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-white/60"
        />
      </div>
    </>
  );
}

/* ======================= */
/* POSTER */
/* ======================= */

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

  useEffect(() => {
    const load =
      async () => {
        try {
          const res =
            await fetch(
              `/uploads/${id}/${booth}-teks.txt`
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
    <div className="fixed inset-0 z-[99997] bg-black/95 flex flex-col lg:flex-row">

      <div
        onWheel={wheel}
        className="w-full lg:w-[65%] h-[45%] lg:h-full flex items-center justify-center p-4 border-b lg:border-r border-white/10"
      >
        <img
          src={src}
          draggable={
            false
          }
          style={{
            transform: `scale(${zoom})`,
          }}
          className="max-w-full max-h-full"
        />
      </div>

      <div className="w-full lg:w-[35%] h-[55%] lg:h-full text-white flex flex-col">

        <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between">
          <h1 className="font-bold">
            Detail Booth
          </h1>

          <button
            onClick={
              onClose
            }
            className="px-4 h-10 rounded-lg bg-red-500"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          <div>
            <p className="text-white/50 text-sm">
              Judul
            </p>

            <h1 className="text-xl font-bold">
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

            <p className="text-white/80 whitespace-pre-line text-sm">
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