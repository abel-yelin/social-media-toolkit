"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import { Users, Settings, Zap, Trophy, Shield, Download, Music, Heart, Sparkles } from "lucide-react"
import type { InstagramComment, GiveawayWinner, Feature } from "@/lib/types"

export default function TikTokCommentPicker() {
  const [postUrl, setPostUrl] = useState("")
  const [numWinners, setNumWinners] = useState("1")
  const [filterKeywords, setFilterKeywords] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [winners, setWinners] = useState<GiveawayWinner[]>([])
  const [comments, setComments] = useState<InstagramComment[]>([])

  // Mock data for demo with TikTok-style comments
  const mockComments: InstagramComment[] = [
    { username: "dancing_queen_2024", comment: "This is fire! 🔥🔥🔥 Count me in!", timestamp: "2024-06-28T10:30:00Z", likes: 142, verified: true },
    { username: "viral_content_king", comment: "OMG yes! This trend is everything ✨", timestamp: "2024-06-28T10:45:00Z", likes: 89, verified: false },
    { username: "tiktoker_life", comment: "First! Hope I win this amazing giveaway 🤞", timestamp: "2024-06-28T11:00:00Z", likes: 203, verified: true },
    { username: "creator_dreams", comment: "This would be perfect for my content! 💫", timestamp: "2024-06-28T11:15:00Z", likes: 67, verified: false },
    { username: "gen_z_vibes", comment: "No cap this is sick! Following all rules 📱", timestamp: "2024-06-28T11:30:00Z", likes: 45, verified: false },
    { username: "music_lover_99", comment: "The audio on this is *chef's kiss* 🎵", timestamp: "2024-06-28T11:45:00Z", likes: 128, verified: true },
    { username: "trend_setter_pro", comment: "Already saved this! Hope I'm lucky 🍀", timestamp: "2024-06-28T12:00:00Z", likes: 76, verified: false },
    { username: "creative_mind", comment: "This deserves to go viral! Good luck everyone 🚀", timestamp: "2024-06-28T12:15:00Z", likes: 54, verified: false }
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
        <section className="py-20 bg-gradient-to-br from-gray-900 via-pink-500 to-cyan-400 text-white relative overflow-hidden">
          {/* TikTok-style background elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear"
              }}
              className="absolute top-10 left-10 w-20 h-20 bg-cyan-400 rounded-full opacity-20"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 100, 0],
                rotate: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear"
              }}
              className="absolute bottom-20 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-20"
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
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold">TikTok Comment Picker</h1>
                </motion.div>

                <motion.p
                  className="text-xl text-gray-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Run viral TikTok giveaways with our advanced comment picker. Fair, fast, and perfect
                  for engaging with your TikTok community and growing your following.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    { icon: Sparkles, text: "Viral Ready" },
                    { icon: Heart, text: "Engagement Boost" },
                    { icon: Zap, text: "Lightning Fast" }
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
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                    className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full mx-auto mb-6"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center mb-4">Go Viral</h3>
                  <p className="text-center text-gray-100">
                    Create engaging TikTok giveaways that trend
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
                <Card className="sticky top-8 border-gradient">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Giveaway Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="post-url">TikTok Video URL</Label>
                      <Input
                        id="post-url"
                        placeholder="https://tiktok.com/@username/video/..."
                        value={postUrl}
                        onChange={(e) => setPostUrl(e.target.value)}
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
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filter-keywords">Filter Keywords (optional)</Label>
                      <Input
                        id="filter-keywords"
                        placeholder="spam, bot, fake..."
                        value={filterKeywords}
                        onChange={(e) => setFilterKeywords(e.target.value)}
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleAnalyze}
                        disabled={!postUrl || isAnalyzing}
                        className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:via-purple-700 hover:to-cyan-600 text-white font-semibold"
                      >
                        {isAnalyzing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
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
                          className="w-full border-pink-300 text-pink-600 hover:bg-pink-50"
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Comments ({comments.length})</span>
                        <Button size="sm" variant="outline">
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
                            className="flex items-start space-x-3 p-3 bg-gradient-to-r from-gray-50 to-pink-50 rounded-lg hover:from-pink-50 hover:to-purple-50 transition-colors"
                            whileHover={{ scale: 1.01, x: 5 }}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {comment.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">{comment.username}</span>
                                {comment.verified && (
                                  <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700 text-sm mb-1">{comment.comment}</p>
                              <div className="flex items-center space-x-2">
                                <Heart className="w-3 h-3 text-pink-500" />
                                <span className="text-xs text-gray-500">{comment.likes} likes</span>
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
                    <Card className="border-pink-300 bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <motion.div
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                            }}
                          >
                            <Trophy className="w-6 h-6 text-yellow-500" />
                          </motion.div>
                          <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent font-bold">
                            🎉 Winners Selected!
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
                              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-pink-200"
                              whileHover={{ scale: 1.02, y: -2 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <motion.div
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(236, 72, 153, 0.4)",
                                    "0 0 0 20px rgba(236, 72, 153, 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                }}
                                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                              >
                                <span className="text-white font-bold">#{winner.position}</span>
                              </motion.div>
                              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {winner.username[0].toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-gray-900">{winner.username}</span>
                                  {winner.verified && (
                                    <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-gray-700 text-sm">{winner.comment}</p>
                              </div>
                              <motion.div
                                animate={{
                                  scale: [1, 1.3, 1],
                                  rotate: [0, 15, -15, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: winner.position * 0.3
                                }}
                                className="text-2xl"
                              >
                                🚀
                              </motion.div>
                            </motion.div>
                          ))}
                        </StaggeredContainer>

                        <div className="mt-6 flex gap-4">
                          <Button className="flex-1 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 hover:from-pink-600 hover:via-purple-700 hover:to-cyan-600">
                            <Download className="w-4 h-4 mr-2" />
                            Export Winners
                          </Button>
                          <Button variant="outline" className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50">
                            Share on TikTok
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
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  TikTok Giveaway Features
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Built for the TikTok generation - fast, viral, and engaging
              </p>
            </div>

            <StaggeredContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {([
                {
                  icon: Sparkles,
                  title: "Viral Optimization",
                  description: "Designed to boost engagement and help your giveaways go viral on TikTok."
                },
                {
                  icon: Heart,
                  title: "Community Focus",
                  description: "Build stronger connections with your TikTok community through fair giveaways."
                },
                {
                  icon: Zap,
                  title: "Lightning Speed",
                  description: "Instant analysis and results - perfect for TikTok's fast-paced environment."
                },
                {
                  icon: Shield,
                  title: "Spam Protection",
                  description: "Advanced filtering to ensure only genuine TikTok users participate."
                },
                {
                  icon: Music,
                  title: "Trend-Ready",
                  description: "Stay on top of TikTok trends with our optimized giveaway strategies."
                },
                {
                  icon: Users,
                  title: "Creator Tools",
                  description: "Professional tools designed by creators, for creators on TikTok."
                }
              ] as Feature[]).map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full bg-gray-800 border-gray-700 hover:border-pink-500 transition-colors duration-300">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{
                          rotate: 360,
                          background: "linear-gradient(45deg, #ec4899, #a855f7, #06b6d4)"
                        }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mb-4"
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
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
