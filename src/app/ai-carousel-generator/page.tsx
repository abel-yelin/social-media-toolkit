"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout/ToolLayout"
import { ControlSection, ToggleSwitch, ButtonGroup, NumberSelector } from "@/components/tool-layout/ToolControlPanel"
import { ImagePreview } from "@/components/tool-layout/ToolPreview"
import { Copy, Download, Share, Sparkles, Image as ImageIcon, Palette } from "lucide-react"

export default function AICarouselGenerator() {
  // State for form controls
  const [topic, setTopic] = useState("Digital Marketing Tips")
  const [style, setStyle] = useState("modern")
  const [colorScheme, setColorScheme] = useState("blue")
  const [slideCount, setSlideCount] = useState(5)
  const [includeText, setIncludeText] = useState(true)
  const [includeIcons, setIncludeIcons] = useState(true)
  const [resolution, setResolution] = useState("1080x1080")
  const [format, setFormat] = useState("instagram")
  const [language, setLanguage] = useState("chinese")

  // State for generation
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCarousel, setGeneratedCarousel] = useState<string[] | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Generate mock carousel slides
    const mockSlides = Array.from({ length: slideCount }, (_, i) =>
      `https://picsum.photos/600/600?random=${i + 1}&blur=1`
    )

    setGeneratedCarousel(mockSlides)
    setCurrentSlide(0)
    setIsGenerating(false)
  }

  const previewActions = [
    {
      icon: Download,
      label: "Download All",
      onClick: () => console.log("Download carousel"),
      variant: 'primary' as const
    },
    {
      icon: Copy,
      label: "Copy Current",
      onClick: () => console.log("Copy current slide"),
      variant: 'secondary' as const
    },
    {
      icon: Share,
      label: "Share",
      onClick: () => console.log("Share carousel"),
      variant: 'secondary' as const
    }
  ]

  const controlPanel = (
    <div className="space-y-6">
      {/* Content Settings */}
      <ControlSection
        title="内容设置"
        description="定义轮播图的主题和内容"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              主题内容
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入轮播图主题..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              语言
            </label>
            <ButtonGroup
              options={["chinese", "english"]}
              selected={language}
              onChange={setLanguage}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              幻灯片数量
            </label>
            <NumberSelector
              value={slideCount}
              onChange={setSlideCount}
              min={3}
              max={10}
              options={[3, 5, 7, 10]}
            />
          </div>
        </div>
      </ControlSection>

      {/* Design Settings */}
      <ControlSection
        title="设计风格"
        description="选择视觉样式和配色"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Palette className="inline w-4 h-4 mr-1" />
              设计风格
            </label>
            <ButtonGroup
              options={["modern", "minimal", "creative", "professional"]}
              selected={style}
              onChange={setStyle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              配色方案
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["blue", "purple", "green", "orange", "pink", "gray"].map((color) => (
                <button
                  key={color}
                  onClick={() => setColorScheme(color)}
                  className={`p-2 rounded-md text-sm transition-colors ${
                    colorScheme === color
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ControlSection>

      {/* Format Settings */}
      <ControlSection
        title="输出格式"
        description="设置图片尺寸和格式"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              平台格式
            </label>
            <ButtonGroup
              options={["instagram", "linkedin", "facebook"]}
              selected={format}
              onChange={setFormat}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              分辨率
            </label>
            <ButtonGroup
              options={["1080x1080", "1200x1200", "1080x1350"]}
              selected={resolution}
              onChange={setResolution}
            />
          </div>
        </div>
      </ControlSection>

      {/* Advanced Options */}
      <ControlSection
        title="高级选项"
        description="自定义额外的设计元素"
      >
        <div className="space-y-3">
          <ToggleSwitch
            enabled={includeText}
            onChange={setIncludeText}
            label="包含文字说明"
          />

          <ToggleSwitch
            enabled={includeIcons}
            onChange={setIncludeIcons}
            label="添加图标装饰"
          />
        </div>
      </ControlSection>
    </div>
  )

  const preview = generatedCarousel ? (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      {/* Current Slide Display */}
      <div className="relative">
        <div className="w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Mock Carousel Slide */}
          <div className="w-full h-full relative">
            <img
              src={generatedCarousel[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-bold mb-1">{topic}</h3>
              <p className="text-sm opacity-90">Slide {currentSlide + 1} of {slideCount}</p>
            </div>
            {includeIcons && (
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Slide Indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-3 py-1">
          <span className="text-white text-xs">
            {currentSlide + 1} / {slideCount}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
          disabled={currentSlide === 0}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>

        <div className="flex space-x-1">
          {generatedCarousel.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(Math.min(slideCount - 1, currentSlide + 1))}
          disabled={currentSlide === slideCount - 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-2 overflow-x-auto max-w-full pb-2">
        {generatedCarousel.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              index === currentSlide ? 'border-blue-500' : 'border-gray-600'
            }`}
          >
            <img
              src={slide}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  ) : null

  return (
    <ToolLayout
      currentTool="AI Carousel Generator"
      controlPanel={controlPanel}
      preview={preview}
      previewTitle="AI Carousel Preview"
      previewSubtitle="Create stunning carousel posts for social media platforms"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      creditsRequired={8}
      previewActions={previewActions}
    />
  )
}
