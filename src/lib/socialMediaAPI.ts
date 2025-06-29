// Social Media API Integration Service
// This provides both real API integration and demo functionality

export interface Comment {
  id: string
  username: string
  text: string
  timestamp: string
  likes: number
  verified?: boolean
  replies?: Comment[]
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  rateLimitRemaining?: number
}

// Instagram API Service
export class InstagramAPI {
  private accessToken: string
  private apiVersion = 'v18.0'

  constructor(accessToken?: string) {
    this.accessToken = accessToken || 'demo-token'
  }

  async getPostComments(postId: string): Promise<APIResponse<Comment[]>> {
    try {
      // In demo mode, return mock data
      if (this.accessToken === 'demo-token') {
        return this.getDemoComments('instagram')
      }

      // Real Instagram API call
      const response = await fetch(
        `https://graph.facebook.com/${this.apiVersion}/${postId}/comments?access_token=${this.accessToken}&fields=id,text,timestamp,like_count,username,user{verified}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status}`)
      }

      const data = await response.json()

      const comments: Comment[] = data.data?.map((comment: unknown) => {
        const c = comment as Record<string, unknown>
        return {
          id: String(c.id || ''),
          username: String((c.username || (c.user as Record<string, unknown>)?.username) || 'unknown'),
          text: String(c.text || ''),
          timestamp: String(c.timestamp || ''),
          likes: Number(c.like_count || 0),
          verified: Boolean((c.user as Record<string, unknown>)?.verified || false)
        }
      }) || []

      return {
        success: true,
        data: comments,
        rateLimitRemaining: Number.parseInt(response.headers.get('x-app-usage') || '100')
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: []
      }
    }
  }

  private getDemoComments(platform: string): APIResponse<Comment[]> {
    const demoComments: Comment[] = [
      {
        id: '1',
        username: 'sarah_adventures',
        text: 'This looks amazing! Count me in 🌟',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 15,
        verified: true
      },
      {
        id: '2',
        username: 'mike_photographer',
        text: 'Great giveaway! Hope I win this time 📸',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        likes: 8,
        verified: false
      },
      {
        id: '3',
        username: 'travel_with_emma',
        text: 'Following all the rules! Good luck everyone ✈️',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        likes: 22,
        verified: true
      }
    ]

    return {
      success: true,
      data: demoComments
    }
  }
}

// Facebook API Service
export class FacebookAPI {
  private accessToken: string
  private apiVersion = 'v18.0'

  constructor(accessToken?: string) {
    this.accessToken = accessToken || 'demo-token'
  }

  async getPostComments(postId: string): Promise<APIResponse<Comment[]>> {
    if (this.accessToken === 'demo-token') {
      return this.getDemoComments()
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/${this.apiVersion}/${postId}/comments?access_token=${this.accessToken}&fields=id,message,created_time,like_count,from`,
        {
          method: 'GET'
        }
      )

      const data = await response.json()

      const comments: Comment[] = data.data?.map((comment: unknown) => {
        const c = comment as Record<string, unknown>
        return {
          id: String(c.id || ''),
          username: String((c.from as Record<string, unknown>)?.name || 'Unknown'),
          text: String(c.message || ''),
          timestamp: String(c.created_time || ''),
          likes: Number(c.like_count || 0),
          verified: false
        }
      }) || []

      return { success: true, data: comments }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: []
      }
    }
  }

  private getDemoComments(): APIResponse<Comment[]> {
    const demoComments: Comment[] = [
      {
        id: '1',
        username: 'Maria Rodriguez',
        text: 'This is amazing! I love Facebook giveaways 🎉',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        likes: 25,
        verified: false
      },
      {
        id: '2',
        username: 'John Smith',
        text: 'Count me in! This looks fantastic',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        likes: 18,
        verified: false
      }
    ]

    return { success: true, data: demoComments }
  }
}

// YouTube API Service
export class YouTubeAPI {
  private apiKey: string

  constructor(apiKey?: string) {
    this.apiKey = apiKey || 'demo-key'
  }

  async getVideoComments(videoId: string): Promise<APIResponse<Comment[]>> {
    if (this.apiKey === 'demo-key') {
      return this.getDemoComments()
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${this.apiKey}&maxResults=100`,
        {
          method: 'GET'
        }
      )

      const data = await response.json()

      const comments: Comment[] = data.items?.map((item: unknown) => {
        const i = item as Record<string, unknown>
        const snippet = (i.snippet as Record<string, unknown>)?.topLevelComment as Record<string, unknown>
        const commentSnippet = snippet?.snippet as Record<string, unknown>
        return {
          id: String(i.id || ''),
          username: String(commentSnippet?.authorDisplayName || 'Unknown'),
          text: String(commentSnippet?.textDisplay || ''),
          timestamp: String(commentSnippet?.publishedAt || ''),
          likes: Number(commentSnippet?.likeCount || 0),
          verified: false
        }
      }) || []

      return { success: true, data: comments }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: []
      }
    }
  }

  private getDemoComments(): APIResponse<Comment[]> {
    const demoComments: Comment[] = [
      {
        id: '1',
        username: 'TechReviewer2024',
        text: 'First! Amazing giveaway, been subscribed for years! 🔥',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        likes: 234,
        verified: true
      },
      {
        id: '2',
        username: 'GamingWithFriends',
        text: 'This is exactly what I needed for my setup! Good luck everyone 🎮',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        likes: 156,
        verified: false
      }
    ]

    return { success: true, data: demoComments }
  }
}

