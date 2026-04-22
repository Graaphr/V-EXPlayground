"use client";

import { useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

import Booth from "./booth";
import Player from "./player";
import CameraSwitcher from "./cameraSwitcher";

type Props = {
  openPoster: (
    src: string,
    booth: string
  ) => void;

  controlsLocked: boolean;
};

export default function Experience({
  openPoster,
  controlsLocked,
}: Props) {
  const [mode, setMode] =
    useState<"first" | "third">(
      "first"
    );

  /**
   * LOAD HALL
   */
  const { scene } = useGLTF(
    "/models/hall2.glb"
  );

  /**
   * AMBIL POSISI BOOTH
   */
  const boothPoints = useMemo(() => {
    const result: any[] = [];

    scene.updateMatrixWorld(true);

    scene.traverse((obj: any) => {
      const name =
        obj.name || "";

      const lower =
        name.toLowerCase();

      /**
       * MARKER BOOTH
       */
      if (
        lower.startsWith(
          "booth"
        )
      ) {
        const worldPos =
          new THREE.Vector3();

        const worldQuat =
          new THREE.Quaternion();

        obj.getWorldPosition(
          worldPos
        );

        obj.getWorldQuaternion(
          worldQuat
        );

        result.push({
          name: name,
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

        obj.visible = false;
        obj.raycast =
          () => null;

        obj.userData.collider =
          false;
      }

      /**
       * COLLIDER
       */
      if (
        lower.includes(
          "collider"
        )
      ) {
        obj.userData.collider =
          true;

        obj.visible = false;
      } else if (
        !lower.startsWith(
          "booth"
        )
      ) {
        obj.userData.collider =
          false;
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
      <primitive
        object={scene}
      />

      {/* BOOTH */}
      {boothPoints.map(
        (item, i) => (
          <Booth
            key={i}
            boothName={
              item.name
            }
            position={
              item.position
            }
            quaternion={
              item.quaternion
            }
            poster={`/uploads/${item.name}-poster.png`}
            video={`/uploads/${item.name}-video.mp4`}
            openPoster={
              openPoster
            }
          />
        )
      )}

      {/* PLAYER JANGAN DIUNMOUNT */}
      <Player
        mode={mode}
        controlsLocked={
          controlsLocked
        }
      />

      {/* CAMERA SWITCH */}
      <CameraSwitcher
        setMode={setMode}
        disabled={
          !controlsLocked
        }
      />
    </>
  );
}