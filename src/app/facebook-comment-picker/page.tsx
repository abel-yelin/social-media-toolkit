"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import { Users, Settings, Zap, Trophy, Shield, Download, Globe, BarChart3 } from "lucide-react"
import type { InstagramComment, GiveawayWinner, Feature } from "@/lib/types"

export default function FacebookCommentPicker() {
  const [postUrl, setPostUrl] = useState("")
  const [numWinners, setNumWinners] = useState("1")
  const [filterKeywords, setFilterKeywords] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [winners, setWinners] = useState<GiveawayWinner[]>([])
  const [comments, setComments] = useState<InstagramComment[]>([])

  // Mock data for demo
  const mockComments: InstagramComment[] = [
    { username: "maria.rodriguez", comment: "This is amazing! I love Facebook giveaways 🎉", timestamp: "2024-06-28T10:30:00Z", likes: 25, verified: true },
    { username: "john.smith.2024", comment: "Count me in! This looks fantastic", timestamp: "2024-06-28T10:45:00Z", likes: 18, verified: false },
    { username: "social.media.maven", comment: "Excited to participate! 🔥", timestamp: "2024-06-28T11:00:00Z", likes: 32, verified: true },
    { username: "tech.enthusiast", comment: "Great contest! Thanks for this opportunity", timestamp: "2024-06-28T11:15:00Z", likes: 14, verified: false },
    { username: "creative.designer", comment: "Hope I win! 🤞 Good luck everyone", timestamp: "2024-06-28T11:30:00Z", likes: 7, verified: false },
    { username: "digital.nomad.life", comment: "This would be perfect for my travels!", timestamp: "2024-06-28T11:45:00Z", likes: 21, verified: true },
    { username: "fitness.motivation", comment: "Following all the rules! Let's go 💪", timestamp: "2024-06-28T12:00:00Z", likes: 11, verified: false },
    { username: "photography.lover", comment: "Amazing giveaway! Thanks for sharing 📸", timestamp: "2024-06-28T12:15:00Z", likes: 6, verified: false }
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
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-lg">f</span>
                  </div>
                  <h1 className="text-5xl font-bold">Facebook Comment Picker</h1>
                </motion.div>

                <motion.p
                  className="text-xl text-blue-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Randomly select winners from Facebook post comments with advanced filtering and
                  fair selection algorithms. Perfect for Facebook giveaways and contests.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    { icon: Users, text: "Fair Selection" },
                    { icon: Shield, text: "Spam Filter" },
                    { icon: Globe, text: "Public Posts" }
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
                  <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Select Winners</h3>
                  <p className="text-center text-blue-100">
                    Run transparent and fair Facebook giveaways
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
                      <Settings className="w-5 h-5" />
                      <span>Giveaway Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="post-url">Facebook Post URL</Label>
                      <Input
                        id="post-url"
                        placeholder="https://facebook.com/..."
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
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                      >
                        {isAnalyzing ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Zap className="w-4 h-4 mr-2" />
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
                          className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
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
                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {comment.username[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">{comment.username}</span>
                                {comment.verified && (
                                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700 text-sm">{comment.comment}</p>
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
                    <Card className="border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-blue-700">
                          <Trophy className="w-6 h-6" />
                          <span>🎉 Winners Selected!</span>
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
                              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-blue-200"
                              whileHover={{ scale: 1.02, y: -2 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full">
                                <span className="text-white font-bold">#{winner.position}</span>
                              </div>
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">
                                  {winner.username[0].toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-gray-900">{winner.username}</span>
                                  {winner.verified && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-gray-700 text-sm">{winner.comment}</p>
                              </div>
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: winner.position * 0.5
                                }}
                                className="text-2xl"
                              >
                                🏆
                              </motion.div>
                            </motion.div>
                          ))}
                        </StaggeredContainer>

                        <div className="mt-6 flex gap-4">
                          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600">
                            <Download className="w-4 h-4 mr-2" />
                            Export Winners
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Share Results
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
                Why Choose Our Facebook Comment Picker?
              </h2>
              <p className="text-xl text-gray-600">
                Advanced features designed specifically for Facebook giveaways
              </p>
            </div>

            <StaggeredContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {([
                {
                  icon: Shield,
                  title: "Advanced Filtering",
                  description: "Filter out spam comments, bot accounts, and duplicate entries for genuine participants only."
                },
                {
                  icon: Users,
                  title: "Fair & Random",
                  description: "Cryptographically secure random selection ensures every participant has an equal chance."
                },
                {
                  icon: Globe,
                  title: "Public Posts Only",
                  description: "Works with public Facebook posts while respecting privacy and platform guidelines."
                },
                {
                  icon: Zap,
                  title: "Quick Analysis",
                  description: "Fast comment analysis and winner selection in seconds, not minutes."
                },
                {
                  icon: Download,
                  title: "Export Results",
                  description: "Download winner lists and participation data in multiple formats."
                },
                {
                  icon: BarChart3,
                  title: "Engagement Analytics",
                  description: "Get insights into your giveaway performance and audience engagement."
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
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"
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
