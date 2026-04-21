"use client"

import { Canvas } from "@react-three/fiber";
import Experience from "@/app/component/experience";

export default function Page() {
    return (
        <div className="w-screen h-screen">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 75 }}>
                <Experience />
            </Canvas>
        </div>
    )
}