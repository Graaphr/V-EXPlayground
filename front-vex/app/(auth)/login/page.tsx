"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Komponen
import { Logo } from "@/components/Componen";
import { Button, ButtonPutih } from "@/components/model/Button";
import { VectorBox } from "@/components/model/BoxModel";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// API
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Harap isi email dan kata sandi");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;

      await login(token); 
      alert("Login Berhasil!");

      if (user.role?.toLowerCase() === "admin") {
        router.push("/admin/pengguna");
      } else {
        router.push("/pameran");
      }
    } catch (error: any) {
      // console.error(error.response?.data);
      alert(error.response?.data?.message || "Email atau Kata Sandi salah");
    } finally {
      setIsLoading(false);
    }
  };
  const slideUp = {
    initial: { y: "100vh", opacity: 0 },
    animate: {
      y: [0, -15, 0],
      opacity: 1,
    },
  };

  const floatingTransition = (d: number): Transition => ({
    y: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: d + 1.2,
    },
    opacity: {
      duration: 1.2,
      delay: d,
    },
    default: {
      ease: "easeOut",
    },
  });

  return (
    <div className="bg-secondary-color overflow-hidden min-h-screen flex items-center justify-center p-4 relative text-black">
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "circOut" }}
        className="absolute h-[95%] bottom-0 w-[95%] bg-main-blue rounded-t-full"
      >
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.2)}
          className="absolute z-2 bottom-0 left-8"
        >
          <VectorBox className="h-[250px] w-[250px]  rotate-12" />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.4)}
          className="absolute top-20 left-20"
        >
          <VectorBox className="h-[200px]  w-[200px] opacity-90 -rotate-12 " />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.1)}
          className="absolute z-2 top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <VectorBox className="h-[400px]  w-[400px] rotate-45" />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.3)}
          className="absolute z-2 bottom-0 right-5"
        >
          <VectorBox className="h-[250px] w-[250px] -rotate-12" />
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.5)}
          className="absolute z-2 top-10 right-[200px]"
        >
          <VectorBox className="h-[200px] w-[200px]  rotate-12 opacity-90" />
        </motion.div>
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.6)}
          className="absolute top-1/2 z-2 left-80"
        >
          <VectorBox className="h-[100px] w-[100px] opacity-80 rotate-45 " />
        </motion.div>
        <motion.div
          variants={slideUp}
          initial="initial"
          animate="animate"
          transition={floatingTransition(0.7)}
          className="absolute z-2 bottom-50 right-60"
        >
          <VectorBox className="h-[100px] w-[100px]  -rotate-45 opacity-90" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="z-10 bg-white scale-90 rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center border border-gray-100"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo />
        </div>

        {/* ✅ FORM FIX */}
        <form onSubmit={handleLogin} className="w-full space-y-5 select-none">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="input-form"
          />

          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              className="input-form"
            />

            <motion.span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 flex items-center justify-center"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                {showPassword ? (
                  <motion.div
                    key="hide"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaEyeSlash size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="show"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaEye size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
          </div>

          <div className="flex justify-end">
            <Link
              href="/lupa-password/email"
              className="text-sm hover:text-main-blue"
            >
              Lupa Kata Sandi?
            </Link>
          </div>

          <div className="w-full mt-8 border-b-2 border-gray-300 pb-8">
            <Button
              type="submit"
              className="w-full py-3 border-2 rounded-lg text-lg font-bold"
            >
              {isLoading ? "Loading..." : "Masuk"}
            </Button>
          </div>
        </form>

        <div className="mt-6 flex flex-col items-center w-full">
          <span className="text-sm mb-4">Belum punya akun?</span>
          <div className="w-full mt-1 border-b border-gray-200 pb-1">
            <ButtonPutih
              className="w-full py-3 border-2 rounded-lg text-lg font-bold"
              link="/register"
            >
              Daftar
            </ButtonPutih>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
