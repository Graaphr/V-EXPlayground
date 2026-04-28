"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function VerifikasiPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // =========================
  // GET EMAIL FROM STORAGE
  // =========================
  useEffect(() => {
    const savedEmail = localStorage.getItem("pending_email");

    if (!savedEmail) {
      router.push("/register");
      return;
    }

    setEmail(savedEmail);
  }, [router]);

  // =========================
  // VERIFY OTP
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("OTP harus 6 digit");
      return;
    }

    try {
      setIsLoading(true);

      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/api/verify-otp", {
        email: email,
        otp: otp,
      });

      setSuccess(res.data.message);

      localStorage.removeItem("pending_email");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal verifikasi OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================
  const handleResend = async () => {
    try {
      setError("");
      setSuccess("");

      await api.post("/api/resend-otp", {
        email: email,
      });

      setSuccess("OTP berhasil dikirim ulang");
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal kirim ulang OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-blue px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Verifikasi Email</h1>

          <p className="text-sm text-gray-500 mt-2">Masukkan 6 digit OTP</p>

          {email && <p className="text-xs text-gray-400 mt-1">{email}</p>}
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            className="w-full text-center tracking-[0.5em] text-2xl font-bold px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>

        {/* RESEND */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Tidak menerima kode?</p>

          <button
            onClick={handleResend}
            className="text-blue-600 font-medium hover:underline mt-1"
          >
            Kirim ulang OTP
          </button>
        </div>

        {/* BACK */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/register")}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Kembali ke Register
          </button>
        </div>
      </div>
    </div>
  );
}
