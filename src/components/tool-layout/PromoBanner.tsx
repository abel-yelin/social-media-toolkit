"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Sparkles, Gift, Zap } from "lucide-react"

interface PromoBannerProps {
  variant?: 'gradient' | 'solid'
  dismissible?: boolean
  autoHide?: boolean
  duration?: number
}

export function PromoBanner({
  variant = 'gradient',
  dismissible = true,
  autoHide = false,
  duration = 5000
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  // Auto hide after duration
  if (autoHide && duration) {
    setTimeout(() => setIsVisible(false), duration)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className={`relative overflow-hidden ${
          variant === 'gradient'
            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500'
            : 'bg-blue-600'
        }`}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
              }}
            />
          ))}
        </div>

        <div className="relative px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="flex items-center space-x-3 text-white">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>

              <div className="flex items-center space-x-2 text-sm md:text-base font-medium">
                <span>Enjoy Limited-Time</span>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="text-yellow-300 font-bold"
                >
                  50% OFF!
                </motion.span>
                <Gift className="h-4 w-4" />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
              >
                Get Offer
              </motion.button>
            </div>

            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 p-1 text-white/70 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Alternative banner variants
export function AnnouncementBanner({ message, type = 'info' }: {
  message: string;
  type?: 'info' | 'success' | 'warning'
}) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const colors = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600'
  }

  const icons = {
    info: Sparkles,
    success: Gift,
    warning: Zap
  }

  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${colors[type]} text-white py-2 px-4`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4" />
          <span className="text-sm">{message}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}
