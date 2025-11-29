/**
 * ChapterFlashEMT - Rate Limiting & Anti-Scraping
 * Detect and prevent automated scraping/bulk access
 */

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  blockDuration?: number
}

interface RequestRecord {
  timestamp: number
  action: string
  count: number
}

class RateLimiter {
  private requests: RequestRecord[] = []
  private blocked: boolean = false
  private blockUntil: number = 0

  // Default limits
  private readonly FLASHCARD_LIMIT = 50 // cards per minute
  private readonly API_LIMIT = 100 // API calls per minute
  private readonly WINDOW_MS = 60000 // 1 minute
  private readonly BLOCK_DURATION = 300000 // 5 minutes

  /**
   * Check if an action can proceed
   */
  canProceed(action: string = 'general', limit?: number): boolean {
    const now = Date.now()

    // Check if currently blocked
    if (this.blocked && now < this.blockUntil) {
      console.warn('🚫 Rate limit exceeded - access temporarily blocked')
      return false
    } else if (this.blocked && now >= this.blockUntil) {
      // Unblock
      this.blocked = false
      this.requests = []
    }

    // Clean old requests outside the window
    this.requests = this.requests.filter(
      req => now - req.timestamp < this.WINDOW_MS
    )

    // Get action-specific limit
    const maxRequests = limit || this.getActionLimit(action)

    // Count requests for this action
    const actionRequests = this.requests.filter(req => req.action === action)
    const totalCount = actionRequests.reduce((sum, req) => sum + req.count, 0)

    if (totalCount >= maxRequests) {
      // Limit exceeded - block user
      this.blocked = true
      this.blockUntil = now + this.BLOCK_DURATION
      this.logSuspiciousActivity(action, totalCount)
      return false
    }

    // Record this request
    this.requests.push({
      timestamp: now,
      action,
      count: 1
    })

    return true
  }

  /**
   * Get limit for specific action type
   */
  private getActionLimit(action: string): number {
    switch (action) {
      case 'flashcard_view':
        return this.FLASHCARD_LIMIT
      case 'api_call':
        return this.API_LIMIT
      case 'export_data':
        return 5 // Only 5 exports per minute
      case 'chapter_access':
        return 20 // 20 chapters per minute
      default:
        return 100
    }
  }

  /**
   * Log suspicious activity for monitoring
   */
  private logSuspiciousActivity(action: string, count: number): void {
    const log = {
      timestamp: new Date().toISOString(),
      action,
      requestCount: count,
      userAgent: navigator.userAgent,
      message: '⚠️ Suspicious activity detected - possible scraping attempt'
    }

    console.warn('SECURITY ALERT:', log)

    // Store in localStorage for admin review
    const storageKey = 'chapterflash_security_logs'
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]')
    existing.push(log)
    
    // Keep only last 50 logs
    if (existing.length > 50) {
      existing.shift()
    }
    
    localStorage.setItem(storageKey, JSON.stringify(existing))
  }

  /**
   * Check for bot-like behavior patterns
   */
  detectBotBehavior(): boolean {
    const now = Date.now()
    
    // Pattern 1: Too many requests in very short time
    const recentRequests = this.requests.filter(
      req => now - req.timestamp < 5000 // Last 5 seconds
    )
    if (recentRequests.length > 20) {
      console.warn('🤖 Bot behavior detected: Rapid requests')
      return true
    }

    // Pattern 2: Perfectly timed requests (automated script)
    const intervals = this.requests
      .map((req, i, arr) => {
        if (i === 0) return null
        return req.timestamp - arr[i - 1].timestamp
      })
      .filter(Boolean) as number[]

    if (intervals.length > 10) {
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
      const variance = intervals.reduce((sum, interval) => {
        return sum + Math.pow(interval - avgInterval, 2)
      }, 0) / intervals.length

      // Very low variance = likely automated
      if (variance < 100) {
        console.warn('🤖 Bot behavior detected: Perfectly timed requests')
        return true
      }
    }

    return false
  }

  /**
   * Get current rate limit status
   */
  getStatus() {
    const now = Date.now()
    const recentRequests = this.requests.filter(
      req => now - req.timestamp < this.WINDOW_MS
    )

    return {
      blocked: this.blocked,
      blockUntil: this.blockUntil,
      requestCount: recentRequests.length,
      maxRequests: this.API_LIMIT,
      windowMs: this.WINDOW_MS,
      timeUntilReset: this.WINDOW_MS - (now - (recentRequests[0]?.timestamp || now))
    }
  }

  /**
   * Reset rate limiter (admin function)
   */
  reset(): void {
    this.requests = []
    this.blocked = false
    this.blockUntil = 0
  }

  /**
   * Get security logs
   */
  getSecurityLogs(): any[] {
    const storageKey = 'chapterflash_security_logs'
    return JSON.parse(localStorage.getItem(storageKey) || '[]')
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter()

/**
 * Hook-friendly rate limit check
 */
export function useRateLimit(action: string = 'general'): {
  canProceed: () => boolean
  isBlocked: boolean
  status: ReturnType<RateLimiter['getStatus']>
} {
  const status = rateLimiter.getStatus()
  
  return {
    canProceed: () => rateLimiter.canProceed(action),
    isBlocked: status.blocked,
    status
  }
}

/**
 * Middleware for protecting API routes or actions
 */
export function withRateLimit<T extends (...args: any[]) => any>(
  fn: T,
  action: string = 'api_call'
): T {
  return ((...args: any[]) => {
    if (!rateLimiter.canProceed(action)) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }
    
    // Check for bot behavior
    if (rateLimiter.detectBotBehavior()) {
      throw new Error('Automated access detected. Please use the app normally.')
    }
    
    return fn(...args)
  }) as T
}
