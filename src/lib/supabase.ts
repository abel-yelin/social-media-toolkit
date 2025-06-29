import { createClient } from '@supabase/supabase-js'
import type { GiveawayWinner } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'demo-mode'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Only create client if valid URL is provided
export const supabase = (supabaseUrl.startsWith('https://')) ?
  createClient(supabaseUrl, supabaseAnonKey) :
  null

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface GiveawayHistory {
  id: string
  user_id: string
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube'
  post_url: string
  winner_count: number
  winners: GiveawayWinner[]
  comments_analyzed: number
  filters_applied: string[]
  created_at: string
}

export interface UserCredits {
  id: string
  user_id: string
  total_credits: number
  used_credits: number
  remaining_credits: number
  last_updated: string
}

// Demo database functions (will work without actual Supabase connection)
export class DatabaseService {
  static async createUser(userData: Partial<User>): Promise<User> {
    // In a real app, this would insert into Supabase
    return {
      id: `user_${Date.now()}`,
      email: userData.email || '',
      full_name: userData.full_name,
      avatar_url: userData.avatar_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    // Demo implementation
    return {
      id,
      email: 'demo@example.com',
      full_name: 'Demo User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  }

  static async saveGiveawayHistory(data: Partial<GiveawayHistory>): Promise<GiveawayHistory> {
    return {
      id: `giveaway_${Date.now()}`,
      user_id: data.user_id || '',
      platform: data.platform || 'instagram',
      post_url: data.post_url || '',
      winner_count: data.winner_count || 1,
      winners: data.winners || [],
      comments_analyzed: data.comments_analyzed || 0,
      filters_applied: data.filters_applied || [],
      created_at: new Date().toISOString()
    }
  }

  static async getGiveawayHistory(userId: string): Promise<GiveawayHistory[]> {
    // Demo data
    return [
      {
        id: 'demo_1',
        user_id: userId,
        platform: 'instagram',
        post_url: 'https://instagram.com/p/demo',
        winner_count: 3,
        winners: [
          {
            username: 'winner1',
            comment: 'Great giveaway!',
            position: 1,
            timestamp: new Date().toISOString(),
            likes: 0,
            verified: false
          },
          {
            username: 'winner2',
            comment: 'Love this!',
            position: 2,
            timestamp: new Date().toISOString(),
            likes: 0,
            verified: false
          },
          {
            username: 'winner3',
            comment: 'Amazing!',
            position: 3,
            timestamp: new Date().toISOString(),
            likes: 0,
            verified: false
          }
        ],
        comments_analyzed: 156,
        filters_applied: ['spam_filter', 'duplicate_filter'],
        created_at: new Date().toISOString()
      }
    ]
  }

  static async getUserCredits(userId: string): Promise<UserCredits> {
    return {
      id: `credits_${userId}`,
      user_id: userId,
      total_credits: 100,
      used_credits: 25,
      remaining_credits: 75,
      last_updated: new Date().toISOString()
    }
  }
}
