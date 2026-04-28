"use client";
import Link from "next/link";
import { FaUser, FaBook, FaPlus, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface AddOn{
  onAddClick? : ()=>void,
  isFormOpen? : boolean,
}
export default function NavAdmin({ onAddClick, isFormOpen }: AddOn) {
  const pathname = usePathname();

  const menuItems = [
    { id: 1, icon: <FaUser className="rounded-full" size={18} />, link: "/admin/pengguna" },
    { id: 2, icon: <FaBook size={18} />, link: "/admin/pameran"},
  ];

  return (
    <motion.div
      className="
        fixed z-50 
        left-1/2 -translate-x-1/2 
        bottom-4 md:bottom-0 
        w-fit flex items-end
      "
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      initial="hidden"
      whileHover="visible"
      animate="hidden"
    >
      <motion.div
        variants={{
          hidden: { y: "60%", scale: 0.95 },
          visible: { y: "0%", scale: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className="
            bg-main-blue 
            px-3 md:px-5 
            pt-3 md:pt-5 
            pb-2 md:pb-3 
            flex items-center 
            gap-2 md:gap-4 
            rounded-[20px] md:rounded-t-[30px] 
            shadow-2xl
          "
        >
          {/* MENU */}
          {menuItems.map((item) => {
            const isActive =
              pathname === item.link || pathname.startsWith(item.link + "/");

            return (
              <div key={item.id} className="relative w-9 h-9 md:w-12 md:h-12">
                
                {/* ACTIVE BACKGROUND */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* ICON */}
                <Link
                  href={item.link}
                  className={`relative z-10 w-full h-full flex items-center justify-center rounded-full transition
                    ${
                      isActive
                        ? "text-main-blue"
                        : "text-white border border-white/30 hover:bg-white/10"
                    }`}
                >
                  {item.icon}
                </Link>
              </div>
            );
          })}

          {/* DIVIDER */}
          <div className="w-[1px] h-5 md:h-8 bg-white/20" />

          {/* BUTTON */}
          <motion.div
            onClick={onAddClick}
            whileTap={{ scale: 0.9 }}
            className="
              w-9 h-9 md:w-12 md:h-12
              flex items-center justify-center
              bg-white rounded-full text-main-blue
              cursor-pointer relative overflow-hidden
            "
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
                  <FaTimes size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaPlus size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}