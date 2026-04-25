"use client";

import {
  PointerLockControls,
  OrbitControls,
} from "@react-three/drei";

import {
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  useEffect,
  useRef,
} from "react";

import * as THREE from "three";

type Props = {
  mode: "first" | "third";
  controlsLocked: boolean;
  setWalking?: (
    value: boolean
  ) => void;
};

export default function Player({
  mode,
  controlsLocked,
  setWalking,
}: Props) {
  const {
    camera,
    scene: world,
  } = useThree();

  const orbitRef =
    useRef<any>(null);

  const pointerRef =
    useRef<any>(null);

  const playerMesh =
    useRef<THREE.Mesh>(
      null!
    );

  const raycaster =
    useRef(
      new THREE.Raycaster()
    );

  const position =
    useRef(
      new THREE.Vector3(
        0,
        20,
        -s8
      )
    );

  const velocityY =
    useRef(0);

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const colliders =
    useRef<
      THREE.Object3D[]
    >([]);

  /* ===================== */
  /* COLLIDER CACHE */
  /* ===================== */

  useEffect(() => {
    const scan = () => {
      const arr:
        THREE.Object3D[] =
        [];

      world.traverse(
        (obj: any) => {
          if (
            obj.userData
              ?.collider &&
            obj.isMesh
          ) {
            arr.push(obj);
            obj.visible =
              false;
          }
        }
      );

      colliders.current =
        arr;

      console.log(
        "Collider Found:",
        arr.length
      );
    };

    const timer =
      setTimeout(
        scan,
        300
      );

    return () =>
      clearTimeout(
        timer
      );
  }, [world]);

  /* ===================== */
  /* KEYBOARD */
  /* ===================== */

  useEffect(() => {
    const down = (
      e: KeyboardEvent
    ) => {
      if (
        !controlsLocked
      )
        return;

      if (e.code === "KeyW")
        keys.current.w =
          true;

      if (e.code === "KeyA")
        keys.current.a =
          true;

      if (e.code === "KeyS")
        keys.current.s =
          true;

      if (e.code === "KeyD")
        keys.current.d =
          true;
    };

    const up = (
      e: KeyboardEvent
    ) => {
      if (e.code === "KeyW")
        keys.current.w =
          false;

      if (e.code === "KeyA")
        keys.current.a =
          false;

      if (e.code === "KeyS")
        keys.current.s =
          false;

      if (e.code === "KeyD")
        keys.current.d =
          false;
    };

    const reset = () => {
      keys.current = {
        w: false,
        a: false,
        s: false,
        d: false,
      };
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
      reset
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
        reset
      );
    };
  }, [controlsLocked]);

  /* ===================== */
  /* UNLOCK */
  /* ===================== */

  useEffect(() => {
    if (
      !controlsLocked
    ) {
      keys.current = {
        w: false,
        a: false,
        s: false,
        d: false,
      };

      setWalking?.(
        false
      );

      document.exitPointerLock?.();
    }
  }, [
    controlsLocked,
    setWalking,
  ]);

  /* ===================== */
  /* FRAME */
  /* ===================== */

  useFrame(() => {
    const speed =
      0.15;

    const playerHeight =
      3;

    const dir =
      new THREE.Vector3();

    camera.getWorldDirection(
      dir
    );

    dir.y = 0;
    dir.normalize();

    const right =
      new THREE.Vector3()
        .crossVectors(
          dir,
          camera.up
        )
        .normalize();

    const next =
      position.current.clone();

    let moving =
      false;

    if (
      controlsLocked
    ) {
      if (
        keys.current.w
      ) {
        next.add(
          dir
            .clone()
            .multiplyScalar(
              speed
            )
        );
        moving =
          true;
      }

      if (
        keys.current.s
      ) {
        next.add(
          dir
            .clone()
            .multiplyScalar(
              -speed
            )
        );
        moving =
          true;
      }

      if (
        keys.current.a
      ) {
        next.add(
          right
            .clone()
            .multiplyScalar(
              -speed
            )
        );
        moving =
          true;
      }

      if (
        keys.current.d
      ) {
        next.add(
          right
            .clone()
            .multiplyScalar(
              speed
            )
        );
        moving =
          true;
      }
    }

    setWalking?.(
      moving
    );

    /* ===================== */
    /* WALL COLLISION */
    /* ===================== */

    const moveDir =
      next
        .clone()
        .sub(
          position.current
        );

    if (
      moveDir.length() >
      0
    ) {
      moveDir.normalize();

      const origin =
        position.current.clone();

      origin.y -= 1;

      raycaster.current.set(
        origin,
        moveDir
      );

      raycaster.current.far =
        0.7;

      const hits =
        raycaster.current.intersectObjects(
          colliders.current,
          true
        );

      if (
        hits.length ===
        0
      ) {
        position.current.copy(
          next
        );
      }
    }

    /* ===================== */
    /* FLOOR */
    /* ===================== */

    let grounded =
      false;

    const floorOrigin =
      position.current.clone();

    floorOrigin.y +=
      0.3;

    raycaster.current.set(
      floorOrigin,
      new THREE.Vector3(
        0,
        -1,
        0
      )
    );

    raycaster.current.far =
      20;

    const floorHits =
      raycaster.current
        .intersectObjects(
          world.children,
          true
        )
        .filter(
          (
            hit: any
          ) =>
            hit.object
              .isMesh &&
            !hit.object
              .userData
              ?.collider &&
            hit.point.y <=
              position
                .current.y
        )
        .sort(
          (a, b) =>
            a.distance -
            b.distance
        );

    if (
      floorHits.length >
      0
    ) {
      const floorY =
        floorHits[0]
          .point.y +
        playerHeight;

      grounded =
        true;

      position.current.y =
        floorY;

      velocityY.current =
        0;
    }

    if (
      !grounded
    ) {
      velocityY.current -=
        0.008;

      position.current.y +=
        velocityY.current;
    }

    /* ===================== */
    /* BODY TPS */
    /* ===================== */

    if (
      playerMesh.current &&
      mode ===
        "third"
    ) {
      playerMesh.current.position.copy(
        position.current
      );

      playerMesh.current.position.y -=
        1.5;
    }

    /* ===================== */
    /* CAMERA */
    /* ===================== */

    if (
      mode ===
      "first"
    ) {
      camera.position.copy(
        position.current
      );
    }

    if (
      mode ===
        "third" &&
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
      {mode ===
        "first" && (
        <PointerLockControls
          ref={
            pointerRef
          }
        />
      )}

      {mode ===
        "third" && (
        <>
          <OrbitControls
            ref={
              orbitRef
            }
            enablePan={
              false
            }
            enableRotate={
              controlsLocked
            }
            enableZoom={
              controlsLocked
            }
            minDistance={
              4
            }
            maxDistance={
              8
            }
            maxPolarAngle={
              Math.PI /
              2.1
            }
          />

          <mesh
            ref={
              playerMesh
            }
          >
            <capsuleGeometry
              args={[
                0.5,
                1.2,
                4,
                8,
              ]}
            />

            <meshStandardMaterial
              color="lime"
              transparent
              opacity={
                0.35
              }
            />
          </mesh>
        </>
      )}
    </>
  );
}