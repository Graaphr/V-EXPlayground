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
  const [openPoster, setOpenPoster] = useState(false);

  /**
   * RANDOM MODEL
   */
  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 3) + 1;
  }, []);

  /**
   * LOAD MODEL
   */
  const gltf = useGLTF(`/models/stand${randomNumber}.glb`);
  const scene = useMemo(() => gltf.scene.clone(), [gltf]);

  const posterMesh = useRef<THREE.Mesh | null>(null);
  const videoMesh = useRef<THREE.Mesh | null>(null);

  /**
   * SETUP OBJECT
   */
  useEffect(() => {
    scene.traverse((obj: any) => {
      if (!obj.isMesh) return;

      /**
       * collider dari blender
       */
      if (
        obj.name.toLowerCase().includes("collider")
      ) {
        obj.userData.collider = true;
        obj.visible = false;
      } else {
        obj.userData.collider = false;
      }
    });

    posterMesh.current =
      scene.getObjectByName(
        "PanelPoster"
      ) as THREE.Mesh;

    videoMesh.current =
      scene.getObjectByName(
        "PanelVideo"
      ) as THREE.Mesh;
  }, [scene]);

  /**
   * LOAD POSTER
   */
  useEffect(() => {
    if (!poster || !posterMesh.current)
      return;

    const loader =
      new THREE.TextureLoader();

    loader.load(poster, (texture) => {
      texture.flipY = false;

      const material =
        posterMesh.current!
          .material as THREE.MeshStandardMaterial;

      material.map = texture;
      material.needsUpdate = true;
    });
  }, [poster]);

  /**
   * VIDEO TEXTURE
   */
  useEffect(() => {
    if (!video || !videoMesh.current)
      return;

    const isVideo =
      video.endsWith(".mp4") ||
      video.endsWith(".webm");

    if (!isVideo) return;

    const htmlVideo =
      document.createElement("video");

    htmlVideo.src = video;
    htmlVideo.loop = true;
    htmlVideo.muted = true;
    htmlVideo.autoplay = true;
    htmlVideo.playsInline = true;

    htmlVideo.play().catch(() => {});

    const texture =
      new THREE.VideoTexture(
        htmlVideo
      );

    const material =
      videoMesh.current!
        .material as THREE.MeshStandardMaterial;

    material.map = texture;
    material.needsUpdate = true;

    return () => {
      htmlVideo.pause();
      htmlVideo.remove();
    };
  }, [video]);

  /**
   * CLICK OBJECT
   */
  const handleClick = (e: any) => {
    const clicked =
      e.object.name;

    if (
      clicked === "PanelVideo" &&
      video
    ) {
      setOpenVideo(true);
    }

    if (
      clicked === "PanelPoster" &&
      poster
    ) {
      setOpenPoster(true);
    }
  };

  return (
    <>
      <group
        position={position}
        quaternion={
          new THREE.Quaternion(
            ...quaternion
          )
        }
      >
        <primitive
          object={scene}
          position={[0, 0, -1.2]}
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
                onClick={() =>
                  setOpenVideo(false)
                }
              >
                ✕
              </button>

              <iframe
                src={video}
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </Html>
      )}

      {/* POPUP POSTER */}
      {openPoster && (
        <Html fullscreen>
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="max-w-[90vw] max-h-[90vh] relative">
              <button
                className="absolute -top-10 right-0 text-white text-2xl"
                onClick={() =>
                  setOpenPoster(false)
                }
              >
                ✕
              </button>

              <img
                src={poster}
                className="max-w-full max-h-[90vh] rounded-xl"
              />
            </div>
          </div>
        </Html>
      )}
    </>
  );
}