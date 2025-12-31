"use client"

import { motion } from "framer-motion"

export default function GameStormLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-14 h-14 rounded-full border-4 border-emerald-500 border-t-transparent shadow-[0_0_24px_rgba(16,185,129,0.8)]"
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
        className="ml-3 text-emerald-400 tracking-wide"
      >
        Loading…
      </motion.span>
    </div>
  );
}
