"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, ButtonPutih } from "@/components/model/Button";
import api from "@/lib/axios";

export default function ResetPasswordChoicePage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    const [showForm, setShowForm] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // =========================
    // LOGIN LANGSUNG
    // =========================
    const handleDirectLogin = async () => {
        try {
            setError("");
            setSuccess("");
            setIsLoading(true);

            await api.get("/sanctum/csrf-cookie");

            const res = await api.post(
                "/api/reset-login-direct",
                { email, token }
            );

            setSuccess(
                res.data.message ||
                "Login berhasil, mengalihkan..."
            );

            setTimeout(() => {
                router.push("/dashboard");
            }, 1200);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Gagal login langsung"
            );
        } finally {
            setIsLoading(false);
        }
    };

    // =========================
    // UBAH PASSWORD
    // =========================
    const handleChangePassword = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        if (
            password !== passwordConfirmation
        ) {
            setError(
                "Konfirmasi password tidak cocok"
            );
            return;
        }

        try {
            setIsLoading(true);

            await api.get("/sanctum/csrf-cookie");

            const res = await api.post(
                "/api/reset-password",
                {
                    email,
                    token,
                    password,
                    password_confirmation:
                        passwordConfirmation,
                }
            );

            setSuccess(
                res.data.message ||
                "Password berhasil diubah"
            );

            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Gagal mengubah password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-main-blue px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                {/* HEADER */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">
                        Reset Password
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Pilih tindakan untuk akun Anda
                    </p>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* SUCCESS */}
                {success && (
                    <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4">
                        {success}
                    </div>
                )}

                {/* PILIHAN */}
                {!showForm ? (
                    <div className="space-y-4">
                        <Button
                            link="/"
                            onClick={handleDirectLogin}
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg disabled:opacity-50"
                        >
                            {isLoading
                                ? "Memproses..."
                                : "Masuk Langsung"}
                        </Button>

                        <ButtonPutih
                            type="button"
                            onClick={() =>
                                setShowForm(true)
                            }
                            className="w-full py-3 rounded-lg"
                        >
                            Ubah Kata Sandi
                        </ButtonPutih>
                    </div>
                ) : (
                    <form
                        onSubmit={
                            handleChangePassword
                        }
                        className="space-y-4"
                    >
                        <input
                            type="password"
                            placeholder="Kata Sandi Baru"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Konfirmasi Kata Sandi"
                            value={
                                passwordConfirmation
                            }
                            onChange={(e) =>
                                setPasswordConfirmation(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <Button
                            link="/"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg disabled:opacity-50"
                        >
                            {isLoading
                                ? "Menyimpan..."
                                : "Simpan"}
                        </Button>

                        <ButtonPutih
                            type="button"
                            onClick={() =>
                                setShowForm(false)
                            }
                            className="w-full py-3 rounded-lg"
                        >
                            Kembali
                        </ButtonPutih>
                    </form>
                )}
            </div>
        </div>
    );
}