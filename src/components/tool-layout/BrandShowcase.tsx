"use client"

import { motion } from "framer-motion"

const brands = [
  "Microsoft", "Google", "Meta", "Amazon",
  "Apple", "Netflix", "Spotify", "Adobe"
]

interface BrandShowcaseProps {
  title?: string
  className?: string
  variant?: 'light' | 'dark'
}

export function BrandShowcase({
  title = "Trusted by 1,000+ Social Media Influencers",
  className = "",
  variant = 'dark'
}: BrandShowcaseProps) {
  const isDark = variant === 'dark'

  return (
    <div className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-2xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            {title}
          </motion.h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center justify-center h-16 px-4 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <span className={`font-semibold text-lg ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
