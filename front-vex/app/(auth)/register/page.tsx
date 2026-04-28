"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Logo, Button, ButtonPutih } from "@/components/Componen";
import { VectorBlueBox } from "@/components/model/BoxModel";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama || !form.email || !form.password || !form.confirm) {
      alert("Semua field wajib diisi");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Password tidak sama");
      return;
    }

    console.log("DATA REGISTER:", form);
  };

  const slideUp = {
    initial: { y: "100vh", opacity: 0 },
    animate: { y: [0, -15, 0], opacity: 1 },
  };

  const floatingTransition = (d: number): Transition => ({
    y: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: d + 1.2,
    },
    opacity: { duration: 1.2, delay: d },
    ease: "easeOut",
  });

  // 🔥 CONFIG posisi lama (INI KUNCI BIAR SAMA KAYAK DULU)
  const boxes = [
    {
      d: 0.2,
      className: "top-10 left-10",
      size: "h-[300px] w-[300px] rotate-45",
    },
    {
      d: 0.3,
      className: "top-10 right-10",
      size: "h-[300px] w-[300px] -rotate-12",
    },
    {
      d: 0.1,
      className: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      size: "h-[250px] w-[250px] rotate-90",
    },
    {
      d: 0.5,
      className: "bottom-20 left-1/4",
      size: "h-[100px] w-[100px] rotate-12",
    },
    {
      d: 0.6,
      className: "bottom-20 right-1/4",
      size: "h-[100px] w-[100px] -rotate-45",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-main-blue overflow-hidden min-h-screen flex items-center justify-center p-4 relative text-white"
    >
      {/* BACKGROUND */}
      <motion.div
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: "circOut" }}
        className="absolute h-[95%] top-0 w-[95%] bg-secondary-color rounded-b-full"
      >
        {boxes.map((box, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            initial="initial"
            animate="animate"
            transition={floatingTransition(box.d)}
            className={`absolute ${box.className}`}
          >
            <VectorBlueBox className={box.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="z-10 bg-white text-black rounded-xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center"
      >
        <Logo />

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 mt-6 select-none"
        >
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className="input-form"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="input-form"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-form"
            />

            <motion.span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                {showPassword ? (
                  <motion.div
                    key="hide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaEyeSlash />
                  </motion.div>
                ) : (
                  <motion.div
                    key="show"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FaEye />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.span>
          </div>

          {/* CONFIRM */}
          <div className="relative">
            <input
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              type={showConfirm ? "text" : "password"}
              placeholder="Konfirmasi Password"
              className="input-form"
            />

            <motion.span
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </AnimatePresence>
            </motion.span>
          </div>

          <ButtonPutih
            type="submit"
            className="w-full py-3 rounded-lg font-bold"
          >
            Daftar
          </ButtonPutih>
        </form>

        <div className="mt-6 w-full">
          <Button link="/login" className="w-full py-3 rounded-lg font-bold">
            Masuk
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
