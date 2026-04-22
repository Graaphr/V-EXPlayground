"use client";

export default function Crosshair() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-50">
      <div className="relative w-6 h-6">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-black rounded-full" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[2px] bg-black rounded-full" />
      </div>
    </div>
  );
}