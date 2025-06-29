"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ControlSectionProps {
  title: string
  children: ReactNode
  description?: string
}

function ControlSection({ title, children, description }: ControlSectionProps) {
  return (
    <div className="mb-6">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-200 mb-1">{title}</h3>
        {description && (
          <p className="text-xs text-gray-400">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

interface ToggleSwitchProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
}

function ToggleSwitch({ enabled, onChange, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <motion.span
          animate={{ x: enabled ? 20 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block h-3 w-3 transform rounded-full bg-white"
        />
      </button>
    </div>
  )
}

interface ButtonGroupProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
}

function ButtonGroup({ options, selected, onChange }: ButtonGroupProps) {
  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-3 py-2 text-sm rounded-md transition-colors ${
            selected === option
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

interface NumberSelectorProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  options?: number[]
}

function NumberSelector({ value, onChange, min, max, options }: NumberSelectorProps) {
  if (options) {
    return (
      <div className="flex space-x-2">
        {options.map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`w-10 h-10 rounded-md text-sm transition-colors ${
              value === num
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    )
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
    />
  )
}

interface ToolControlPanelProps {
  children?: ReactNode
  onGenerate?: () => void
  isGenerating?: boolean
  creditsRequired?: number
}

export function ToolControlPanel({
  children,
  onGenerate,
  isGenerating = false,
  creditsRequired = 0
}: ToolControlPanelProps) {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      {/* Control Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>

      {/* Generate Button */}
      <div className="p-6 border-t border-gray-700 bg-gray-850">
        {creditsRequired > 0 && (
          <div className="mb-3 flex items-center text-xs text-gray-400">
            <span className="inline-block w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
            Credits required: {creditsRequired}
          </div>
        )}

        <motion.button
          onClick={onGenerate}
          disabled={isGenerating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isGenerating
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>✨</span>
              <span>Generate</span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  )
}

// Export sub-components for use in specific tools
export { ControlSection, ToggleSwitch, ButtonGroup, NumberSelector }
