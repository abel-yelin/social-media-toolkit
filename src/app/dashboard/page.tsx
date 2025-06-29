"use client"

import { useEffect, useState, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import { AnimatedSection, StaggeredContainer } from "@/components/AnimatedSection"
import {
  User,
  Trophy,
  BarChart3,
  History,
  CreditCard,
  Settings,
  LogOut,
  Instagram,
  Facebook,
  Music,
  Play,
  ExternalLink
} from "lucide-react"
import { DatabaseService, type GiveawayHistory, type UserCredits } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [giveawayHistory, setGiveawayHistory] = useState<GiveawayHistory[]>([])
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUserData = useCallback(async () => {
    try {
      setIsLoading(true)
      const [history, credits] = await Promise.all([
        DatabaseService.getGiveawayHistory(session?.user?.id || ''),
        DatabaseService.getUserCredits(session?.user?.id || '')
      ])
      setGiveawayHistory(history)
      setUserCredits(credits)
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }

    if (session?.user?.id) {
      loadUserData()
    }
  }, [session, status, router, loadUserData])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'facebook': return <Facebook className="w-4 h-4" />
      case 'tiktok': return <Music className="w-4 h-4" />
      case 'youtube': return <Play className="w-4 h-4" />
      default: return <Trophy className="w-4 h-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'from-pink-500 to-purple-600'
      case 'facebook': return 'from-blue-500 to-blue-700'
      case 'tiktok': return 'from-pink-400 to-cyan-400'
      case 'youtube': return 'from-red-500 to-red-700'
      default: return 'from-gray-500 to-gray-700'
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <AnimatedSection direction="up">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {session?.user?.name || 'User'}!
                </h1>
                <p className="text-gray-600">{session?.user?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" staggerDelay={0.1}>
            <motion.div whileHover={{ y: -5 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Trophy className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Giveaways</p>
                      <p className="text-2xl font-bold text-gray-900">{giveawayHistory.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Comments Analyzed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {giveawayHistory.reduce((sum, g) => sum + g.comments_analyzed, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Credits Left</p>
                      <p className="text-2xl font-bold text-gray-900">{userCredits?.remaining_credits || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <User className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Winners Selected</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {giveawayHistory.reduce((sum, g) => sum + g.winner_count, 0)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggeredContainer>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Giveaways */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="w-5 h-5" />
                    <span>Recent Giveaways</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {giveawayHistory.length > 0 ? (
                    <div className="space-y-4">
                      {giveawayHistory.map((giveaway) => (
                        <motion.div
                          key={giveaway.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-2 bg-gradient-to-r ${getPlatformColor(giveaway.platform)} rounded-lg`}>
                              {getPlatformIcon(giveaway.platform)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 capitalize">
                                {giveaway.platform} Giveaway
                              </p>
                              <p className="text-sm text-gray-600">
                                {giveaway.winner_count} winner{giveaway.winner_count !== 1 ? 's' : ''} • {giveaway.comments_analyzed} comments
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(giveaway.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No giveaways yet. Start your first one!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Instagram Giveaway', href: '/instagram-giveaway-picker', icon: Instagram, color: 'from-pink-500 to-purple-600' },
                    { name: 'Facebook Picker', href: '/facebook-comment-picker', icon: Facebook, color: 'from-blue-500 to-blue-700' },
                    { name: 'TikTok Picker', href: '/tiktok-comment-picker', icon: Music, color: 'from-pink-400 to-cyan-400' },
                    { name: 'YouTube Picker', href: '/youtube-comment-picker', icon: Play, color: 'from-red-500 to-red-700' }
                  ].map((action) => (
                    <Link key={action.href} href={action.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors cursor-pointer"
                      >
                        <div className={`p-2 bg-gradient-to-r ${action.color} rounded-lg`}>
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900">{action.name}</span>
                      </motion.div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Credits Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Credits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available</span>
                      <span className="font-bold text-green-600">
                        {userCredits?.remaining_credits || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{
                          width: `${userCredits ? (userCredits.remaining_credits / userCredits.total_credits) * 100 : 0}%`
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      {userCredits?.used_credits || 0} of {userCredits?.total_credits || 0} used
                    </div>
                    <Button className="w-full" size="sm">
                      Buy More Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
