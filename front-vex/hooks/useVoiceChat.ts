"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

type RemotePlayer = {
    id: string;
    peerId: string;
    x: number;
    y: number;
    z: number;
};

type Props = {
    selfPeerId: string;
    exhibitionId: string;

    myPosition: {
        x: number;
        y: number;
        z: number;
    };

    players: RemotePlayer[];
};

type PeerData = {
    pc: RTCPeerConnection;
    audio: HTMLAudioElement;
};

export default function useVoiceChat({
    selfPeerId,
    exhibitionId,
    myPosition,
    players,
}: Props) {
    const socketRef =
        useRef<Socket | null>(null);

    const streamRef =
        useRef<MediaStream | null>(null);

    const peersRef =
        useRef<Map<string, PeerData>>(
            new Map()
        );

    /* ===================== */
    /* CREATE PEER */
    /* ===================== */

    const createPeer = (
        remotePeerId: string
    ): PeerData => {
        const existing =
            peersRef.current.get(
                remotePeerId
            );

        if (existing)
            return existing;

        const pc =
            new RTCPeerConnection({
                iceServers: [
                    {
                        urls:
                            "stun:stun.l.google.com:19302",
                    },
                ],
            });

        if (
            streamRef.current
        ) {
            streamRef.current
                .getTracks()
                .forEach((track) => {
                    pc.addTrack(
                        track,
                        streamRef.current!
                    );
                });
        }

        const audio =
            new Audio();

        audio.autoplay = true;

        pc.ontrack = (
            event
        ) => {
            audio.srcObject =
                event.streams[0];
        };

        pc.onicecandidate =
            (event) => {
                if (
                    !event.candidate
                )
                    return;

                socketRef.current?.emit(
                    "signal",
                    {
                        room:
                            exhibitionId,
                        from:
                            selfPeerId,
                        to:
                            remotePeerId,
                        signal:
                            event.candidate,
                    }
                );
            };

        pc.onconnectionstatechange =
            () => {
                if (
                    pc.connectionState ===
                        "failed" ||
                    pc.connectionState ===
                        "closed" ||
                    pc.connectionState ===
                        "disconnected"
                ) {
                    peersRef.current.delete(
                        remotePeerId
                    );
                }
            };

        const peer = {
            pc,
            audio,
        };

        peersRef.current.set(
            remotePeerId,
            peer
        );

        return peer;
    };

    /* ===================== */
    /* INIT */
    /* ===================== */

    useEffect(() => {
        if (
            typeof window ===
            "undefined"
        )
            return;

        if (
            !navigator
                .mediaDevices
                ?.getUserMedia
        ) {
            console.error(
                "getUserMedia unsupported"
            );
            return;
        }

        const init =
            async () => {
                try {
                    const stream =
                        await navigator.mediaDevices.getUserMedia(
                            {
                                audio: true,
                            }
                        );

                    streamRef.current =
                        stream;

                    const socket =
                        io(window.location.origin); /*isi dengan domain server voice_server nantinya*/

                    socketRef.current =
                        socket;

                    /* ===================== */
                    /* SIGNAL */
                    /* ===================== */

                    socket.on(
                        "signal",
                        async (
                            data
                        ) => {
                            if (
                                data.to !==
                                selfPeerId
                            )
                                return;

                            let peer =
                                peersRef.current.get(
                                    data.from
                                );

                            if (
                                !peer
                            ) {
                                peer =
                                    createPeer(
                                        data.from
                                    );
                            }

                            const pc =
                                peer.pc;

                            try {
                                if (
                                    data.signal.type ===
                                    "offer"
                                ) {
                                    await pc.setRemoteDescription(
                                        new RTCSessionDescription(
                                            data.signal
                                        )
                                    );

                                    const answer =
                                        await pc.createAnswer();

                                    await pc.setLocalDescription(
                                        answer
                                    );

                                    socket.emit(
                                        "signal",
                                        {
                                            room:
                                                exhibitionId,
                                            from:
                                                selfPeerId,
                                            to:
                                                data.from,
                                            signal:
                                                answer,
                                        }
                                    );
                                }

                                else if (
                                    data.signal.type ===
                                    "answer"
                                ) {
                                    if (
                                        pc.signalingState !==
                                        "stable"
                                    ) {
                                        await pc.setRemoteDescription(
                                            new RTCSessionDescription(
                                                data.signal
                                            )
                                        );
                                    }
                                }

                                else if (
                                    data.signal
                                        .candidate
                                ) {
                                    await pc.addIceCandidate(
                                        new RTCIceCandidate(
                                            data.signal
                                        )
                                    );
                                }
                            } catch (
                                err
                            ) {
                                console.error(
                                    err
                                );
                            }
                        }
                    );

                    /* ===================== */
                    /* EXISTING PEERS */
                    /* ===================== */

                    socket.on(
                        "existing-peers",
                        async (
                            peerList
                        ) => {
                            for (const p of peerList) {
                                if (
                                    p.peerId ===
                                    selfPeerId
                                )
                                    continue;

                                /*
                                 * Hanya peer dengan ID lebih kecil
                                 * yang membuat offer.
                                 */
                                if (
                                    selfPeerId >
                                    p.peerId
                                )
                                    continue;

                                const peer =
                                    createPeer(
                                        p.peerId
                                    );

                                const offer =
                                    await peer.pc.createOffer();

                                await peer.pc.setLocalDescription(
                                    offer
                                );

                                socket.emit(
                                    "signal",
                                    {
                                        room:
                                            exhibitionId,
                                        from:
                                            selfPeerId,
                                        to:
                                            p.peerId,
                                        signal:
                                            offer,
                                    }
                                );
                            }
                        }
                    );

                    /* ===================== */
                    /* NEW PEER JOINED */
                    /* ===================== */

                    socket.on(
                        "peer-joined",
                        async ({
                            peerId,
                        }) => {
                            if (
                                peerId ===
                                selfPeerId
                            )
                                return;

                            if (
                                selfPeerId >
                                peerId
                            )
                                return;

                            const peer =
                                createPeer(
                                    peerId
                                );

                            const offer =
                                await peer.pc.createOffer();

                            await peer.pc.setLocalDescription(
                                offer
                            );

                            socket.emit(
                                "signal",
                                {
                                    room:
                                        exhibitionId,
                                    from:
                                        selfPeerId,
                                    to:
                                        peerId,
                                    signal:
                                        offer,
                                }
                            );
                        }
                    );

                    /* ===================== */
                    /* PEER LEFT */
                    /* ===================== */

                    socket.on(
                        "peer-left",
                        ({
                            peerId,
                        }) => {
                            const peer =
                                peersRef.current.get(
                                    peerId
                                );

                            if (
                                !peer
                            )
                                return;

                            peer.pc.close();

                            peersRef.current.delete(
                                peerId
                            );
                        }
                    );

                    socket.emit(
                        "join",
                        {
                            room:
                                exhibitionId,
                            peerId:
                                selfPeerId,
                        }
                    );
                } catch (
                    err
                ) {
                    console.error(
                        err
                    );
                }
            };

        init();

        return () => {
            socketRef.current?.disconnect();

            peersRef.current.forEach(
                (peer) => {
                    peer.pc.close();
                }
            );

            peersRef.current.clear();

            streamRef.current
                ?.getTracks()
                .forEach((track) =>
                    track.stop()
                );
        };
    }, [
        exhibitionId,
        selfPeerId,
    ]);

    /* ===================== */
    /* PROXIMITY AUDIO */
    /* ===================== */

    useEffect(() => {
        const maxDistance =
            15;

        players.forEach(
            (player) => {
                const peer =
                    peersRef.current.get(
                        player.peerId
                    );

                if (!peer)
                    return;

                const dx =
                    player.x -
                    myPosition.x;

                const dy =
                    player.y -
                    myPosition.y;

                const dz =
                    player.z -
                    myPosition.z;

                const distance =
                    Math.sqrt(
                        dx * dx +
                            dy * dy +
                            dz * dz
                    );

                peer.audio.volume =
                    Math.max(
                        0,
                        1 -
                            distance /
                                maxDistance
                    );
            }
        );
    }, [
        players,
        myPosition,
    ]);
}