"use client"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

// 路由映射配置
const routeMap = {
  "free-tools": "Free Tools",
  "giveaway": "Giveaway",
  "export-comment": "Export Comment",
  "export-follow": "Export Follow",
  "ai-carousel-generator": "AI Carousel Generator",
  "fake-tweet-generator": "Fake Tweet Generator",
  "fake-instagram-post-generator": "Fake Instagram Post Generator",
  "fake-youtube-comment-generator": "Fake YouTube Comment Generator",
  "discord-bio-generator": "Discord Bio Generator",
  "facebook-post-generator": "Facebook Post Generator",
  "tiktok-hashtag-generator": "TikTok Hashtag Generator",
  "linkedin-hashtag-generator": "LinkedIn Hashtag Generator",
  "youtube-hashtag-generator": "YouTube Hashtag Generator",
  "instagram-caption-generator": "Instagram Caption Generator",
  "tiktok-name-generator": "TikTok Name Generator",
  "reddit-video-downloader": "Reddit Video Downloader",
  "tiktok-video-downloader": "TikTok Video Downloader",
  "linkedin-video-downloader": "LinkedIn Video Downloader",
  "audio-to-video-converter": "Audio to Video Converter",
  "instagram-giveaway-picker": "Instagram Giveaway Picker",
  "facebook-comment-picker": "Facebook Comment Picker",
  "tiktok-comment-picker": "TikTok Comment Picker",
  "twitter-picker": "Twitter Picker",
  "youtube-comment-picker": "YouTube Comment Picker",
  "instagram-comments-export": "Export Instagram Comments",
  "facebook-comments-export": "Export Facebook Comments",
  "youtube-comment-exporter": "YouTube Comment Exporter",
  "ig-follower-export": "IG Follower Export Tool",
  "tiktok-following-export": "Export TikTok Following List",
  "facebook-friends-export": "Export Facebook Friends List",
  "twitter-following-export": "Export Twitter Following List",
  "pricing": "Pricing",
  "dashboard": "Dashboard"
}

// 分类映射
const categoryMap = {
  "ai-carousel-generator": "AI生成器",
  "fake-tweet-generator": "AI生成器",
  "fake-instagram-post-generator": "AI生成器",
  "fake-youtube-comment-generator": "AI生成器",
  "discord-bio-generator": "AI生成器",
  "facebook-post-generator": "AI生成器",
  "tiktok-hashtag-generator": "标签生成器",
  "linkedin-hashtag-generator": "标签生成器",
  "youtube-hashtag-generator": "标签生成器",
  "instagram-caption-generator": "标签生成器",
  "tiktok-name-generator": "标签生成器",
  "reddit-video-downloader": "下载工具",
  "tiktok-video-downloader": "下载工具",
  "linkedin-video-downloader": "下载工具",
  "audio-to-video-converter": "下载工具"
}

export function Breadcrumb() {
  const pathname = usePathname()

  // 如果是首页，不显示面包屑
  if (pathname === "/") {
    return null
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/" }
    ]

    let currentPath = ""

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1

      // 如果是free-tools分类下的工具，需要添加子分类
      if (segments[0] === "free-tools" && segments.length === 2) {
        const toolName = segments[1]
        const category = categoryMap[toolName as keyof typeof categoryMap]

        if (category) {
          // 添加Free Tools
          breadcrumbs.push({
            label: "Free Tools",
            href: "/free-tools"
          })

          // 添加子分类
          breadcrumbs.push({
            label: category,
            href: `/free-tools#${category}`
          })
        }
      } else if (index === 0) {
        // 第一级路径
        breadcrumbs.push({
          label: routeMap[segment as keyof typeof routeMap] || segment,
          href: currentPath
        })
      }

      // 最后一级（当前页面）
      if (isLast && segments.length > 1) {
        breadcrumbs.push({
          label: routeMap[segment as keyof typeof routeMap] || segment,
          href: currentPath,
          isActive: true
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 border-b px-4 py-3"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center"
            >
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}

              {index === 0 && (
                <Home className="w-4 h-4 text-gray-500 mr-2" />
              )}

              {item.isActive ? (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.nav>
  )
}
