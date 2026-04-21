"use client";

import { PointerLockControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
    mode: "first" | "third";
    scene: THREE.Scene;
};

export default function Player({ mode, scene }: Props) {
    const { camera } = useThree();

    const position = useRef(new THREE.Vector3(0, 8, 5));
    const velocityY = useRef(0);

    const raycaster = new THREE.Raycaster();

    const keys = useRef({
        w: false,
        a: false,
        s: false,
        d: false,
    });

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.code === "KeyW") keys.current.w = true;
            if (e.code === "KeyA") keys.current.a = true;
            if (e.code === "KeyS") keys.current.s = true;
            if (e.code === "KeyD") keys.current.d = true;
        };

        const up = (e: KeyboardEvent) => {
            if (e.code === "KeyW") keys.current.w = false;
            if (e.code === "KeyA") keys.current.a = false;
            if (e.code === "KeyS") keys.current.s = false;
            if (e.code === "KeyD") keys.current.d = false;
        };

        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);

        return () => {
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);

    useFrame(() => {
        const speed = 0.15;

        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        dir.y = 0;
        dir.normalize();

        const right = new THREE.Vector3();
        right.crossVectors(dir, camera.up).normalize();

        const next = position.current.clone();

        if (keys.current.w) next.add(dir.clone().multiplyScalar(speed));
        if (keys.current.s) next.add(dir.clone().multiplyScalar(-speed));
        if (keys.current.a) next.add(right.clone().multiplyScalar(-speed));
        if (keys.current.d) next.add(right.clone().multiplyScalar(speed));

        /**
         * WALL COLLISION
         */
        raycaster.set(position.current, next.clone().sub(position.current).normalize());

        const hits = raycaster.intersectObjects(scene.children, true);

        if (!hits.length || hits[0].distance > 0.5) {
            position.current.copy(next);
        }

        const playerHeight = 3;
        let grounded = false;

        // cek lantai
        raycaster.set(position.current, new THREE.Vector3(0, -1, 0));
        const floorHits = raycaster.intersectObjects(scene.children, true);

        if (floorHits.length) {
            const dist = floorHits[0].distance;
            const floorY = floorHits[0].point.y + playerHeight;

            if (dist <= playerHeight + 0.15) {
                grounded = true;
                position.current.y = floorY;
                velocityY.current = 0;
            }
        }

        // gravity hanya kalau tidak grounded
        if (!grounded) {
            velocityY.current -= 0.01;
            position.current.y += velocityY.current;
        }
        /**
         * CAMERA
         */
        if (mode === "first") {
            camera.position.copy(position.current);
        } else {
            camera.position.lerp(
                new THREE.Vector3(
                    position.current.x,
                    position.current.y + 3,
                    position.current.z + 6
                ),
                0.1
            );

            camera.lookAt(position.current);
        }
    });

    return mode === "first" ? <PointerLockControls /> : null;
}