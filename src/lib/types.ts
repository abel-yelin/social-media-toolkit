// Instagram Comment Types
export interface InstagramComment {
  username: string
  comment: string
  timestamp: string
  likes: number
  verified: boolean
}

// Giveaway Winner Types
export interface GiveawayWinner extends InstagramComment {
  position: number
}

// Feature Interface
export interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

// Testimonial Interface
export interface Testimonial {
  name: string
  handle: string
  platform: string
  text: string
  highlight: string
}

// Statistics Interface
export interface Statistic {
  label: string
  value: number | string
  icon: string
}

// Navigation Item Types
export interface NavigationSubItem {
  name: string
  href: string
  external?: boolean
}

export interface NavigationItem {
  title: string
  items: NavigationSubItem[]
}

// Platform Rating Interface
export interface PlatformRating {
  platform: string
  rating: string
}

// Social Platform Interface
export interface SocialPlatform {
  name: string
  color: string
}
