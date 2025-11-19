import { FlashcardData } from '@/components/flashcard/Flashcard'

export type StudyMode = 'quick-drill' | 'deep-session' | 'exam-mimic' | 'custom-drill' | 'random-250'

export interface StudySessionConfig {
  mode: StudyMode
  duration?: number // minutes
  cardCount?: number
  categories?: string[]
  chapterId?: number
  chapterIds?: number[]
  difficulty?: string[]
  includeWeakAreas?: boolean
  shuffled?: boolean
}

export interface StudySessionState {
  id: string
  config: StudySessionConfig
  cards: FlashcardData[]
  currentIndex: number
  startTime: number
  cardStartTime: number
  responses: StudyResponse[]
  isComplete: boolean
  isPaused: boolean
}

export interface StudyResponse {
  cardId: string
  timeSpent: number
  difficulty: 'easy' | 'good' | 'hard' | 'again'
  confidence: number // 1-5 scale
  timestamp: number
  isCorrect?: boolean
}

export interface SessionStats {
  totalCards: number
  completedCards: number
  averageTime: number
  accuracy: number
  weakAreas: string[]
  strongAreas: string[]
  sessionDuration: number
  mode: StudyMode
}

export class StudySessionManager {
  private session: StudySessionState | null = null

  createSession(config: StudySessionConfig, cards: FlashcardData[]): StudySessionState {
    let sessionCards = [...cards]

    // Filter by chapterId if specified
    if (config.chapterId) {
      sessionCards = sessionCards.filter(card => card.chapterNumber === config.chapterId)
    }

    // Filter by multiple chapterIds if specified
    if (config.chapterIds?.length) {
      sessionCards = sessionCards.filter(card => 
        card.chapterNumber && config.chapterIds?.includes(card.chapterNumber)
      )
    }

    // Filter by categories if specified
    if (config.categories?.length) {
      sessionCards = sessionCards.filter(card => 
        config.categories?.some(cat => 
          card.tags.includes(cat) || 
          card.chapterTitle?.toLowerCase().includes(cat.toLowerCase())
        )
      )
    }

    // Filter by difficulty if specified
    if (config.difficulty?.length) {
      sessionCards = sessionCards.filter(card => 
        config.difficulty?.includes(card.difficulty)
      )
    }

    // Limit card count based on mode
    if (config.cardCount) {
      sessionCards = sessionCards.slice(0, config.cardCount)
    } else {
      // Default limits based on mode
      switch (config.mode) {
        case 'quick-drill':
          sessionCards = sessionCards.slice(0, 10)
          break
        case 'deep-session':
          sessionCards = sessionCards.slice(0, 25)
          break
        case 'exam-mimic':
          sessionCards = sessionCards.slice(0, 50)
          break
        case 'random-250':
          sessionCards = sessionCards.slice(0, 250)
          break
      }
    }

    // Shuffle if requested
    if (config.shuffled !== false) {
      sessionCards = this.shuffleArray(sessionCards)
    }

    const session: StudySessionState = {
      id: `session_${Date.now()}`,
      config,
      cards: sessionCards,
      currentIndex: 0,
      startTime: Date.now(),
      cardStartTime: Date.now(),
      responses: [],
      isComplete: false,
      isPaused: false
    }

    this.session = session
    return session
  }

  getCurrentCard(): FlashcardData | null {
    if (!this.session || this.session.isComplete) return null
    return this.session.cards[this.session.currentIndex] || null
  }

  recordResponse(response: Omit<StudyResponse, 'cardId' | 'timestamp'>): boolean {
    if (!this.session || this.session.isComplete) return false

    const currentCard = this.getCurrentCard()
    if (!currentCard) return false

    const fullResponse: StudyResponse = {
      cardId: currentCard.id,
      timestamp: Date.now(),
      ...response
    }

    this.session.responses.push(fullResponse)
    return true
  }

  nextCard(): FlashcardData | null {
    if (!this.session) return null

    this.session.currentIndex++
    this.session.cardStartTime = Date.now()

    // Check if session is complete
    if (this.session.currentIndex >= this.session.cards.length) {
      this.session.isComplete = true
      return null
    }

    return this.getCurrentCard()
  }

