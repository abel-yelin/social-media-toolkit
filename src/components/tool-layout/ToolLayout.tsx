"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { ToolSidebar } from "./ToolSidebar"
import { ToolControlPanel } from "./ToolControlPanel"
import { ToolPreview } from "./ToolPreview"
import { PromoBanner } from "./PromoBanner"
import { BrandShowcase } from "./BrandShowcase"

interface ToolLayoutProps {
  currentTool?: string
  controlPanel?: ReactNode
  preview?: ReactNode
  previewTitle?: string
  previewSubtitle?: string
  showBanner?: boolean
  showBrands?: boolean
  onGenerate?: () => void
  isGenerating?: boolean
  creditsRequired?: number
  previewActions?: Array<{
    icon: LucideIcon
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }>
}

export function ToolLayout({
  currentTool,
  controlPanel,
  preview,
  previewTitle,
  previewSubtitle,
  showBanner = true,
  showBrands = true,
  onGenerate,
  isGenerating = false,
  creditsRequired = 5,
  previewActions = []
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Promotional Banner */}
      {showBanner && <PromoBanner />}

      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <ToolSidebar currentTool={currentTool} />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Control Panel */}
          <ToolControlPanel
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            creditsRequired={creditsRequired}
          >
            {controlPanel}
          </ToolControlPanel>

          {/* Preview Area */}
          <ToolPreview
            title={previewTitle}
            subtitle={previewSubtitle}
            actions={previewActions}
            isLoading={isGenerating}
          >
            {preview}
          </ToolPreview>
        </div>
      </div>

      {/* Brand Showcase */}
      {showBrands && <BrandShowcase />}
    </div>
  )
}

// Simplified layout for tools that don't need control panels
export function SimpleToolLayout({
  currentTool,
  children,
  title,
  subtitle,
  showBanner = true,
  showBrands = true
}: {
  currentTool?: string
  children: ReactNode
  title?: string
  subtitle?: string
  showBanner?: boolean
  showBrands?: boolean
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {showBanner && <PromoBanner />}

      <div className="flex-1 flex">
        <ToolSidebar currentTool={currentTool} />

        <div className="flex-1 bg-gray-900 p-6">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>}
              {subtitle && <p className="text-gray-400">{subtitle}</p>}
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-6 min-h-[400px]">
            {children}
          </div>
        </div>
      </div>

      {showBrands && <BrandShowcase />}
    </div>
  )
}
