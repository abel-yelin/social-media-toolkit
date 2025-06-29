"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Download,
  Hash,
  FileText,
  Video,
  Music,
  Linkedin,
  Facebook,
  Bot,
  Home,
  ArrowLeft
} from "lucide-react"

const toolCategories = [
  {
    title: "AI生成器",
    icon: Bot,
    tools: [
      { name: "AI Carousel Generator", href: "/ai-carousel-generator", icon: Sparkles },
      { name: "Fake Tweet Generator", href: "/fake-tweet-generator", icon: Twitter },
      { name: "Fake Instagram Post Generator", href: "/fake-instagram-post", icon: Instagram },
      { name: "Fake YouTube Comment Generator", href: "/fake-youtube-comment", icon: Youtube },
      { name: "TikTok Comment Generator", href: "/tiktok-comment-generator", icon: MessageCircle },
      { name: "Discord Bio Generator", href: "/discord-bio-generator", icon: MessageCircle },
      { name: "Facebook Post Generator", href: "/facebook-post-generator", icon: Facebook }
    ]
  },
  {
    title: "标签生成器",
    icon: Hash,
    tools: [
      { name: "TikTok Hashtag Generator", href: "/tiktok-hashtag-generator", icon: Hash },
      { name: "LinkedIn Hashtag Generator", href: "/linkedin-hashtag-generator", icon: Hash },
      { name: "YouTube Hashtag Generator", href: "/youtube-hashtag-generator", icon: Hash },
      { name: "Instagram Caption Generator", href: "/instagram-caption-generator", icon: FileText },
      { name: "TikTok Name Generator", href: "/tiktok-name-generator", icon: FileText }
    ]
  },
  {
    title: "下载工具",
    icon: Download,
    tools: [
      { name: "Reddit Video Downloader", href: "/reddit-video-downloader", icon: Download },
      { name: "TikTok Video Downloader", href: "/tiktok-video-downloader", icon: Video },
      { name: "LinkedIn Video Downloader", href: "/linkedin-video-downloader", icon: Video },
      { name: "Audio to Video Converter", href: "/audio-to-video-converter", icon: Music }
    ]
  }
]

interface ToolSidebarProps {
  currentTool?: string
}

export function ToolSidebar({ currentTool }: ToolSidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <Home className="h-4 w-4" />
          <span className="text-sm">回到首页</span>
        </Link>
      </div>

      {/* Tool Categories */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Free Tools
          </h2>
        </div>

        {toolCategories.map((category) => (
          <div key={category.title} className="mb-2">
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.title ? null : category.title
              )}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <category.icon className="h-4 w-4" />
                <span>{category.title}</span>
              </div>
              <motion.div
                animate={{ rotate: expandedCategory === category.title ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500"
              >
                ▶
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: expandedCategory === category.title ? "auto" : 0,
                opacity: expandedCategory === category.title ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-1">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className={`flex items-center space-x-3 px-6 py-2 text-sm transition-colors ${
                      currentTool === tool.name
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <tool.icon className="h-3 w-3" />
                    <span className="truncate">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 text-center">
          <div className="mb-2">EasyComment Tools</div>
          <div>Powered by AI</div>
        </div>
      </div>
    </div>
  )
}
