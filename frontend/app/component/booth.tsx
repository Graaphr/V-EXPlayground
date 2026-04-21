"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

type BoothProps = {
  position?: [number, number, number];
  quaternion?: [number, number, number, number];
  poster: string;
  video?: string;
};

export default function Booth({
  position = [0, 0, 0],
  quaternion = [0, 0, 0, 1],
  poster,
  video,
}: BoothProps) {
  const [openVideo, setOpenVideo] = useState(false);

  /**
   * RANDOM STAND 1-3
   */
  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 3) + 1;
  }, []);

  /**
   * LOAD MODEL STAND
   */
  const gltf = useGLTF(`/models/stand${randomNumber}.glb`);
  const scene = useMemo(() => gltf.scene.clone(), [gltf]);

  const posterMesh = useRef<THREE.Mesh | null>(null);
  const videoMesh = useRef<THREE.Mesh | null>(null);

  /**
   * AMBIL PANEL DALAM MODEL
   */
  useEffect(() => {
    posterMesh.current = scene.getObjectByName("PanelPoster") as THREE.Mesh;
    videoMesh.current = scene.getObjectByName("PanelVideo") as THREE.Mesh;
  }, [scene]);

  /**
   * LOAD POSTER IMAGE
   */
  useEffect(() => {
    if (!poster || !posterMesh.current) return;

    const loader = new THREE.TextureLoader();

    loader.load(poster, (texture) => {
      texture.flipY = false;

      const material =
        posterMesh.current!.material as THREE.MeshStandardMaterial;

      material.map = texture;
      material.needsUpdate = true;
    });
  }, [poster]);

  /**
   * LOAD VIDEO TEXTURE (MP4 / WEBM)
   */
  useEffect(() => {
    if (!video || !videoMesh.current) return;

    const isMp4 =
      video.endsWith(".mp4") ||
      video.endsWith(".webm");

    if (!isMp4) return;

    const htmlVideo = document.createElement("video");

    htmlVideo.src = video;
    htmlVideo.loop = true;
    htmlVideo.muted = true;
    htmlVideo.playsInline = true;
    htmlVideo.autoplay = true;

    htmlVideo.play().catch(() => {});

    const texture = new THREE.VideoTexture(htmlVideo);

    const material =
      videoMesh.current.material as THREE.MeshStandardMaterial;

    material.map = texture;
    material.needsUpdate = true;

    return () => {
      htmlVideo.pause();
      htmlVideo.remove();
    };
  }, [video]);

  /**
   * CLICK OPEN EMBED VIDEO
   */
  const handleClick = (e: any) => {
    if (!video) return;

    if (
      e.object.name === "PanelVideo" &&
      !video.endsWith(".mp4") &&
      !video.endsWith(".webm")
    ) {
      setOpenVideo(true);
    }
  };

  return (
    <>
      {/* MARKER POSITION + ROTATION DARI HALL */}
      <group
        position={position}
        quaternion={new THREE.Quaternion(...quaternion)}
      >
        <primitive
          object={scene}
          scale={1}
          onClick={handleClick}
        />
      </group>

      {/* POPUP VIDEO */}
      {openVideo && (
        <Html fullscreen>
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="w-[900px] h-[500px] bg-white rounded-xl overflow-hidden relative">
              <button
                className="absolute top-2 right-3 z-50 text-black text-xl"
                onClick={() => setOpenVideo(false)}
              >
                ✕
              </button>

              <iframe
                src={video}
                width="100%"
                height="100%"
                allowFullScreen
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
}