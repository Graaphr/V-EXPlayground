"use client";

import { useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import Booth from "./booth";
import Player from "./player";
import CameraSwitcher from "./cameraSwitcher";

export default function Experience() {
  const [mode, setMode] =
    useState<"first" | "third">("first");

  /**
   * LOAD HALL
   */
  const { scene } = useGLTF(
    "/models/hall1.glb"
  );

  /**
   * AMBIL MARKER BOOTH
   * BoothA1 BoothA2 dst
   */
  const boothPoints = useMemo(() => {
    const result: any[] = [];

    scene.updateMatrixWorld(true);

    scene.traverse((obj: any) => {
      const name =
        obj.name?.toLowerCase() || "";

      /**
       * MARKER BOOTH
       */
      if (name.startsWith("booth")) {
        const worldPos =
          new THREE.Vector3();

        const worldQuat =
          new THREE.Quaternion();

        obj.getWorldPosition(worldPos);
        obj.getWorldQuaternion(worldQuat);

        result.push({
          name: obj.name,
          position: [
            worldPos.x,
            worldPos.y,
            worldPos.z,
          ],
          quaternion: [
            worldQuat.x,
            worldQuat.y,
            worldQuat.z,
            worldQuat.w,
          ],
        });

        /**
         * MARKER ASLI:
         * disembunyikan
         * tapi collision dimatikan
         */
        obj.visible = false;
        obj.raycast = () => null;
        obj.userData.collider = false;
      }

      /**
       * SEMUA OBJECT SELAIN MARKER BOOTH
       * BISA COLLISION
       */
      if (!name.startsWith("booth")) {
        obj.userData.collider = true;
      }
    });

    return result;
  }, [scene]);

  return (
    <>
      {/* LIGHT */}
      <ambientLight intensity={2.5} />

      <directionalLight
        position={[10, 15, 10]}
        intensity={4}
        castShadow
      />

      <pointLight
        position={[0, 8, 0]}
        intensity={3}
      />

      {/* HALL */}
      <primitive object={scene} />

      {/* BOOTH BARU */}
      {boothPoints.map((item, i) => (
        <Booth
          key={i}
          position={item.position}
          quaternion={item.quaternion}
          poster={`/uploads/${item.name}-poster.png`}
          video="https://www.youtube.com/embed/pNm1aeDNHDU?si=E--HIracxC0ZxCU-"
        />
      ))}

      {/* PLAYER */}
      <Player
        mode={mode}
        scene={scene}
      />

      {/* CAMERA */}
      <CameraSwitcher
        setMode={setMode}
      />
    </>
  );
}