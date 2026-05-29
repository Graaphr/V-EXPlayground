"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useGLTF, Text, } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Booth from "./booth";
import Player from "./player";
import CameraSwitcher from "./cameraSwitcher";

import exhibitions from "@/public/data/Pameran.json";

type RemotePlayer = {
  id: string;

  name: string;

  x: number;
  y: number;
  z: number;

  rotation: number;

  updatedAt: number;
};

type Props = {
  exhibitionId: string;

  playerId: string;
  playerName: string;

  openPoster: (
    src: string,
    booth: string
  ) => void;

  controlsLocked: boolean;
  soundOn: boolean;

  mobileMove?: {
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
  };

  lookDelta?: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
};

export default function Experience({
  exhibitionId,
  playerId,
  playerName,
  openPoster,
  controlsLocked,
  soundOn,
  mobileMove,
  lookDelta,
}: Props) {
  const [mode, setMode] =
    useState<"first" | "third">(
      "first"
    );

  const [walking, setWalking] =
    useState(false);

  const [jumping, setJumping] =
    useState(false);

  const [
    remotePlayers,
    setRemotePlayers,
  ] = useState<
    RemotePlayer[]
  >([]);

  const isViewingMedia =
    !controlsLocked;

  /* ===================== */
  /* AUDIO */
  /* ===================== */

  const bgmRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  const footRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  const jumpRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  const loader =
    useRef(
      new THREE.TextureLoader()
    );

  const { scene } = useGLTF(
    "/models/Default.glb"
  );

  /* ===================== */
  /* DATA PAMERAN */
  /* ===================== */

  const currentExpo =
    exhibitions.find(
      (item: any) =>
        item.id === exhibitionId
    );

  const category =
    currentExpo?.category ||
    "default";

  const folder = category
    .toLowerCase()
    .replaceAll(" ", "-");

  /* ===================== */
  /* INIT AUDIO */
  /* ===================== */

  useEffect(() => {
    bgmRef.current =
      new Audio(
        "/music/bgm.mp3"
      );

    bgmRef.current.loop =
      true;

    bgmRef.current.volume =
      0.35;

    footRef.current =
      new Audio(
        "/music/footstep.mp3"
      );

    footRef.current.loop =
      true;

    footRef.current.volume =
      0.55;

    jumpRef.current =
      new Audio(
        "/music/jump.mp3"
      );

    jumpRef.current.volume =
      0.75;

    return () => {
      bgmRef.current?.pause();

      footRef.current?.pause();

      jumpRef.current?.pause();
    };
  }, []);

  /* ===================== */
  /* BGM */
  /* ===================== */

  useEffect(() => {
    if (!bgmRef.current)
      return;

    if (soundOn) {
      bgmRef.current.volume =
        isViewingMedia
          ? 0.08
          : 0.35;

      bgmRef.current
        .play()
        .catch(() => { });
    } else {
      bgmRef.current.pause();

      footRef.current?.pause();

      jumpRef.current?.pause();
    }
  }, [
    soundOn,
    isViewingMedia,
  ]);

  /* ===================== */
  /* FOOTSTEP */
  /* ===================== */

  useEffect(() => {
    if (!footRef.current)
      return;

    const shouldWalk =
      soundOn &&
      walking &&
      controlsLocked &&
      !jumping;

    if (shouldWalk) {
      footRef.current
        .play()
        .catch(() => { });
    } else {
      footRef.current.pause();

      footRef.current.currentTime =
        0;
    }
  }, [
    soundOn,
    walking,
    controlsLocked,
    jumping,
  ]);

  /* ===================== */
  /* JUMP SOUND */
  /* ===================== */

  useEffect(() => {
    if (
      !jumpRef.current ||
      !soundOn
    )
      return;

    if (jumping) {
      footRef.current?.pause();

      if (footRef.current) {
        footRef.current.currentTime =
          0;
      }

      jumpRef.current.pause();

      jumpRef.current.currentTime =
        0;

      jumpRef.current
        .play()
        .catch(() => { });
    }
  }, [jumping, soundOn]);

  /* ===================== */
  /* MULTIPLAYER READ */
  /* ===================== */

  useEffect(() => {
    const loadPlayers =
      async () => {
        try {
          const res =
            await fetch(
              "/api/player"
            );

          const data =
            await res.json();

          const now = Date.now();

          const filtered =
            arr.filter(
              (p) =>
                p.id !== playerId &&
                now - p.updatedAt < 3000
            );

          setRemotePlayers((prev) => {
            const same =
              JSON.stringify(prev) ===
              JSON.stringify(filtered);

            return same
              ? prev
              : filtered;
          });
        } catch (err) {
          console.log(err);
        }
      };

    loadPlayers();

    const interval =
      setInterval(
        loadPlayers,
        300
      );

    return () =>
      clearInterval(
        interval
      );
  }, [playerId]);

  /* ===================== */
  /* SAFE TEXTURE */
  /* ===================== */

  const loadTextureSafe = (
    path: string,
    onLoad: (
      tex: THREE.Texture
    ) => void
  ) => {
    loader.current.load(
      path,
      (tex) => {
        tex.flipY = false;

        tex.colorSpace =
          THREE.SRGBColorSpace;

        onLoad(tex);
      },
      undefined,
      () => { }
    );
  };

  /* ===================== */
  /* DISPLAY TEXTURE */
  /* ===================== */

  useEffect(() => {
    scene.traverse(
      (obj: any) => {
        if (!obj.isMesh)
          return;

        const name =
          obj.name?.toLowerCase() ||
          "";

        if (
          name.startsWith(
            "paneldisplay"
          )
        ) {
          const code =
            name.replace(
              "paneldisplay",
              ""
            );

          const num =
            parseInt(
              code[1]
            );

          if (isNaN(num))
            return;

          loadTextureSafe(
            `/prodi/${folder}/${num}.png`,
            (tex) => {
              obj.material =
                new THREE.MeshBasicMaterial(
                  {
                    map: tex,
                    toneMapped:
                      false,
                  }
                );
            }
          );
        }

        if (name === "panel") {
          loadTextureSafe(
            `/prodi/${folder}/${folder}.png`,
            (tex) => {
              obj.material =
                new THREE.MeshBasicMaterial(
                  {
                    map: tex,
                    toneMapped:
                      false,
                  }
                );
            }
          );
        }
      }
    );
  }, [scene, folder]);

  /* ===================== */
  /* POSTER */
  /* ===================== */

  useEffect(() => {
    scene.traverse(
      (obj: any) => {
        if (!obj.isMesh)
          return;

        const lower =
          obj.name?.toLowerCase() ||
          "";

        if (
          !lower.startsWith(
            "panelposter"
          )
        )
          return;

        const code =
          lower.replace(
            "panelposter",
            ""
          );

        const zone =
          code[0];

        const num =
          parseInt(
            code.slice(1)
          );

        if (
          !zone ||
          isNaN(num)
        )
          return;

        const posterNum =
          ((num - 1) % 6) + 1;

        loadTextureSafe(
          `/uploads/${exhibitionId}/booth${zone}${posterNum}-poster.png`,
          (tex) => {
            obj.material =
              new THREE.MeshBasicMaterial(
                {
                  map: tex,
                  toneMapped:
                    false,
                }
              );
          }
        );
      }
    );
  }, [
    scene,
    exhibitionId,
  ]);

  /* ===================== */
  /* BOOTH POINT */
  /* ===================== */

  const boothPoints =
    useMemo(() => {
      const result: any[] =
        [];

      scene.updateMatrixWorld(
        true
      );

      scene.traverse(
        (obj: any) => {
          const lower =
            obj.name?.toLowerCase() ||
            "";

          if (
            lower.startsWith(
              "booth"
            )
          ) {
            const pos =
              new THREE.Vector3();

            const quat =
              new THREE.Quaternion();

            obj.getWorldPosition(
              pos
            );

            obj.getWorldQuaternion(
              quat
            );

            result.push({
              name: obj.name,

              position: [
                pos.x,
                pos.y,
                pos.z,
              ],

              quaternion:
                [
                  quat.x,
                  quat.y,
                  quat.z,
                  quat.w,
                ],
            });

            obj.visible =
              false;

            obj.raycast =
              () => null;
          }

          if (
            lower.includes(
              "collider"
            )
          ) {
            obj.visible =
              false;

            obj.traverse(
              (
                child: any
              ) => {
                child.visible =
                  false;

                if (
                  child.isMesh
                ) {
                  child.userData.collider =
                    true;
                }
              }
            );
          }

          if (
            obj.isMesh &&
            !obj.userData
              ?.collider
          ) { }
        }
      );

      return result;
    }, [scene]);

  return (
    <>
      <ambientLight
        intensity={2.2}
      />

      <directionalLight
        position={[
          10, 15, 10,
        ]}
        intensity={3}
      />

      <pointLight
        position={[
          0, 8, 0,
        ]}
        intensity={2}
      />

      <primitive
        object={scene}
      />

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
            poster={`/uploads/${exhibitionId}/${item.name}-poster.png`}
            video={`/uploads/${exhibitionId}/${item.name}-video.mp4`}
            openPoster={
              openPoster
            }
          />
        )
      )}

      {/* ===================== */}
      {/* REMOTE PLAYERS */}
      {/* ===================== */}

      {remotePlayers.map(
        (player) => (
          <RemotePlayerMesh
            key={player.id}
            player={player}
          />
        )
      )}

      <Player
        mode={mode}
        controlsLocked={
          controlsLocked
        }
        setWalking={
          setWalking
        }
        mobileMove={
          mobileMove
        }
        lookDelta={
          lookDelta
        }

        playerId={
          playerId
        }

        playerName={
          playerName
        }
      />

      <CameraSwitcher
        setMode={setMode}
        disabled={
          !controlsLocked
        }
      />
    </>
  );
}

function RemotePlayerMesh({
  player,
}: {
  player: RemotePlayer;
}) {
  const groupRef =
    useRef<THREE.Group>(
      null!
    );

  const targetPos =
    useRef(
      new THREE.Vector3(
        player.x,
        player.y,
        player.z
      )
    );

  useEffect(() => {
    targetPos.current.set(
      player.x,
      player.y,
      player.z
    );
  }, [player]);

  useFrame((_, delta) => {
    if (!groupRef.current)
      return;

    /* POSITION SMOOTH */
    groupRef.current.position.lerp(
      targetPos.current,
      delta * 8
    );

    /* ROTATION SMOOTH */
    groupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        groupRef.current
          .rotation.y,
        player.rotation,
        delta * 8
      );
  });

  return (
    <group ref={groupRef}>
      {/* BODY */}
      <mesh position={[0, -1, 0]}>
        <capsuleGeometry
          args={[
            0.8,
            1.8,
            4,
            8,
          ]}
        />

        <meshStandardMaterial
          color="cyan"
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* NAME */}
      <Text
        characters="Guest0123456789"
        position={[
          0,
          1,
          0,
        ]}
        fontSize={0.28}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {player.name}
      </Text>
    </group>
  );
}