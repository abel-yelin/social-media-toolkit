"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import { Instagram, Download, FileText, Database, Filter, Clock, BarChart3 } from "lucide-react"
import type { InstagramComment, Feature, Statistic } from "@/lib/types"

export default function InstagramCommentsExport() {
  const [postUrl, setPostUrl] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [exportedData, setExportedData] = useState<InstagramComment[]>([])
  const [exportProgress, setExportProgress] = useState(0)

  // Mock data for demo
  const mockComments: InstagramComment[] = [
    { username: "sarah_adventures", comment: "This looks amazing! 🌟", timestamp: "2024-06-28T10:30:00Z", likes: 15, verified: true },
    { username: "mike_photographer", comment: "Count me in! Great contest", timestamp: "2024-06-28T10:45:00Z", likes: 8, verified: false },
    { username: "travel_with_emma", comment: "Would love to win this! ✨", timestamp: "2024-06-28T11:00:00Z", likes: 22, verified: true },
    { username: "fitness_guru_alex", comment: "Awesome giveaway! 💪", timestamp: "2024-06-28T11:15:00Z", likes: 12, verified: false },
    { username: "foodie_life_2024", comment: "Please pick me! 🙏", timestamp: "2024-06-28T11:30:00Z", likes: 5, verified: false },
    { username: "tech_reviewer_pro", comment: "This would be perfect for my content!", timestamp: "2024-06-28T11:45:00Z", likes: 18, verified: true },
    { username: "lifestyle_blogger_jen", comment: "Following all the rules! Good luck everyone", timestamp: "2024-06-28T12:00:00Z", likes: 9, verified: false },
    { username: "adventure_seeker_99", comment: "Hope I win! 🤞", timestamp: "2024-06-28T12:15:00Z", likes: 3, verified: false }
  ]

  const handleExport = async () => {
    if (!postUrl) return

    setIsExporting(true)
    setExportedData([])
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setExportedData(mockComments)
          setIsExporting(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const downloadCSV = () => {
    const headers = ['Username', 'Comment', 'Timestamp', 'Likes', 'Verified']
    const rows = exportedData.map(item => [
      item.username,
      `"${item.comment.replace(/"/g, '""')}"`,
      item.timestamp,
      item.likes,
      item.verified ? 'Yes' : 'No'
    ])

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'instagram_comments.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(exportedData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'instagram_comments.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <AnimatedSection direction="up">
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center space-x-3"
                >
                  <Instagram className="w-10 h-10" />
                  <h1 className="text-5xl font-bold">Instagram Comments Export</h1>
                </motion.div>

                <motion.p
                  className="text-xl text-blue-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Extract and export all comments from any Instagram post. Get detailed analytics,
                  user insights, and engagement data in multiple formats.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    { icon: Download, text: "Export Data" },
                    { icon: Filter, text: "Advanced Filters" },
                    { icon: BarChart3, text: "Analytics" }
                  ].map((feature) => (
                    <div key={feature.text} className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
                      <feature.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6">
                    <Database className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Export Comments</h3>
                  <p className="text-center text-blue-100">
                    Get comprehensive comment data and analytics
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Main Tool Section */}
      <AnimatedSection direction="up" delay={0.2}>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Input Panel */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Export Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="post-url">Instagram Post URL</Label>
                      <Input
                        id="post-url"
                        placeholder="https://instagram.com/p/..."
                        value={postUrl}
                        onChange={(e) => setPostUrl(e.target.value)}
                      />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Export Options</h4>
                      <div className="space-y-3">
                        {[
                          { id: "comments", label: "Comments Text", checked: true },
                          { id: "usernames", label: "Usernames", checked: true },
                          { id: "timestamps", label: "Timestamps", checked: true },
                          { id: "likes", label: "Like Counts", checked: true },
                          { id: "verified", label: "Verification Status", checked: true }
                        ].map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={option.id}
                              defaultChecked={option.checked}
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label htmlFor={option.id} className="text-sm text-gray-700">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleExport}
                        disabled={!postUrl || isExporting}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        {isExporting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Download className="w-4 h-4 mr-2" />
                        )}
                        {isExporting ? `Exporting... ${exportProgress}%` : "Start Export"}
                      </Button>
                    </motion.div>

                    {/* Progress Bar */}
                    {isExporting && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${exportProgress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                          Extracting comments...
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Export Summary */}
                {exportedData.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-700">
                          <BarChart3 className="w-6 h-6" />
                          <span>Export Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {([
                            { label: "Total Comments", value: exportedData.length, icon: "💬" },
                            { label: "Verified Users", value: exportedData.filter(c => c.verified).length, icon: "✅" },
                            { label: "Total Likes", value: exportedData.reduce((sum, c) => sum + c.likes, 0), icon: "❤️" },
                            { label: "Avg. Likes", value: Math.round(exportedData.reduce((sum, c) => sum + c.likes, 0) / exportedData.length), icon: "📊" }
                          ] as Statistic[]).map((stat, index) => (
                            <motion.div
                              key={stat.label}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className="text-center p-4 bg-white rounded-lg shadow-sm"
                            >
                              <div className="text-2xl mb-2">{stat.icon}</div>
                              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                              <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Button
                            onClick={downloadCSV}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Download CSV
                          </Button>
                          <Button
                            onClick={downloadJSON}
                            variant="outline"
                            className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                          >
                            <Database className="w-4 h-4 mr-2" />
                            Download JSON
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Comments Preview */}
                {exportedData.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Comments Preview</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Real-time data</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StaggeredContainer
                        className="space-y-3 max-h-96 overflow-y-auto"
                        staggerDelay={0.05}
                      >
                        {exportedData.map((comment) => (
                          <motion.div
                            key={comment.username}
                            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {comment.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-900">{comment.username}</span>
                                {comment.verified && (
                                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                )}
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>❤️ {comment.likes} likes</span>
                                <span>📅 {new Date(comment.timestamp).toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </StaggeredContainer>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection direction="up" delay={0.3}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Comment Export Features
              </h2>
              <p className="text-xl text-gray-600">
                Extract comprehensive data and insights from Instagram comments
              </p>
            </div>

            <StaggeredContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {([
                {
                  icon: Download,
                  title: "Multiple Formats",
                  description: "Export your data in CSV, JSON, Excel, and more formats for maximum compatibility."
                },
                {
                  icon: Filter,
                  title: "Smart Filtering",
                  description: "Filter comments by date range, verification status, keywords, and engagement metrics."
                },
                {
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  description: "Get detailed insights including engagement rates, user demographics, and trending topics."
                },
                {
                  icon: Clock,
                  title: "Real-time Export",
                  description: "Extract comments in real-time with live progress tracking and instant results."
                },
                {
                  icon: Database,
                  title: "Bulk Processing",
                  description: "Process multiple posts simultaneously and export thousands of comments efficiently."
                },
                {
                  icon: FileText,
                  title: "Detailed Reports",
                  description: "Generate comprehensive reports with user profiles, engagement metrics, and sentiment analysis."
                }
              ] as Feature[]).map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
