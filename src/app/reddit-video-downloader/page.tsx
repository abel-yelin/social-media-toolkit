"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout/ToolLayout"
import { ControlSection, ToggleSwitch, ButtonGroup } from "@/components/tool-layout/ToolControlPanel"
import { VideoPreview } from "@/components/tool-layout/ToolPreview"
import { Download, Copy, Share, Video, Music, Image as ImageIcon, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

interface RedditVideoInfo {
  id: string
  title: string
  subreddit: string
  author: string
  score: number
  comments: number
  duration: string
  thumbnail: string
  videoUrl: string
  audioUrl: string
  hasAudio: boolean
}

export default function RedditVideoDownloader() {
  // State for form controls
  const [url, setUrl] = useState("")
  const [quality, setQuality] = useState("best")
  const [includeAudio, setIncludeAudio] = useState(true)
  const [downloadFormat, setDownloadFormat] = useState("mp4")

  // State for download process
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [videoInfo, setVideoInfo] = useState<RedditVideoInfo | null>(null)
  const [urlError, setUrlError] = useState("")

  const validateUrl = (inputUrl: string) => {
    const redditRegex = /^https?:\/\/(www\.)?(reddit\.com|redd\.it)/
    return redditRegex.test(inputUrl)
  }

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setUrlError("请输入Reddit视频链接")
      return
    }

    if (!validateUrl(url)) {
      setUrlError("请输入有效的Reddit视频链接")
      return
    }

    setUrlError("")
    setIsAnalyzing(true)

    // Simulate video analysis
    await new Promise(resolve => setTimeout(resolve, 2500))

    // Mock Reddit video info
    const mockVideoInfo: RedditVideoInfo = {
      id: "reddit_video_456",
      title: "Incredible skateboard trick compilation that will blow your mind! 🛹",
      subreddit: "r/nextfuckinglevel",
      author: "u/skater_pro_2024",
      score: 15600,
      comments: 892,
      duration: "01:23",
      thumbnail: "https://picsum.photos/600/400?random=2",
      videoUrl: "#reddit_video_download",
      audioUrl: "#reddit_audio_download",
      hasAudio: true
    }

    setVideoInfo(mockVideoInfo)
    setIsAnalyzing(false)
  }

  const handleDownload = async (type: 'video' | 'audio' | 'combined') => {
    if (!videoInfo) return

    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    for (let i = 0; i <= 100; i += 8) {
      await new Promise(resolve => setTimeout(resolve, 150))
      setDownloadProgress(i)
    }

    setIsDownloading(false)
    setDownloadProgress(0)
  }

  const previewActions = [
    {
      icon: Download,
      label: "Download Video",
      onClick: () => handleDownload('combined'),
      variant: 'primary' as const
    },
    {
      icon: Music,
      label: "Audio Only",
      onClick: () => handleDownload('audio'),
      variant: 'secondary' as const
    },
    {
      icon: ExternalLink,
      label: "View Post",
      onClick: () => window.open(url, '_blank'),
      variant: 'secondary' as const
    }
  ]

  const controlPanel = (
    <div className="space-y-6">
      {/* URL Input Section */}
      <ControlSection
        title="Reddit链接"
        description="输入Reddit视频帖子链接"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reddit Post URL
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  setUrlError("")
                }}
                className={`flex-1 px-3 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 ${
                  urlError ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
                }`}
                placeholder="https://www.reddit.com/r/subreddit/comments/..."
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 transition-colors"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>分析中</span>
                  </div>
                ) : (
                  "分析视频"
                )}
              </button>
            </div>
            {urlError && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {urlError}
              </p>
            )}
          </div>

          {/* URL Examples */}
          <div className="text-xs text-gray-400">
            <p className="mb-1">支持的链接格式：</p>
            <ul className="space-y-1 text-gray-500">
              <li>• https://www.reddit.com/r/subreddit/comments/...</li>
              <li>• https://old.reddit.com/r/subreddit/comments/...</li>
              <li>• https://redd.it/shortlink</li>
            </ul>
          </div>
        </div>
      </ControlSection>

      {/* Download Settings */}
      <ControlSection
        title="下载设置"
        description="选择下载质量和格式"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Video className="inline w-4 h-4 mr-1" />
              视频质量
            </label>
            <ButtonGroup
              options={["best", "720p", "480p"]}
              selected={quality}
              onChange={setQuality}
            />
            <p className="text-xs text-gray-500 mt-1">
              best: 最佳可用质量 | 720p/480p: 指定分辨率
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              输出格式
            </label>
            <ButtonGroup
              options={["mp4", "webm", "gif"]}
              selected={downloadFormat}
              onChange={setDownloadFormat}
            />
            <p className="text-xs text-gray-500 mt-1">
              {downloadFormat === "gif" ? "GIF格式不包含音频" : "视频格式包含音频"}
            </p>
          </div>

          <div>
            <ToggleSwitch
              enabled={includeAudio}
              onChange={setIncludeAudio}
              label="合并音频轨道"
            />
            <p className="text-xs text-gray-500 mt-1">
              Reddit视频和音频通常是分离的，启用此选项将自动合并
            </p>
          </div>
        </div>
      </ControlSection>

      {/* Reddit-specific Features */}
      <ControlSection
        title="Reddit特性"
        description="Reddit视频下载注意事项"
      >
        <div className="bg-orange-900/30 border border-orange-600/30 rounded-lg p-3">
          <div className="text-orange-200 text-sm space-y-2">
            <p className="font-medium">📱 Reddit视频特点：</p>
            <ul className="space-y-1 text-xs">
              <li>• 视频和音频文件分离存储</li>
              <li>• 某些视频可能没有音频轨道</li>
              <li>• 支持多种分辨率选择</li>
              <li>• 可下载为GIF格式</li>
            </ul>
          </div>
        </div>
      </ControlSection>
    </div>
  )

  const preview = videoInfo ? (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      {/* Reddit Post Info */}
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full shadow-xl">
        {/* Post Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
              <span className="text-orange-400 font-medium">{videoInfo.subreddit}</span>
              <span>•</span>
              <span>Posted by {videoInfo.author}</span>
            </div>
            <h3 className="text-white font-medium text-lg mb-2 leading-tight">
              {videoInfo.title}
            </h3>
          </div>
        </div>

        {/* Video Preview */}
        <div className="relative mb-4">
          <img
            src={videoInfo.thumbnail}
            alt={videoInfo.title}
            className="w-full h-48 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
            <div className="bg-black/70 text-white px-3 py-1 rounded-full flex items-center space-x-2">
              <Video className="w-4 h-4" />
              <span className="text-sm">{videoInfo.duration}</span>
            </div>
          </div>
          {!videoInfo.hasAudio && (
            <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
              无音频
            </div>
          )}
        </div>

        {/* Post Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span>⬆️</span>
              <span>{videoInfo.score.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💬</span>
              <span>{videoInfo.comments}</span>
            </div>
          </div>
          <div className="text-gray-500">
            {videoInfo.hasAudio ? "包含音频" : "仅视频"}
          </div>
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>下载进度</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleDownload('combined')}
            disabled={isDownloading || !videoInfo.hasAudio}
            className="flex flex-col items-center p-3 bg-orange-600 hover:bg-orange-700 rounded-lg text-white transition-colors disabled:opacity-50"
          >
            <Video className="w-5 h-5 mb-1" />
            <span className="text-sm">视频+音频</span>
            <span className="text-xs opacity-75">{quality} • {downloadFormat.toUpperCase()}</span>
          </button>

          <button
            onClick={() => handleDownload('video')}
            disabled={isDownloading}
            className="flex flex-col items-center p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors disabled:opacity-50"
          >
            <Video className="w-5 h-5 mb-1" />
            <span className="text-sm">仅视频</span>
            <span className="text-xs opacity-75">{quality}</span>
          </button>

          {videoInfo.hasAudio && (
            <button
              onClick={() => handleDownload('audio')}
              disabled={isDownloading}
              className="flex flex-col items-center p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors disabled:opacity-50"
            >
              <Music className="w-5 h-5 mb-1" />
              <span className="text-sm">仅音频</span>
              <span className="text-xs opacity-75">MP3</span>
            </button>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="max-w-2xl w-full">
        <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            下载说明
          </h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Reddit视频通常需要合并音频和视频轨道</li>
            <li>• 某些帖子可能只有静默视频</li>
            <li>• 支持下载为GIF格式（无音频）</li>
            <li>• 下载的文件将保持原始质量</li>
          </ul>
        </div>
      </div>
    </div>
  ) : null

  return (
    <ToolLayout
      currentTool="Reddit Video Downloader"
      controlPanel={controlPanel}
      preview={preview}
      previewTitle="Reddit视频下载器"
      previewSubtitle="下载Reddit上的视频、音频和GIF"
      onGenerate={handleAnalyze}
      isGenerating={isAnalyzing}
      creditsRequired={2}
      previewActions={previewActions}
    />
  )
}
