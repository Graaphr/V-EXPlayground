"use client";

import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type BoothProps = {
  position?: [number, number, number];

  quaternion?: [
    number,
    number,
    number,
    number
  ];

  boothName: string;

  poster: string;

  video?: string;

  openPoster: (
    src: string,
    booth: string
  ) => void;
};

export default function Booth({
  position = [0, 0, 0],

  quaternion = [0, 0, 0, 1],

  boothName,

  poster,

  video,

  openPoster,
}: BoothProps) {
  const randomNumber = useMemo(() => {
    return (
      Math.floor(
        Math.random() * 3
      ) + 1
    );
  }, []);

  /**
   * LOAD MODEL
   */
  const gltf = useGLTF(
    `/models/stand${randomNumber}.glb`
  );

  const scene = useMemo(
    () => gltf.scene.clone(),
    [gltf]
  );

  const posterMesh =
    useRef<THREE.Mesh | null>(
      null
    );

  const videoMesh =
    useRef<THREE.Mesh | null>(
      null
    );

  const videoElement =
    useRef<HTMLVideoElement | null>(
      null
    );

  /**
   * SETUP OBJECT
   */
  useEffect(() => {
    scene.traverse((obj: any) => {
      if (!obj.isMesh) return;

      const name =
        obj.name?.toLowerCase() ||
        "";

      if (
        name.includes(
          "collider"
        )
      ) {
        obj.userData.collider =
          true;

        obj.visible = false;
      } else {
        obj.userData.collider =
          false;
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
   * POSTER TEXTURE
   */
  useEffect(() => {
    if (
      !poster ||
      !posterMesh.current
    )
      return;

    const loader =
      new THREE.TextureLoader();

    loader.load(
      poster,
      (texture) => {
        texture.flipY = false;

        texture.colorSpace =
          THREE.SRGBColorSpace;

        posterMesh.current!.material =
          new THREE.MeshBasicMaterial(
            {
              map: texture,
              toneMapped: false,
            }
          );
      }
    );
  }, [poster]);

  /**
   * VIDEO TEXTURE
   */
  useEffect(() => {
    if (
      !video ||
      !videoMesh.current
    )
      return;

    const isVideo =
      video.endsWith(
        ".mp4"
      ) ||
      video.endsWith(
        ".webm"
      );

    if (!isVideo) return;

    const htmlVideo =
      document.createElement(
        "video"
      );

    htmlVideo.src = video;
    htmlVideo.loop = true;
    htmlVideo.muted = false;
    htmlVideo.playsInline = true;
    htmlVideo.preload =
      "metadata";

    videoElement.current =
      htmlVideo;

    const texture =
      new THREE.VideoTexture(
        htmlVideo
      );

    texture.colorSpace =
      THREE.SRGBColorSpace;

    videoMesh.current!.material =
      new THREE.MeshBasicMaterial(
        {
          map: texture,
          toneMapped: false,
        }
      );

    return () => {
      htmlVideo.pause();
      htmlVideo.remove();
    };
  }, [video]);

  /**
   * INTERACT
   */
  const handleClick = (
    e: any
  ) => {
    const clicked =
      e.object.name;

    /**
     * VIDEO PANEL
     */
    if (
      clicked ===
      "PanelVideo" &&
      video
    ) {
      const vid =
        videoElement.current;

      if (!vid) return;

      if (vid.paused) {
        vid.play().catch(
          () => { }
        );
      } else {
        vid.pause();
      }
    }

    /**
     * POSTER PANEL
     */
    if (
      clicked ===
      "PanelPoster" &&
      poster
    ) {
      openPoster(
        poster,
        boothName
      );
    }
  };

  return (
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
        position={[
          0, 0, -1.2,
        ]}
        scale={1}
        onClick={
          handleClick
        }
      />
    </group>
  );
}