"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout/ToolLayout"
import { ControlSection, ToggleSwitch, ButtonGroup } from "@/components/tool-layout/ToolControlPanel"
import { TextPreview } from "@/components/tool-layout/ToolPreview"
import { Copy, Download, Share, Twitter } from "lucide-react"

export default function FakeTweetGenerator() {
  // State for form controls
  const [username, setUsername] = useState("@elonmusk")
  const [displayName, setDisplayName] = useState("Elon Musk")
  const [content, setContent] = useState("Just launched a new feature for the people 🚀")
  const [verified, setVerified] = useState(true)
  const [likes, setLikes] = useState("127.3K")
  const [retweets, setRetweets] = useState("45.8K")
  const [replies, setRetweets2] = useState("12.1K")
  const [theme, setTheme] = useState("dark")

  // State for generation
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTweet, setGeneratedTweet] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate fake tweet HTML/image
    setGeneratedTweet(`Generated tweet for ${displayName}`)
    setIsGenerating(false)
  }

  const previewActions = [
    {
      icon: Copy,
      label: "Copy Image",
      onClick: () => console.log("Copy tweet image"),
      variant: 'primary' as const
    },
    {
      icon: Download,
      label: "Download PNG",
      onClick: () => console.log("Download tweet"),
      variant: 'secondary' as const
    },
    {
      icon: Share,
      label: "Share",
      onClick: () => console.log("Share tweet"),
      variant: 'secondary' as const
    }
  ]

  const controlPanel = (
    <div className="space-y-6">
      {/* User Info Section */}
      <ControlSection
        title="用户信息"
        description="设置推文作者信息"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              显示名称
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Elon Musk"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="@elonmusk"
            />
          </div>

          <ToggleSwitch
            enabled={verified}
            onChange={setVerified}
            label="认证账户"
          />
        </div>
      </ControlSection>

      {/* Tweet Content */}
      <ControlSection
        title="推文内容"
        description="编写推文文字内容"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="What's happening?"
        />
        <div className="text-xs text-gray-400 mt-1">
          {280 - content.length} characters remaining
        </div>
      </ControlSection>

      {/* Engagement Stats */}
      <ControlSection
        title="互动数据"
        description="设置点赞、转发、回复数量"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              点赞数
            </label>
            <input
              type="text"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="127.3K"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              转发数
            </label>
            <input
              type="text"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="45.8K"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              回复数
            </label>
            <input
              type="text"
              value={replies}
              onChange={(e) => setRetweets2(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12.1K"
            />
          </div>
        </div>
      </ControlSection>

      {/* Theme Selection */}
      <ControlSection
        title="主题样式"
        description="选择推文显示主题"
      >
        <ButtonGroup
          options={["dark", "light"]}
          selected={theme}
          onChange={setTheme}
        />
      </ControlSection>
    </div>
  )

  const preview = generatedTweet ? (
    <div className="w-full h-full flex items-center justify-center">
      {/* Mock Twitter Post Preview */}
      <div className={`max-w-lg w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-xl p-6 shadow-xl border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {displayName.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {displayName}
              </span>
              {verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {username}
              </span>
            </div>
            <div className={`mt-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {content}
            </div>
            <div className={`flex items-center space-x-6 mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              <div className="flex items-center space-x-1">
                <span>💬</span>
                <span className="text-sm">{replies}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🔄</span>
                <span className="text-sm">{retweets}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>❤️</span>
                <span className="text-sm">{likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <ToolLayout
      currentTool="Fake Tweet Generator"
      controlPanel={controlPanel}
      preview={preview}
      previewTitle="Twitter Post Preview"
      previewSubtitle="Generate realistic-looking fake tweets for design mockups"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      creditsRequired={3}
      previewActions={previewActions}
    />
  )
}
