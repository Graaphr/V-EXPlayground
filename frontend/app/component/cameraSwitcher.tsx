"use client";

import { useEffect } from "react";

type Props = {
    setMode: React.Dispatch<React.SetStateAction<"first" | "third">>;
};

export default function CameraSwitcher({ setMode }: Props) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === "Tab") {
                e.preventDefault();

                setMode((prev) => (prev === "first" ? "third" : "first"));
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, [setMode]);

    return null;
}