// TikTok API Service
export class TikTokAPI {
  private accessToken: string

  constructor(accessToken?: string) {
    this.accessToken = accessToken || 'demo-token'
  }

  async getVideoComments(videoId: string): Promise<APIResponse<Comment[]>> {
    if (this.accessToken === 'demo-token') {
      return this.getDemoComments()
    }

    // Note: TikTok API access is limited and requires special approval
    // This is a simplified implementation
    try {
      const response = await fetch(
        `https://open-api.tiktok.com/video/comment/list/?video_id=${videoId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()

      const comments: Comment[] = data.data?.comments?.map((comment: unknown) => {
        const c = comment as Record<string, unknown>
        return {
          id: String(c.id || ''),
          username: String((c.user as Record<string, unknown>)?.display_name || 'Unknown'),
          text: String(c.text || ''),
          timestamp: new Date(Number(c.create_time || 0) * 1000).toISOString(),
          likes: Number(c.like_count || 0),
          verified: false
        }
      }) || []

      return { success: true, data: comments }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: []
      }
    }
  }

  private getDemoComments(): APIResponse<Comment[]> {
    const demoComments: Comment[] = [
      {
        id: '1',
        username: 'dancing_queen_2024',
        text: 'This is fire! 🔥🔥🔥 Count me in!',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        likes: 142,
        verified: false
      },
      {
        id: '2',
        username: 'viral_content_king',
        text: 'OMG yes! This trend is everything ✨',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        likes: 89,
        verified: true
      }
    ]

    return { success: true, data: demoComments }
  }
}

// Unified API Service
export class SocialMediaAPIService {
  private instagram: InstagramAPI
  private facebook: FacebookAPI
  private youtube: YouTubeAPI
  private tiktok: TikTokAPI

  constructor(credentials?: {
    instagram?: string
    facebook?: string
    youtube?: string
    tiktok?: string
  }) {
    this.instagram = new InstagramAPI(credentials?.instagram)
    this.facebook = new FacebookAPI(credentials?.facebook)
    this.youtube = new YouTubeAPI(credentials?.youtube)
    this.tiktok = new TikTokAPI(credentials?.tiktok)
  }

  async getComments(platform: string, postId: string): Promise<APIResponse<Comment[]>> {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return this.instagram.getPostComments(postId)
      case 'facebook':
        return this.facebook.getPostComments(postId)
      case 'youtube':
        return this.youtube.getVideoComments(postId)
      case 'tiktok':
        return this.tiktok.getVideoComments(postId)
      default:
        return {
          success: false,
          error: 'Unsupported platform',
          data: []
        }
    }
  }

  // Utility function to extract post/video ID from URL
  static extractPostId(url: string, platform: string): string | null {
    try {
      const urlObj = new URL(url)

      switch (platform.toLowerCase()) {
        case 'instagram': {
          const instaMatch = url.match(/\/p\/([^\/]+)/)
          return instaMatch ? instaMatch[1] : null
        }

        case 'facebook': {
          const fbMatch = url.match(/\/posts\/([^\/]+)/) || url.match(/story_fbid=([^&]+)/)
          return fbMatch ? fbMatch[1] : null
        }

        case 'youtube': {
          const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
          return ytMatch ? ytMatch[1] : null
        }

        case 'tiktok': {
          const ttMatch = url.match(/\/video\/(\d+)/)
          return ttMatch ? ttMatch[1] : null
        }

        default:
          return null
      }
    } catch {
      return null
    }
  }
}
