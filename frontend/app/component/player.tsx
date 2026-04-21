"use client";

import {
  PointerLockControls,
  OrbitControls,
} from "@react-three/drei";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  mode: "first" | "third";
};

export default function Player({
  mode,
}: Props) {
  const { camera, scene: world } =
    useThree();

  const orbitRef = useRef<any>(null);

  const position = useRef(
    new THREE.Vector3(0, 8, 5)
  );

  const velocityY = useRef(0);

  const raycaster = useRef(
    new THREE.Raycaster()
  );

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const playerMesh = useRef<THREE.Mesh>(
    null!
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      /**
       * BLOKIR TOMBOL C
       */
      if (e.code === "KeyC") {
        e.preventDefault();
        return;
      }

      if (e.code === "KeyW")
        keys.current.w = true;

      if (e.code === "KeyA")
        keys.current.a = true;

      if (e.code === "KeyS")
        keys.current.s = true;

      if (e.code === "KeyD")
        keys.current.d = true;
    };

    const up = (e: KeyboardEvent) => {
      if (e.code === "KeyW")
        keys.current.w = false;

      if (e.code === "KeyA")
        keys.current.a = false;

      if (e.code === "KeyS")
        keys.current.s = false;

      if (e.code === "KeyD")
        keys.current.d = false;
    };

    const resetKeys = () => {
      keys.current = {
        w: false,
        a: false,
        s: false,
        d: false,
      };

      velocityY.current = 0;
    };

    window.addEventListener(
      "keydown",
      down
    );

    window.addEventListener(
      "keyup",
      up
    );

    window.addEventListener(
      "blur",
      resetKeys
    );

    document.addEventListener(
      "visibilitychange",
      resetKeys
    );

    return () => {
      window.removeEventListener(
        "keydown",
        down
      );

      window.removeEventListener(
        "keyup",
        up
      );

      window.removeEventListener(
        "blur",
        resetKeys
      );

      document.removeEventListener(
        "visibilitychange",
        resetKeys
      );
    };
  }, []);

  useFrame(() => {
    const speed = 0.15;
    const playerHeight = 3;

    const colliders: THREE.Object3D[] =
      [];

    world.traverse((obj: any) => {
      if (
        obj.name
          ?.toLowerCase()
          .includes("collider")
      ) {
        colliders.push(obj);
        obj.visible = false;
      }
    });

    /**
     * ARAH
     */
    const dir =
      new THREE.Vector3();

    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    const right =
      new THREE.Vector3();

    right
      .crossVectors(
        dir,
        camera.up
      )
      .normalize();

    /**
     * MOVE
     */
    const next =
      position.current.clone();

    if (keys.current.w)
      next.add(
        dir
          .clone()
          .multiplyScalar(speed)
      );

    if (keys.current.s)
      next.add(
        dir
          .clone()
          .multiplyScalar(-speed)
      );

    if (keys.current.a)
      next.add(
        right
          .clone()
          .multiplyScalar(-speed)
      );

    if (keys.current.d)
      next.add(
        right
          .clone()
          .multiplyScalar(speed)
      );

    /**
     * COLLISION
     */
    const moveDir = next
      .clone()
      .sub(position.current);

    if (moveDir.length() > 0) {
      moveDir.normalize();

      raycaster.current.set(
        position.current,
        moveDir
      );

      const hits =
        raycaster.current.intersectObjects(
          colliders,
          true
        );

      if (
        !hits.length ||
        hits[0].distance > 0.6
      ) {
        position.current.copy(
          next
        );
      }
    }

    /**
     * FLOOR
     */
    let grounded = false;

    raycaster.current.set(
      position.current,
      new THREE.Vector3(
        0,
        -1,
        0
      )
    );

    const floorHits =
      raycaster.current
        .intersectObjects(
          world.children,
          true
        )
        .filter(
          (hit) =>
            !hit.object.name
              ?.toLowerCase()
              .includes(
                "collider"
              )
        );

    if (floorHits.length) {
      const dist =
        floorHits[0].distance;

      const floorY =
        floorHits[0].point.y +
        playerHeight;

      if (
        dist <=
        playerHeight + 0.15
      ) {
        grounded = true;

        position.current.y =
          floorY;

        velocityY.current = 0;
      }
    }

    if (!grounded) {
      velocityY.current -=
        0.01;

      position.current.y +=
        velocityY.current;
    }

    /**
     * PLAYER BODY
     */
    if (
      playerMesh.current &&
      mode === "third"
    ) {
      playerMesh.current.position.copy(
        position.current
      );

      playerMesh.current.position.y -=
        1.5;
    }

    /**
     * CAMERA
     */
    if (mode === "first") {
      camera.position.copy(
        position.current
      );
    }

    if (
      mode === "third" &&
      orbitRef.current
    ) {
      orbitRef.current.target.copy(
        position.current
      );

      orbitRef.current.update();
    }
  });

  return (
    <>
      {mode === "first" && (
        <PointerLockControls />
      )}

      {mode === "third" && (
        <>
          <OrbitControls
            ref={orbitRef}
            enablePan={false}
            minDistance={4}
            maxDistance={8}
            maxPolarAngle={
              Math.PI / 2.1
            }
          />

          <mesh ref={playerMesh}>
            <capsuleGeometry
              args={[0.5, 1.2, 4, 8]}
            />
            <meshStandardMaterial />
          </mesh>
        </>
      )}
    </>
  );
}