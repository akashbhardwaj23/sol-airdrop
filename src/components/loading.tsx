"use client";

import { motion } from "framer-motion";

export default function Loader(
  {loading}:
  {
    loading : Boolean
  }
) {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="relative w-full flex flex-col items-center">
        {/* Main loader container */}
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-8 h-8">
            <motion.div className="absolute inset-0 rounded-full border-2 border-gray-100 dark:border-gray-800" />

            {/* Progress circle */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                strokeWidth="4"
                stroke="currentColor"
                strokeLinecap="round"
                className="text-black dark:text-white"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{
                  rotate: loading ? -90 : -90,
                }}
                transition={{
                  pathLength: { type: "spring", stiffness: 60, damping: 12 },
                  rotate: { duration: 1 },
                }}
                style={{
                  transformOrigin: "center",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <motion.div
                      className="w-2 h-2 bg-black dark:bg-white rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
