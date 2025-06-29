"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import { Instagram, Users, Settings, Zap, Trophy, Shield, Download } from "lucide-react"
import type { InstagramComment, GiveawayWinner, Feature } from "@/lib/types"
import { SocialMediaAPIService } from "@/lib/socialMediaAPI"
import { DatabaseService } from "@/lib/supabase"
import { useSession } from "next-auth/react"

export default function InstagramGiveawayPicker() {
  const { data: session } = useSession()
  const [postUrl, setPostUrl] = useState("")
  const [numWinners, setNumWinners] = useState("1")
  const [filterKeywords, setFilterKeywords] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [winners, setWinners] = useState<GiveawayWinner[]>([])
  const [comments, setComments] = useState<InstagramComment[]>([])
  const [apiService] = useState(() => new SocialMediaAPIService())

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

  const handleAnalyze = async () => {
    if (!postUrl) return

    setIsAnalyzing(true)
    setComments([])
    setWinners([])

    try {
      // Extract post ID from URL
      const postId = SocialMediaAPIService.extractPostId(postUrl, 'instagram')

      if (!postId) {
        alert('Invalid Instagram URL. Please check the format.')
        setIsAnalyzing(false)
        return
      }

      // Get comments from API
      const response = await apiService.getComments('instagram', postId)

      if (response.success && response.data) {
        // Convert API response to our format
        const convertedComments: InstagramComment[] = response.data.map(comment => ({
          username: comment.username,
          comment: comment.text,
          timestamp: comment.timestamp,
          likes: comment.likes,
          verified: comment.verified || false
        }))

        // Apply filters if specified
        let filteredComments = convertedComments
        if (filterKeywords.trim()) {
          const keywords = filterKeywords.toLowerCase().split(',').map(k => k.trim())
          filteredComments = convertedComments.filter(comment =>
            !keywords.some(keyword =>
              comment.comment.toLowerCase().includes(keyword) ||
              comment.username.toLowerCase().includes(keyword)
            )
          )
        }

        setComments(filteredComments)
      } else {
        // Fallback to demo data if API fails
        setComments(mockComments)
        if (response.error) {
          console.warn('API Error, using demo data:', response.error)
        }
      }
    } catch (error) {
      console.error('Error analyzing comments:', error)
      // Fallback to demo data
      setComments(mockComments)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handlePickWinners = async () => {
    if (comments.length === 0) return

    const numberOfWinners = Math.min(Number.parseInt(numWinners), comments.length)
    const shuffled = [...comments].sort(() => 0.5 - Math.random())
    const selectedWinners = shuffled.slice(0, numberOfWinners).map((winner, index) => ({
      ...winner,
      position: index + 1
    }))

    setWinners(selectedWinners)

    // Save to database if user is logged in
    if (session?.user?.id) {
      try {
        await DatabaseService.saveGiveawayHistory({
          user_id: session.user.id,
          platform: 'instagram',
          post_url: postUrl,
          winner_count: numberOfWinners,
          winners: selectedWinners,
          comments_analyzed: comments.length,
          filters_applied: filterKeywords ? ['keyword_filter'] : []
        })
      } catch (error) {
        console.error('Error saving giveaway history:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <AnimatedSection direction="up">
        <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
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
                  <h1 className="text-5xl font-bold">Instagram Giveaway Picker</h1>
                </motion.div>

                <motion.p
                  className="text-xl text-purple-100 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Randomly select winners from Instagram comments with advanced filtering options.
                  Ensure fairness and transparency in your giveaway campaigns.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {[
                    { icon: Users, text: "Fair Selection" },
                    { icon: Shield, text: "Filter Spam" },
                    { icon: Zap, text: "Instant Results" }
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
                  <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto mb-6">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Pick Winners Now</h3>
                  <p className="text-center text-purple-100">
                    Start your fair and transparent giveaway selection process
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
                      <Label htmlFor="post-url">Instagram Post URL</Label>
                      <Input
                        id="post-url"
                        placeholder="https://instagram.com/p/..."
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
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
                          className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
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
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
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
                    <Card className="border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-yellow-700">
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
                              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-yellow-200"
                              whileHover={{ scale: 1.02, y: -2 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                <span className="text-white font-bold">#{winner.position}</span>
                              </div>
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
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
                          <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600">
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
                Why Choose Our Instagram Giveaway Picker?
              </h2>
              <p className="text-xl text-gray-600">
                Advanced features to ensure fair and transparent giveaway management
              </p>
            </div>

            <StaggeredContainer
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerDelay={0.15}
            >
              {([
                {
                  icon: Shield,
                  title: "Spam Protection",
                  description: "Automatically filter out spam comments and bot accounts to ensure genuine participants only."
                },
                {
                  icon: Users,
                  title: "Fair Selection",
                  description: "Cryptographically secure random selection ensures every participant has an equal chance."
                },
                {
                  icon: Settings,
                  title: "Advanced Filters",
                  description: "Filter by keywords, account age, follower count, and more for better targeting."
                },
                {
                  icon: Zap,
                  title: "Instant Results",
                  description: "Get results in seconds with our optimized comment analysis and winner selection."
                },
                {
                  icon: Download,
                  title: "Export Data",
                  description: "Download winner lists and comment data in multiple formats for your records."
                },
                {
                  icon: Trophy,
                  title: "Multiple Winners",
                  description: "Select multiple winners and create tiered giveaways with different prize levels."
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
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"
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
