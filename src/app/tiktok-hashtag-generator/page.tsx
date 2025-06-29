"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout/ToolLayout"
import { ControlSection, ToggleSwitch, ButtonGroup } from "@/components/tool-layout/ToolControlPanel"
import { TextPreview } from "@/components/tool-layout/ToolPreview"
import { Hash, TrendingUp, Users, Target, Copy, Download, Share } from "lucide-react"
import { motion } from "framer-motion"

export default function TikTokHashtagGenerator() {
  // State for form controls
  const [videoDescription, setVideoDescription] = useState("")
  const [niche, setNiche] = useState("general")
  const [targetAudience, setTargetAudience] = useState("all")
  const [hashtagCount, setHashtagCount] = useState("20")
  const [includePopular, setIncludePopular] = useState(true)
  const [includeNiche, setIncludeNiche] = useState(true)
  const [includeTrending, setIncludeTrending] = useState(true)

  // State for generation
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([])
  const [hashtagStats, setHashtagStats] = useState<Array<{hashtag: string, popularity: string, difficulty: string}>>([])

  // Popular hashtag categories
  const niches = [
    { value: "general", label: "General" },
    { value: "dance", label: "Dance" },
    { value: "comedy", label: "Comedy" },
    { value: "beauty", label: "Beauty & Fashion" },
    { value: "food", label: "Food & Cooking" },
    { value: "fitness", label: "Fitness & Health" },
    { value: "education", label: "Education" },
    { value: "tech", label: "Technology" },
    { value: "music", label: "Music" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" }
  ]

  const audiences = [
    { value: "all", label: "All Ages" },
    { value: "teens", label: "Teens (13-17)" },
    { value: "young-adults", label: "Young Adults (18-24)" },
    { value: "adults", label: "Adults (25-34)" },
    { value: "parents", label: "Parents" }
  ]

  const counts = [
    { value: "10", label: "10 hashtags" },
    { value: "20", label: "20 hashtags" },
    { value: "30", label: "30 hashtags" }
  ]

  // Simulated hashtag database
  const hashtagDatabase = {
    general: ["#fyp", "#foryou", "#viral", "#trending", "#tiktokmademebuyit", "#vibes", "#mood", "#aesthetic"],
    dance: ["#dance", "#dancechallenge", "#choreography", "#dancer", "#dancing", "#dancevideo", "#moves", "#rhythm"],
    comedy: ["#funny", "#comedy", "#humor", "#laugh", "#joke", "#meme", "#hilarious", "#entertainment"],
    beauty: ["#beauty", "#makeup", "#skincare", "#beautytips", "#makeuptutorial", "#glowup", "#beautyhacks", "#selfcare"],
    food: ["#food", "#cooking", "#recipe", "#foodie", "#delicious", "#homemade", "#chef", "#foodhacks"],
    fitness: ["#fitness", "#workout", "#gym", "#health", "#exercise", "#fitnessmotivation", "#cardio", "#strength"],
    education: ["#education", "#learning", "#study", "#knowledge", "#facts", "#science", "#history", "#tips"],
    tech: ["#tech", "#technology", "#gadgets", "#innovation", "#coding", "#ai", "#programming", "#digital"],
    music: ["#music", "#song", "#singing", "#musician", "#cover", "#original", "#beats", "#melody"],
    lifestyle: ["#lifestyle", "#daily", "#routine", "#selfcare", "#motivation", "#inspiration", "#goals", "#mindset"],
    travel: ["#travel", "#adventure", "#explore", "#wanderlust", "#vacation", "#trip", "#nature", "#beautiful"]
  }

  const popularHashtags = ["#fyp", "#foryou", "#viral", "#trending", "#tiktok", "#love", "#follow", "#like", "#share", "#comment"]

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate hashtags based on selections
    const hashtags: string[] = []

    // Add niche-specific hashtags
    if (includeNiche && niche !== "general") {
      hashtags.push(...hashtagDatabase[niche as keyof typeof hashtagDatabase])
    }

    // Add general hashtags
    hashtags.push(...hashtagDatabase.general)

    // Add popular hashtags
    if (includePopular) {
      hashtags.push(...popularHashtags)
    }

    // Add trending hashtags (simulated)
    if (includeTrending) {
      const trendingHashtags = ["#trending2024", "#viral", "#fypage", "#tiktokviral", "#explore"]
      hashtags.push(...trendingHashtags)
    }

    // Remove duplicates and limit to requested count
    const uniqueHashtags = Array.from(new Set(hashtags))
    const limitedHashtags = uniqueHashtags.slice(0, Number.parseInt(hashtagCount))

    // Generate fake stats for hashtags
    const stats = limitedHashtags.map(hashtag => ({
      hashtag,
      popularity: Math.random() > 0.5 ? "High" : "Medium",
      difficulty: Math.random() > 0.7 ? "Hard" : Math.random() > 0.4 ? "Medium" : "Easy"
    }))

    setGeneratedHashtags(limitedHashtags)
    setHashtagStats(stats)
    setIsGenerating(false)
  }

  const previewActions = [
    {
      icon: Copy,
      label: "Copy Hashtags",
      onClick: () => {
        const hashtagText = generatedHashtags.join(" ")
        navigator.clipboard.writeText(hashtagText)
      },
      variant: 'primary' as const
    },
    {
      icon: Download,
      label: "Export as TXT",
      onClick: () => {
        const hashtagText = generatedHashtags.join(" ")
        const blob = new Blob([hashtagText], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'tiktok-hashtags.txt'
        a.click()
      },
      variant: 'secondary' as const
    },
    {
      icon: Share,
      label: "Share",
      onClick: () => console.log("Share hashtags"),
      variant: 'secondary' as const
    }
  ]

  const formSections = [
    {
      title: "Video Description",
      content: (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe your video content
          </label>
          <textarea
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            placeholder="e.g., Dancing to trending music, Cooking pasta recipe, Workout routine..."
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          />
        </div>
      )
    },
    {
      title: "Content Category",
      content: (
        <ButtonGroup
          options={niches.map(n => n.label)}
          selected={niches.find(n => n.value === niche)?.label || "General"}
          onChange={(label) => {
            const selectedNiche = niches.find(n => n.label === label);
            if (selectedNiche) setNiche(selectedNiche.value);
          }}
        />
      )
    },
    {
      title: "Target Audience",
      content: (
        <ButtonGroup
          options={audiences.map(a => a.label)}
          selected={audiences.find(a => a.value === targetAudience)?.label || "All Ages"}
          onChange={(label) => {
            const selectedAudience = audiences.find(a => a.label === label);
            if (selectedAudience) setTargetAudience(selectedAudience.value);
          }}
        />
      )
    },
    {
      title: "Number of Hashtags",
      content: (
        <ButtonGroup
          options={counts.map(c => c.label)}
          selected={counts.find(c => c.value === hashtagCount)?.label || "20 hashtags"}
          onChange={(label) => {
            const selectedCount = counts.find(c => c.label === label);
            if (selectedCount) setHashtagCount(selectedCount.value);
          }}
        />
      )
    },
    {
      title: "Hashtag Types",
      content: (
        <div className="space-y-3">
          <ToggleSwitch
            enabled={includePopular}
            onChange={setIncludePopular}
            label="Include Popular Hashtags"
          />
          <ToggleSwitch
            enabled={includeNiche}
            onChange={setIncludeNiche}
            label="Include Niche-Specific Hashtags"
          />
          <ToggleSwitch
            enabled={includeTrending}
            onChange={setIncludeTrending}
            label="Include Trending Hashtags"
          />
        </div>
      )
    }
  ]

  const controlPanel = (
    <div className="space-y-6">
      {formSections.map((section, index) => (
        <ControlSection
          key={index}
          title={section.title}
          description=""
        >
          {section.content}
        </ControlSection>
      ))}
    </div>
  )

  const preview = generatedHashtags.length > 0 ? (
    <div className="w-full h-full p-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Generated Hashtags</h2>
          </div>

          <div className="grid gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {generatedHashtags.map((hashtag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium"
                >
                  {hashtag}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Hashtag Analysis</h3>
            <div className="grid gap-2">
              {hashtagStats.slice(0, 10).map((stat, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">{stat.hashtag}</span>
                  <div className="flex gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      stat.popularity === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {stat.popularity}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      stat.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      stat.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {stat.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center">
        <Hash className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Generate TikTok Hashtags</h3>
        <p className="text-gray-500">Fill in the details and click Generate to create optimized hashtags for your TikTok video</p>
      </div>
    </div>
  )

  return (
    <ToolLayout
      currentTool="TikTok Hashtag Generator"
      controlPanel={controlPanel}
      preview={preview}
      previewTitle="Generated Hashtags"
      previewSubtitle="Optimized hashtags for your TikTok video"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      creditsRequired={5}
      previewActions={previewActions}
    />
  )
}
