"use client"

import { type ReactNode, useState } from "react"
import type { LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Copy, Share, Eye, RefreshCw } from "lucide-react"

interface PreviewAction {
  icon: LucideIcon
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

interface ToolPreviewProps {
  title?: string
  subtitle?: string
  children: ReactNode
  actions?: PreviewAction[]
  isLoading?: boolean
  placeholder?: ReactNode
  className?: string
}

export function ToolPreview({
  title,
  subtitle,
  children,
  actions = [],
  isLoading = false,
  placeholder,
  className = ""
}: ToolPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const defaultActions: PreviewAction[] = [
    { icon: Copy, label: "Copy", onClick: () => {}, variant: 'secondary' },
    { icon: Download, label: "Download", onClick: () => {}, variant: 'secondary' },
    { icon: Share, label: "Share", onClick: () => {}, variant: 'secondary' },
  ]

  const allActions = [...actions, ...defaultActions]

  return (
    <div className={`flex-1 bg-gray-900 flex flex-col ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="p-6 border-b border-gray-700">
          {title && <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      )}

      {/* Preview Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-gray-900"
            >
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Generating your content...</p>
              </div>
            </motion.div>
          ) : children ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 p-6"
            >
              {children}
            </motion.div>
          ) : placeholder ? (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {placeholder}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center text-gray-500">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8" />
                </div>
                <p>Preview will appear here</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen Toggle */}
        {!isLoading && children && (
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Actions Bar */}
      {allActions.length > 0 && !isLoading && children && (
        <div className="p-6 border-t border-gray-700 bg-gray-850">
          <div className="flex items-center justify-center space-x-3">
            {allActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={action.onClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  action.variant === 'primary'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Specialized preview components
export function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
      />
    </div>
  )
}

export function TextPreview({ content }: { content: string }) {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto shadow-lg">
        <div className="prose prose-gray max-w-none">
          <div className="whitespace-pre-wrap text-gray-900">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

export function VideoPreview({ src }: { src: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        src={src}
        controls
        className="max-w-full max-h-full rounded-lg shadow-lg"
      />
    </div>
  )
}
