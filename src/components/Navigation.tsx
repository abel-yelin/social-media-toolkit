"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Menu,
  ChevronDown,
  ExternalLink,
  User,
  LogOut,
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
  Bot
} from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const navigationItems = [
  {
    title: "Export Follow",
    items: [
      { name: "IG Follower Export Tool", href: "/ig-follower-export" },
      { name: "Export TikTok Following List", href: "/tiktok-following-export" },
      { name: "Export Facebook Friends List", href: "/facebook-friends-export" },
      { name: "Export Twitter Following List", href: "/twitter-following-export" }
    ]
  },
  {
    title: "Export Comment",
    items: [
      { name: "Export Instagram Comments", href: "/instagram-comments-export" },
      { name: "Export Facebook Comments", href: "/facebook-comments-export" },
      { name: "YouTube Comment Exporter", href: "/youtube-comment-exporter" }
    ]
  },
  {
    title: "Giveaway",
    items: [
      { name: "Instagram Giveaway Picker", href: "/instagram-giveaway-picker" },
      { name: "Facebook Comment Picker", href: "/facebook-comment-picker" },
      { name: "TikTok Comment Picker", href: "/tiktok-comment-picker" },
      { name: "Twitter Picker", href: "/twitter-picker" },
      { name: "YouTube Comment Picker", href: "/youtube-comment-picker" }
    ]
  },
  {
    title: "Free Tools",
    isToolbox: true,
    categories: [
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
  }
]

export function Navigation() {
  const { data: session, status } = useSession()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b px-4 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Menu className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 shadow-md">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                AI <span className="text-purple-600">Comments</span>
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.button
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer py-2"
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>{item.title}</span>
                <motion.div
                  animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === item.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 ${item.isToolbox ? 'w-96' : 'w-64'}`}
                  >
                    {item.isToolbox ? (
                      // Enhanced Free Tools menu with categories
                      <div className="grid grid-cols-1 gap-4 p-3">
                        {item.categories.map((category, categoryIndex) => (
                          <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2 px-2 py-1 bg-gray-50 rounded-md">
                              <category.icon className="h-4 w-4 text-blue-600" />
                              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                {category.title}
                              </h4>
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                              {category.tools.map((tool, toolIndex) => (
                                <motion.div
                                  key={tool.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: categoryIndex * 0.1 + toolIndex * 0.05 }}
                                >
                                  <Link
                                    href={tool.href}
                                    className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all duration-200 group"
                                  >
                                    <tool.icon className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                    <span className="flex-1">{tool.name}</span>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      // Regular menu items
                      item.items?.map((subItem, index) => (
                        <motion.div
                          key={subItem.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={subItem.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                          >
                            <span>{subItem.name}</span>
                            {(subItem as { external?: boolean }).external && (
                              <ExternalLink className="h-3 w-3 opacity-50" />
                            )}
                          </Link>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link
            href="/pricing"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : session ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-gray-700">{session.user.name || session.user.email}</span>
              </div>
              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  LOGIN
                </Button>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/signin">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    SIGN UP
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="py-4 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="font-semibold text-gray-900 px-4">{item.title}</h3>
                  {item.isToolbox ? (
                    // Enhanced mobile tools menu
                    <div className="px-2 space-y-3">
                      {item.categories.map((category) => (
                        <div key={category.title} className="space-y-1">
                          <div className="flex items-center space-x-2 px-4 py-1 bg-gray-50 rounded-md mx-2">
                            <category.icon className="h-3 w-3 text-blue-600" />
                            <h5 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                              {category.title}
                            </h5>
                          </div>
                          {category.tools.map((tool) => (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              className="flex items-center space-x-3 px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md mx-2 transition-colors"
                            >
                              <tool.icon className="h-3 w-3 text-gray-400" />
                              <span>{tool.name}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Regular mobile menu items
                    item.items?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        {subItem.name}
                      </Link>
                    ))
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
