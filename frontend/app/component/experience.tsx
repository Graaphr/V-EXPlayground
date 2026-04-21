"use client";

import { useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";

import Booth from "./booth";
import Player from "./player";
import CameraSwitcher from "./cameraSwitcher";
import * as THREE from "three";

export default function Experience() {
    const [mode, setMode] = useState<"first" | "third">("first");

    const { scene } = useGLTF("/models/hall.glb");

    const boothPoints = useMemo(() => {
        const result: any[] = [];

        scene.updateMatrixWorld(true);

        scene.traverse((obj: any) => {
            if (obj.name.startsWith("Booth")) {
                const worldPos = new THREE.Vector3();
                const worldQuat = new THREE.Quaternion();

                obj.getWorldPosition(worldPos);
                obj.getWorldQuaternion(worldQuat);

                result.push({
                    name: obj.name,
                    position: [worldPos.x, worldPos.y, worldPos.z],
                    quaternion: [
                        worldQuat.x,
                        worldQuat.y,
                        worldQuat.z,
                        worldQuat.w,
                    ],
                });
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

            {boothPoints.map((item, i) => (
                <Booth
                    key={i}
                    position={item.position}
                    quaternion={item.quaternion}
                    poster={`/uploads/${item.name}-poster.png`}
                    video="https://www.youtube.com/embed/abc123"
                />
            ))}

            <Player mode={mode} scene={scene} />
            <CameraSwitcher setMode={setMode} />
        </>
    );
}