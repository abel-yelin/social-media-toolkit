"use client"

import { useState } from "react"
import { ToolLayout } from "@/components/tool-layout/ToolLayout"
import { ControlSection, ToggleSwitch, ButtonGroup } from "@/components/tool-layout/ToolControlPanel"
import { VideoPreview } from "@/components/tool-layout/ToolPreview"
import { Download, Copy, Share, Video, Music, Image as ImageIcon, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface VideoInfo {
  id: string
  title: string
  author: string
  duration: string
  views: string
  likes: string
  thumbnail: string
  downloadUrls: {
    video_hd: string
    video_sd: string
    audio: string
    thumbnail: string
  }
}

export default function TikTokVideoDownloader() {
  // State for form controls
  const [url, setUrl] = useState("")
  const [quality, setQuality] = useState("hd")
  const [format, setFormat] = useState("mp4")
  const [removeWatermark, setRemoveWatermark] = useState(true)
  const [includeAudio, setIncludeAudio] = useState(true)

  // State for download process
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadHistory, setDownloadHistory] = useState<VideoInfo[]>([])
  const [urlError, setUrlError] = useState("")

  const validateUrl = (inputUrl: string) => {
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)/
    return tiktokRegex.test(inputUrl)
  }

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setUrlError("请输入TikTok视频链接")
      return
    }

    if (!validateUrl(url)) {
      setUrlError("请输入有效的TikTok视频链接")
      return
    }

    setUrlError("")
    setIsAnalyzing(true)

    // Simulate video analysis
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock video info
    const mockVideoInfo: VideoInfo = {
      id: "mock_video_123",
      title: "Amazing TikTok Dance Challenge 🔥",
      author: "@tiktoker_pro",
      duration: "00:15",
      views: "2.3M",
      likes: "456K",
      thumbnail: "https://picsum.photos/400/600?random=1",
      downloadUrls: {
        video_hd: "#hd_download",
        video_sd: "#sd_download",
        audio: "#audio_download",
        thumbnail: "#thumbnail_download"
      }
    }

    setVideoInfo(mockVideoInfo)
    setIsAnalyzing(false)
  }

  const handleDownload = async (type: 'video' | 'audio' | 'thumbnail') => {
    if (!videoInfo) return

    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setDownloadProgress(i)
    }

    // Add to download history
    if (!downloadHistory.find(item => item.id === videoInfo.id)) {
      setDownloadHistory(prev => [videoInfo, ...prev])
    }

    setIsDownloading(false)
    setDownloadProgress(0)
  }

  const previewActions = [
    {
      icon: Download,
      label: "Download Video",
      onClick: () => handleDownload('video'),
      variant: 'primary' as const
    },
    {
      icon: Music,
      label: "Audio Only",
      onClick: () => handleDownload('audio'),
      variant: 'secondary' as const
    },
    {
      icon: ImageIcon,
      label: "Thumbnail",
      onClick: () => handleDownload('thumbnail'),
      variant: 'secondary' as const
    }
  ]

  const controlPanel = (
    <div className="space-y-6">
      {/* URL Input Section */}
      <ControlSection
        title="视频链接"
        description="粘贴TikTok视频链接进行分析"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              TikTok URL
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
                placeholder="https://www.tiktok.com/@username/video/..."
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
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

          {/* Quick URL Examples */}
          <div className="text-xs text-gray-400">
            <p className="mb-1">支持的链接格式：</p>
            <ul className="space-y-1 text-gray-500">
              <li>• https://www.tiktok.com/@user/video/123...</li>
              <li>• https://vm.tiktok.com/ABC123/</li>
              <li>• https://m.tiktok.com/v/123...</li>
            </ul>
          </div>
        </div>
      </ControlSection>

      {/* Download Options */}
      <ControlSection
        title="下载选项"
        description="自定义下载设置和格式"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Video className="inline w-4 h-4 mr-1" />
              视频质量
            </label>
            <ButtonGroup
              options={["hd", "sd"]}
              selected={quality}
              onChange={setQuality}
            />
            <p className="text-xs text-gray-500 mt-1">
              HD: 1080p高清 | SD: 720p标清
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              文件格式
            </label>
            <ButtonGroup
              options={["mp4", "webm"]}
              selected={format}
              onChange={setFormat}
            />
          </div>

          <div className="space-y-3">
            <ToggleSwitch
              enabled={removeWatermark}
              onChange={setRemoveWatermark}
              label="移除水印"
            />

            <ToggleSwitch
              enabled={includeAudio}
              onChange={setIncludeAudio}
              label="包含音频"
            />
          </div>
        </div>
      </ControlSection>

      {/* Download History */}
      {downloadHistory.length > 0 && (
        <ControlSection
          title="下载历史"
          description="最近下载的视频"
        >
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {downloadHistory.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-700 rounded-md">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{item.title}</p>
                  <p className="text-gray-400 text-xs">{item.author}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </div>
        </ControlSection>
      )}
    </div>
  )

  const preview = videoInfo ? (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      {/* Video Info Card */}
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-xl">
        <div className="flex space-x-4">
          {/* Video Thumbnail */}
          <div className="relative flex-shrink-0">
            <img
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              className="w-24 h-32 rounded-lg object-cover"
            />
            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
              {videoInfo.duration}
            </div>
          </div>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-lg mb-2 line-clamp-2">
              {videoInfo.title}
            </h3>
            <p className="text-gray-400 text-sm mb-3">{videoInfo.author}</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-1 text-gray-300">
                <span>👁️</span>
                <span>{videoInfo.views}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300">
                <span>❤️</span>
                <span>{videoInfo.likes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-1">
              <span>下载进度</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Quality Info */}
        <div className="mt-4 p-3 bg-gray-750 rounded-lg">
          <div className="text-sm text-gray-300 space-y-1">
            <div className="flex justify-between">
              <span>质量:</span>
              <span className="text-blue-400">{quality.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>格式:</span>
              <span className="text-blue-400">{format.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>无水印:</span>
              <span className={removeWatermark ? "text-green-400" : "text-gray-500"}>
                {removeWatermark ? "是" : "否"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-lg">
        <button
          onClick={() => handleDownload('video')}
          disabled={isDownloading}
          className="flex flex-col items-center p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors disabled:opacity-50"
        >
          <Video className="w-6 h-6 mb-2" />
          <span className="text-sm">下载视频</span>
          <span className="text-xs opacity-75">{quality.toUpperCase()}</span>
        </button>

        <button
          onClick={() => handleDownload('audio')}
          disabled={isDownloading}
          className="flex flex-col items-center p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors disabled:opacity-50"
        >
          <Music className="w-6 h-6 mb-2" />
          <span className="text-sm">仅音频</span>
          <span className="text-xs opacity-75">MP3</span>
        </button>

        <button
          onClick={() => handleDownload('thumbnail')}
          disabled={isDownloading}
          className="flex flex-col items-center p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors disabled:opacity-50"
        >
          <ImageIcon className="w-6 h-6 mb-2" />
          <span className="text-sm">封面图</span>
          <span className="text-xs opacity-75">PNG</span>
        </button>
      </div>

      {/* Usage Tips */}
      <div className="max-w-lg w-full">
        <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
          <h4 className="text-blue-300 font-medium mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            使用提示
          </h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• 支持下载无水印高清视频</li>
            <li>• 可单独提取音频文件</li>
            <li>• 下载速度取决于视频大小</li>
            <li>• 请遵守TikTok服务条款</li>
          </ul>
        </div>
      </div>
    </div>
  ) : null

  return (
    <ToolLayout
      currentTool="TikTok Video Downloader"
      controlPanel={controlPanel}
      preview={preview}
      previewTitle="TikTok视频下载器"
      previewSubtitle="快速下载TikTok视频、音频和封面图片"
      onGenerate={handleAnalyze}
      isGenerating={isAnalyzing}
      creditsRequired={2}
      previewActions={previewActions}
    />
  )
}