  previousCard(): FlashcardData | null {
    if (!this.session || this.session.currentIndex <= 0) return null
    
    this.session.currentIndex--
    this.session.cardStartTime = Date.now()
    return this.getCurrentCard()
  }

  pauseSession(): void {
    if (this.session) {
      this.session.isPaused = true
    }
  }

  resumeSession(): void {
    if (this.session) {
      this.session.isPaused = false
      this.session.cardStartTime = Date.now()
    }
  }

  getProgress(): { current: number; total: number; percentage: number } {
    if (!this.session) return { current: 0, total: 0, percentage: 0 }
    
    return {
      current: this.session.currentIndex + 1,
      total: this.session.cards.length,
      percentage: Math.round(((this.session.currentIndex + 1) / this.session.cards.length) * 100)
    }
  }

  getSessionStats(): SessionStats | null {
    if (!this.session) return null

    const responses = this.session.responses
    const totalTime = Date.now() - this.session.startTime

    // Calculate average time per card
    const averageTime = responses.length > 0 
      ? responses.reduce((sum, r) => sum + r.timeSpent, 0) / responses.length 
      : 0

    // Calculate accuracy based on confidence and difficulty ratings
    const totalConfidence = responses.reduce((sum, r) => sum + r.confidence, 0)
    const accuracy = responses.length > 0 ? (totalConfidence / (responses.length * 5)) * 100 : 0

    // Identify weak and strong areas
    const areaPerformance = this.analyzeAreas(responses)

    return {
      totalCards: this.session.cards.length,
      completedCards: responses.length,
      averageTime: Math.round(averageTime / 1000), // Convert to seconds
      accuracy: Math.round(accuracy),
      weakAreas: areaPerformance.weak,
      strongAreas: areaPerformance.strong,
      sessionDuration: Math.round(totalTime / 1000), // Convert to seconds
      mode: this.session.config.mode
    }
  }

  private analyzeAreas(responses: StudyResponse[]): { weak: string[]; strong: string[] } {
    if (!this.session) return { weak: [], strong: [] }

    const areaScores: Record<string, { total: number; count: number }> = {}

    responses.forEach(response => {
      const card = this.session!.cards.find(c => c.id === response.cardId)
      if (!card) return

      card.tags.forEach(tag => {
        if (!areaScores[tag]) {
          areaScores[tag] = { total: 0, count: 0 }
        }
        areaScores[tag].total += response.confidence
        areaScores[tag].count += 1
      })
    })

    const areas = Object.entries(areaScores).map(([tag, scores]) => ({
      tag,
      average: scores.total / scores.count
    }))

    const weak = areas.filter(area => area.average < 3).map(area => area.tag)
    const strong = areas.filter(area => area.average >= 4).map(area => area.tag)

    return { weak, strong }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  getSession(): StudySessionState | null {
    return this.session
  }

  endSession(): SessionStats | null {
    if (!this.session) return null
    
    const stats = this.getSessionStats()
    this.session = null
    return stats
  }
}

// Singleton instance for app-wide session management
export const studySessionManager = new StudySessionManager()

// Helper functions for different study modes
export function getDefaultConfig(mode: StudyMode): StudySessionConfig {
  const configs: Record<StudyMode, StudySessionConfig> = {
    'quick-drill': {
      mode: 'quick-drill',
      duration: 10,
      cardCount: 10,
      shuffled: true,
      includeWeakAreas: false
    },
    'deep-session': {
      mode: 'deep-session',
      duration: 30,
      cardCount: 25,
      shuffled: true,
      includeWeakAreas: true
    },
    'exam-mimic': {
      mode: 'exam-mimic',
      duration: 60,
      cardCount: 50,
      shuffled: true,
      includeWeakAreas: false
    },
    'custom-drill': {
      mode: 'custom-drill',
      duration: 0, // Unlimited
      shuffled: true,
      includeWeakAreas: false
    },
    'random-250': {
      mode: 'random-250',
      duration: 120,
      cardCount: 250,
      shuffled: true,
      includeWeakAreas: false
    }
  }

  return configs[mode]
}