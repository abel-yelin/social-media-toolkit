"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import { Users, Settings, Zap, Trophy, Shield, Download, Play, ThumbsUp, Star } from "lucide-react"
import type { InstagramComment, GiveawayWinner, Feature } from "@/lib/types"

export default function YouTubeCommentPicker() {
  const [postUrl, setPostUrl] = useState("")
  const [numWinners, setNumWinners] = useState("1")
  const [filterKeywords, setFilterKeywords] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [winners, setWinners] = useState<GiveawayWinner[]>([])
  const [comments, setComments] = useState<InstagramComment[]>([])

  // Mock data for demo with YouTube-style comments
  const mockComments: InstagramComment[] = [
    { username: "TechReviewer2024", comment: "First! Amazing giveaway, been subscribed for years! 🔥", timestamp: "2024-06-28T10:30:00Z", likes: 234, verified: true },
    { username: "GamingWithFriends", comment: "This is exactly what I needed for my setup! Good luck everyone 🎮", timestamp: "2024-06-28T10:45:00Z", likes: 156, verified: false },
    { username: "CreativeContent", comment: "Your channel has helped me so much! Hope I win this time 🤞", timestamp: "2024-06-28T11:00:00Z", likes: 189, verified: true },
    { username: "StudentLife2024", comment: "Would be perfect for my studies! Thanks for always giving back to subscribers", timestamp: "2024-06-28T11:15:00Z", likes: 98, verified: false },
    { username: "TechEnthusiast", comment: "Love your content! Been watching since 10k subs 📱", timestamp: "2024-06-28T11:30:00Z", likes: 145, verified: false },
    { username: "DigitalArtist", comment: "This would help my channel grow so much! Amazing giveaway 🎨", timestamp: "2024-06-28T11:45:00Z", likes: 167, verified: true },
    { username: "CodeWithMe", comment: "Perfect timing! Just what I needed for my coding setup 💻", timestamp: "2024-06-28T12:00:00Z", likes: 134, verified: false },
    { username: "LifestyleVlogger", comment: "Your channel is my daily inspiration! Fingers crossed 🌟", timestamp: "2024-06-28T12:15:00Z", likes: 112, verified: false }
  ]

  const handleAnalyze = async () => {
    if (!postUrl) return

    setIsAnalyzing(true)
    setComments([])
    setWinners([])

    // Simulate API call
    setTimeout(() => {
      setComments(mockComments)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handlePickWinners = () => {
    if (comments.length === 0) return

    const numberOfWinners = Math.min(Number.parseInt(numWinners), comments.length)
    const shuffled = [...comments].sort(() => 0.5 - Math.random())
    const selectedWinners = shuffled.slice(0, numberOfWinners).map((winner, index) => ({
      ...winner,
      position: index + 1
    }))

    setWinners(selectedWinners)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <AnimatedSection direction="up">
        <section className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
          {/* YouTube-style background elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear"
              }}
              className="absolute top-20 left-20 w-16 h-16 border-4 border-white/20 rounded-lg"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
              className="absolute bottom-32 right-32 w-24 h-24 bg-white/10 rounded-full"
            />
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/20 transform rotate-45"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center space-x-3"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255, 255, 255, 0.4)",
                        "0 0 0 20px rgba(255, 255, 255, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="w-10 h-10 bg-white rounded flex items-center justify-center"
                  >
                    <Play className="w-6 h-6 text-red-600 ml-1" />
                  </motion.div>
                  <h1 className="text-5xl font-bold">YouTube Comment Picker</h1>
                </motion.div>

                <motion.p
                  className="text-xl text-red-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Run professional YouTube giveaways that engage your subscribers and grow your channel.
                  Fair random selection with advanced analytics and creator-friendly features.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    { icon: Play, text: "Creator Tools" },
                    { icon: ThumbsUp, text: "Subscriber Focus" },
                    { icon: Star, text: "Professional" }
                  ].map((feature) => (
                    <div key={feature.text} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
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
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                    className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl mx-auto mb-6 shadow-lg"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center mb-4">Grow Your Channel</h3>
                  <p className="text-center text-red-100">
                    Engage subscribers with fair and transparent giveaways
                  </p>
                </motion.div>
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
                <Card className="sticky top-8 border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-red-600" />
                      <span>Giveaway Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="post-url">YouTube Video URL</Label>
                      <Input
                        id="post-url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={postUrl}
                        onChange={(e) => setPostUrl(e.target.value)}
                        className="border-red-200 focus:border-red-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="num-winners">Number of Winners</Label>
                      <Input
                        id="num-winners"
                        type="number"
                        min="1"
                        max="10"
                        value={numWinners}
                        onChange={(e) => setNumWinners(e.target.value)}
                        className="border-red-200 focus:border-red-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filter-keywords">Filter Keywords (optional)</Label>
                      <Input
                        id="filter-keywords"
                        placeholder="spam, bot, fake..."
                        value={filterKeywords}
                        onChange={(e) => setFilterKeywords(e.target.value)}
                        className="border-red-200 focus:border-red-400"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Additional Filters</Label>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-red-600" defaultChecked />
                          <span>Subscribers only</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-red-600" />
                          <span>Verified accounts priority</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded text-red-600" />
                          <span>Filter duplicate comments</span>
                        </label>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleAnalyze}
                        disabled={!postUrl || isAnalyzing}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold"
                      >
                        {isAnalyzing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isAnalyzing ? "Analyzing..." : "Analyze Comments"}
                      </Button>
                    </motion.div>

                    {comments.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Button
                          onClick={handlePickWinners}
                          variant="outline"
                          className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          Pick Winners
                        </Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Comments */}
                {comments.length > 0 && (
                  <Card className="border-red-200">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <Play className="w-5 h-5 text-red-600" />
                          <span>Comments ({comments.length})</span>
                        </span>
                        <Button size="sm" variant="outline" className="border-red-300 text-red-600">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StaggeredContainer
                        className="space-y-3 max-h-96 overflow-y-auto"
                        staggerDelay={0.05}
                      >
                        {comments.map((comment) => (
                          <motion.div
                            key={comment.username}
                            className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-red-50 rounded-lg hover:from-red-50 hover:to-red-100 transition-colors border border-red-100"
                            whileHover={{ scale: 1.01, x: 5 }}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {comment.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-900">{comment.username}</span>
                                {comment.verified && (
                                  <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <ThumbsUp className="w-3 h-3 text-red-500" />
                                  <span className="text-xs text-gray-500">{comment.likes}</span>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </StaggeredContainer>
                    </CardContent>
                  </Card>
                )}

                {/* Winners */}
                {winners.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Card className="border-red-300 bg-gradient-to-br from-red-50 to-orange-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <Trophy className="w-6 h-6 text-yellow-500" />
                          </motion.div>
                          <span className="text-red-700 font-bold">
                            🎉 YouTube Winners Selected!
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <StaggeredContainer
                          className="space-y-4"
                          staggerDelay={0.2}
                        >
                          {winners.map((winner) => (
                            <motion.div
                              key={winner.username}
                              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-red-200"
                              whileHover={{ scale: 1.02, y: -2 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              style={{
                                background: "linear-gradient(135deg, #fff 0%, #fef2f2 100%)"
                              }}
                            >
                              <motion.div
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(220, 38, 38, 0.4)",
                                    "0 0 0 15px rgba(220, 38, 38, 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
                              >
                                <span className="text-white font-bold">#{winner.position}</span>
                              </motion.div>
                              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {winner.username[0].toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-gray-900">{winner.username}</span>
                                  {winner.verified && (
                                    <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-gray-700 text-sm">{winner.comment}</p>
                              </div>
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: winner.position * 0.4
                                }}
                                className="text-2xl"
                              >
                                🏆
                              </motion.div>
                            </motion.div>
                          ))}
                        </StaggeredContainer>

                        <div className="mt-6 flex gap-4">
                          <Button className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                            <Download className="w-4 h-4 mr-2" />
                            Export Winners
                          </Button>
                          <Button variant="outline" className="flex-1 border-red-300 text-red-600 hover:bg-red-50">
                            Share Video
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
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
                <span className="text-red-600">YouTube Creator</span> Features
              </h2>
              <p className="text-xl text-gray-600">
                Professional tools designed for YouTube creators and their communities
              </p>
            </div>

            <StaggeredContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {([
                {
                  icon: Play,
                  title: "Creator Focused",
                  description: "Built specifically for YouTube creators with subscriber-only filters and channel growth features."
                },
                {
                  icon: Shield,
                  title: "Advanced Security",
                  description: "Protect against bot comments and spam while ensuring fair participation for real subscribers."
                },
                {
                  icon: ThumbsUp,
                  title: "Engagement Boost",
                  description: "Increase video engagement and subscriber interaction with transparent giveaway systems."
                },
                {
                  icon: Users,
                  title: "Community Building",
                  description: "Strengthen your YouTube community with fair and engaging giveaway experiences."
                },
                {
                  icon: Star,
                  title: "Professional Results",
                  description: "Generate professional winner announcements and export data for your records."
                },
                {
                  icon: Zap,
                  title: "Real-time Analytics",
                  description: "Get instant insights into comment engagement and participant demographics."
                }
              ] as Feature[]).map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-red-100 hover:border-red-300">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{
                          rotate: 360,
                          background: "linear-gradient(45deg, #dc2626, #ef4444, #f87171)"
                        }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full mb-4"
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
