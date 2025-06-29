"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

// Particle component for floating effects
function Particle({ delay = 0 }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"
      initial={{
        x: Math.random() * 800,
        y: Math.random() * 600,
        scale: Math.random() * 0.5 + 0.5
      }}
      animate={{
        x: Math.random() * 800,
        y: Math.random() * 600,
        scale: Math.random() * 1 + 0.5,
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "linear"
      }}
    />
  )
}

// Floating social icon component
function FloatingSocialIcon({
  icon,
  color,
  position,
  delay = 0,
  size = "w-12 h-12"
}: {
  icon: string
  color: string
  position: string
  delay?: number
  size?: string
}) {
  return (
    <motion.div
      className={`absolute ${position} ${size} ${color} rounded-full flex items-center justify-center shadow-lg cursor-pointer`}
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: 1,
        rotate: [0, 5, -5, 0],
        y: [0, -10, 0]
      }}
      transition={{
        scale: { delay, duration: 0.5, type: "spring" },
        rotate: {
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay + 1
        },
        y: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: delay + 0.5
        }
      }}
      whileHover={{
        scale: 1.2,
        rotate: 360,
        transition: { duration: 0.3 }
      }}
    >
      <span className="text-white text-sm font-bold">{icon}</span>
    </motion.div>
  )
}

// Floating stars component
function FloatingStars() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          /* biome-ignore lint/suspicious/noArrayIndexKey: Static particle array */
          key={`particle-${i}`}
          className="absolute text-green-400 text-xl opacity-70 pointer-events-none"
          initial={{
            x: Math.random() * 600,
            y: Math.random() * 500,
            scale: 0,
            rotate: 0
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            x: Math.random() * 600,
            y: Math.random() * 500,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2 + 1
          }}
        >
          ✨
        </motion.div>
      ))}
    </>
  )
}

export function EnhancedHero() {
  const [particles, setParticles] = useState<number[]>([])

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => i))
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-blue-100/20 to-purple-200/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
          ]
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              className="text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% auto" }}
              >
                Comment
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Made
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Easy
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              EasyComment provides users with a series of social media and comment services such as{" "}
              <motion.span
                className="font-semibold text-purple-600"
                whileHover={{ scale: 1.05 }}
              >
                giveaway picker
              </motion.span>,{" "}
              <motion.span
                className="font-semibold text-blue-600"
                whileHover={{ scale: 1.05 }}
              >
                ai comment generator
              </motion.span>,{" "}
              <motion.span
                className="font-semibold text-green-600"
                whileHover={{ scale: 1.05 }}
              >
                ai post generator
              </motion.span>,{" "}
              <motion.span
                className="font-semibold text-pink-600"
                whileHover={{ scale: 1.05 }}
              >
                ai comment summary
              </motion.span>,{" "}
              <motion.span
                className="font-semibold text-indigo-600"
                whileHover={{ scale: 1.05 }}
              >
                mockup generation
              </motion.span>, etc.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg">
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    ⚡
                  </motion.span>
                  <span className="ml-2">QUICK START</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Enhanced Mockup */}
          <div className="relative">
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Concentric Circles with Animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-30"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="w-60 h-60 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-40"
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Central Speech Bubble */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                transition={{
                  scale: { delay: 0.5, type: "spring", stiffness: 200 },
                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(147, 51, 234, 0.3)",
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                      "0 10px 30px rgba(147, 51, 234, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-white font-bold text-xl">E</span>
                </motion.div>
              </motion.div>

              {/* Enhanced Floating Social Icons */}
              <FloatingSocialIcon
                icon="f"
                color="bg-blue-500"
                position="top-8 left-1/2 transform -translate-x-1/2"
                delay={0.2}
              />
              <FloatingSocialIcon
                icon="🐦"
                color="bg-blue-400"
                position="top-16 right-12"
                delay={0.4}
              />
              <FloatingSocialIcon
                icon="📷"
                color="bg-gradient-to-r from-pink-500 to-orange-400"
                position="right-8 top-1/2 transform -translate-y-1/2"
                delay={0.6}
              />
              <FloatingSocialIcon
                icon="🎵"
                color="bg-black"
                position="bottom-16 right-12"
                delay={0.8}
              />
              <FloatingSocialIcon
                icon="▶"
                color="bg-red-600"
                position="bottom-8 left-1/2 transform -translate-x-1/2"
                delay={1.0}
              />
              <FloatingSocialIcon
                icon="🎮"
                color="bg-red-500"
                position="left-8 top-1/2 transform -translate-y-1/2"
                delay={1.2}
              />
              <FloatingSocialIcon
                icon="💬"
                color="bg-purple-600"
                position="top-16 left-12"
                delay={1.4}
              />
              <FloatingSocialIcon
                icon="🌟"
                color="bg-green-500"
                position="bottom-16 left-12"
                delay={1.6}
              />

              {/* Central Mockup Card */}
              <motion.div
                className="relative z-20 -mr-16 mt-8"
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                animate={{ opacity: 1, y: 0, rotateY: 3 }}
                transition={{ delay: 1.8, duration: 1, type: "spring" }}
                whileHover={{
                  rotateY: 0,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="bg-white rounded-lg shadow-2xl p-4 max-w-xs"
                  animate={{
                    boxShadow: [
                      "0 25px 50px rgba(0, 0, 0, 0.1)",
                      "0 25px 50px rgba(147, 51, 234, 0.2)",
                      "0 25px 50px rgba(0, 0, 0, 0.1)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.img
                    src="https://ext.same-assets.com/3165006027/3189876061.webp"
                    alt="User"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                    whileHover={{ scale: 1.02 }}
                  />
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <motion.div
                          /* biome-ignore lint/suspicious/noArrayIndexKey: Static star rating array */
                          key={`star-${i}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 2 + i * 0.1 }}
                        >
                          <Star className="w-3 h-3 fill-red-500 text-red-500" />
                        </motion.div>
                      ))}
                    </div>
                    <motion.span
                      className="text-xs text-gray-600"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      453 likes
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Giveaway Picker Badge */}
              <motion.div
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30"
                initial={{ opacity: 0, x: 50, scale: 0 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg border-2 border-orange-200"
                  animate={{
                    y: [0, -5, 0],
                    boxShadow: [
                      "0 5px 15px rgba(251, 146, 60, 0.3)",
                      "0 8px 25px rgba(251, 146, 60, 0.4)",
                      "0 5px 15px rgba(251, 146, 60, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  Giveaway Picker
                </motion.div>
              </motion.div>

              {/* Enhanced Floating Stars */}
              <FloatingStars />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
