"use client";

import { FaUser, FaBook, FaPlus, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavAdmin({
  onAddClick,
  isFormOpen,
}: {
  onAddClick?: () => void;
  isFormOpen?: boolean;
}) {
  const pathname = usePathname();

  const menuItems = [
    { id: 1, icon: <FaUser size={18} />, link: "/admin" },
    { id: 2, icon: <FaBook size={18} />, link: "/admin/pameran" },
  ];

  return (
    <motion.div
      className="fixed z-50 left-1/2 -translate-x-1/2 bottom-0 w-fit h-[100px] flex items-end"
      initial="hidden"
      whileHover="visible"
      animate="hidden"
    >
      <motion.div
        variants={{
          hidden: { y: "60%", scale: 0.9 },
          visible: { y: "0%", scale: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="bg-main-blue px-5 pt-5 pb-3 flex items-center gap-4 rounded-t-[30px] shadow-2xl">

          {/* MENU */}
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.link);

            return (
              <div key={item.id} className="relative w-12 h-12">

                {/* BACKGROUND ACTIVE */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* ICON */}
                <div
                  className={`relative z-10 w-full h-full flex items-center justify-center rounded-full transition
                    ${isActive
                      ? "text-main-blue"
                      : "text-white border border-white/30 hover:bg-white/10"
                    }`}
                >
                  {item.icon}
                </div>
              </div>
            );
          })}

          {/* DIVIDER */}
          <div className="w-[1px] h-8 bg-white/20" />

          {/* ➕ / ❌ BUTTON */}
          <motion.div
            onClick={onAddClick}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-main-blue cursor-pointer relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isFormOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaPlus size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}