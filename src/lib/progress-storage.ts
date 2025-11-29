/**
 * Progress Storage - Offline-first progress tracking
 * Stores all analytics data locally using IndexedDB and localStorage
 */

export interface StudySession {
  id: string
  timestamp: number
  duration: number // in seconds
  cardsStudied: number
  correctAnswers: number
  incorrectAnswers: number
  mode: 'quick-drill' | 'deep-study' | 'exam-mimic'
  chapters: string[]
  categories: string[]
}

export interface CardProgress {
  cardId: string
  timesStudied: number
  timesCorrect: number
  timesIncorrect: number
  lastStudied: number
  nextReview: number
  difficulty: 'easy' | 'medium' | 'hard'
  masteryLevel: number // 0-100
}

export interface ChapterProgress {
  chapterId: string
  chapterName: string
  cardsStudied: number
  totalCards: number
  masteryPercentage: number
  lastStudied: number
  averageAccuracy: number
}

export interface DailyStreak {
  date: string // YYYY-MM-DD
  sessionsCompleted: number
  cardsStudied: number
  minutesStudied: number
}

export interface ProgressStats {
  totalCardsStudied: number
  totalSessions: number
  totalMinutesStudied: number
  currentStreak: number
  longestStreak: number
  overallAccuracy: number
  weakAreas: string[]
  strongAreas: string[]
  lastStudied: number
  studyGoalMinutes: number
  studyGoalDays: number[]
}

class ProgressStorage {
  private dbName = 'ChapterFlashEMT_Progress'
  private dbVersion = 1
  private db: IDBDatabase | null = null

  // Initialize IndexedDB
  async init(): Promise<void> {
    if (typeof window === 'undefined') return

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains('sessions')) {
          const sessionsStore = db.createObjectStore('sessions', { keyPath: 'id' })
          sessionsStore.createIndex('timestamp', 'timestamp', { unique: false })
          sessionsStore.createIndex('mode', 'mode', { unique: false })
        }

        if (!db.objectStoreNames.contains('cardProgress')) {
          const cardsStore = db.createObjectStore('cardProgress', { keyPath: 'cardId' })
          cardsStore.createIndex('lastStudied', 'lastStudied', { unique: false })
          cardsStore.createIndex('nextReview', 'nextReview', { unique: false })
          cardsStore.createIndex('masteryLevel', 'masteryLevel', { unique: false })
        }

        if (!db.objectStoreNames.contains('chapterProgress')) {
          const chaptersStore = db.createObjectStore('chapterProgress', { keyPath: 'chapterId' })
          chaptersStore.createIndex('masteryPercentage', 'masteryPercentage', { unique: false })
        }

        if (!db.objectStoreNames.contains('dailyStreaks')) {
          const streaksStore = db.createObjectStore('dailyStreaks', { keyPath: 'date' })
          streaksStore.createIndex('date', 'date', { unique: true })
        }
      }
    })
  }

  // Study Sessions
  async saveSession(session: StudySession): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['sessions'], 'readwrite')
      const store = transaction.objectStore('sessions')
      const request = store.add(session)

      request.onsuccess = () => {
        this.updateDailyStreak(session)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getSessions(limit?: number): Promise<StudySession[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['sessions'], 'readonly')
      const store = transaction.objectStore('sessions')
      const index = store.index('timestamp')
      const request = index.openCursor(null, 'prev')
      const sessions: StudySession[] = []

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor && (!limit || sessions.length < limit)) {
          sessions.push(cursor.value)
          cursor.continue()
        } else {
          resolve(sessions)
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Card Progress
  async saveCardProgress(progress: CardProgress): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cardProgress'], 'readwrite')
      const store = transaction.objectStore('cardProgress')
      const request = store.put(progress)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getCardProgress(cardId: string): Promise<CardProgress | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cardProgress'], 'readonly')
      const store = transaction.objectStore('cardProgress')
      const request = store.get(cardId)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getAllCardProgress(): Promise<CardProgress[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cardProgress'], 'readonly')
      const store = transaction.objectStore('cardProgress')
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Chapter Progress
  async saveChapterProgress(progress: ChapterProgress): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['chapterProgress'], 'readwrite')
      const store = transaction.objectStore('chapterProgress')
      const request = store.put(progress)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getAllChapterProgress(): Promise<ChapterProgress[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['chapterProgress'], 'readonly')
      const store = transaction.objectStore('chapterProgress')
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Daily Streaks
  private async updateDailyStreak(session: StudySession): Promise<void> {
    const today = new Date().toISOString().split('T')[0]
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['dailyStreaks'], 'readwrite')
      const store = transaction.objectStore('dailyStreaks')
      const request = store.get(today)

      request.onsuccess = () => {
        const existing = request.result as DailyStreak | undefined
        const streak: DailyStreak = existing || {
          date: today,
          sessionsCompleted: 0,
          cardsStudied: 0,
          minutesStudied: 0
        }

        streak.sessionsCompleted += 1
        streak.cardsStudied += session.cardsStudied
        streak.minutesStudied += Math.round(session.duration / 60)

        const updateRequest = store.put(streak)
        updateRequest.onsuccess = () => resolve()
        updateRequest.onerror = () => reject(updateRequest.error)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getDailyStreaks(days: number = 30): Promise<DailyStreak[]> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['dailyStreaks'], 'readonly')
      const store = transaction.objectStore('dailyStreaks')
      const index = store.index('date')
      const request = index.openCursor(null, 'prev')
      const streaks: DailyStreak[] = []

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor && streaks.length < days) {
          streaks.push(cursor.value)
          cursor.continue()
        } else {
          resolve(streaks)
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  // Overall Stats
  async getProgressStats(): Promise<ProgressStats> {
    const sessions = await this.getSessions()
    const cardProgress = await this.getAllCardProgress()
    const streaks = await this.getDailyStreaks(365)

    const totalCardsStudied = cardProgress.length
    const totalSessions = sessions.length
    const totalMinutesStudied = sessions.reduce((sum, s) => sum + Math.round(s.duration / 60), 0)

    const correctAnswers = sessions.reduce((sum, s) => sum + s.correctAnswers, 0)
    const totalAnswers = sessions.reduce((sum, s) => sum + s.correctAnswers + s.incorrectAnswers, 0)
    const overallAccuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0

    // Calculate streaks
    const { currentStreak, longestStreak } = this.calculateStreaks(streaks)

    // Identify weak and strong areas
    const chapterProgress = await this.getAllChapterProgress()
    const sortedChapters = [...chapterProgress].sort((a, b) => a.averageAccuracy - b.averageAccuracy)
    const weakAreas = sortedChapters.slice(0, 3).map(c => c.chapterName)
    const strongAreas = sortedChapters.slice(-3).reverse().map(c => c.chapterName)

    const lastStudied = sessions.length > 0 ? sessions[0].timestamp : 0

    // Get study goals from localStorage
    const studyGoalMinutes = parseInt(localStorage.getItem('studyGoalMinutes') || '20')
    const studyGoalDays = JSON.parse(localStorage.getItem('studyGoalDays') || '[1,2,3,4,5]')

    return {
      totalCardsStudied,
      totalSessions,
      totalMinutesStudied,
      currentStreak,
      longestStreak,
      overallAccuracy,
      weakAreas,
      strongAreas,
      lastStudied,
      studyGoalMinutes,
      studyGoalDays
    }
  }

  private calculateStreaks(streaks: DailyStreak[]): { currentStreak: number; longestStreak: number } {
    if (streaks.length === 0) return { currentStreak: 0, longestStreak: 0 }

    const sortedStreaks = [...streaks].sort((a, b) => b.date.localeCompare(a.date))
    const today = new Date().toISOString().split('T')[0]
    
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0

    for (let i = 0; i < sortedStreaks.length; i++) {
      const expectedDate = new Date()
      expectedDate.setDate(expectedDate.getDate() - i)
      const expected = expectedDate.toISOString().split('T')[0]

      if (sortedStreaks[i].date === expected) {
        if (i === 0 || sortedStreaks[i].date === today || 
            this.isConsecutiveDay(sortedStreaks[i-1].date, sortedStreaks[i].date)) {
          tempStreak++
          if (tempStreak > longestStreak) longestStreak = tempStreak
        }
      } else {
        break
      }
    }

    currentStreak = tempStreak

    return { currentStreak, longestStreak }
  }

  private isConsecutiveDay(date1: string, date2: string): boolean {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2.getTime() - d1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1
  }

  // Export/Import for backup
  async exportData(): Promise<string> {
    const sessions = await this.getSessions()
    const cardProgress = await this.getAllCardProgress()
    const chapterProgress = await this.getAllChapterProgress()
    const streaks = await this.getDailyStreaks(365)

    const data = {
      version: 1,
      timestamp: Date.now(),
      sessions,
      cardProgress,
      chapterProgress,
      streaks
    }

    return JSON.stringify(data)
  }

  async importData(jsonData: string): Promise<void> {
    const data = JSON.parse(jsonData)
    
    // Import sessions
    for (const session of data.sessions) {
      await this.saveSession(session)
    }

    // Import card progress
    for (const progress of data.cardProgress) {
      await this.saveCardProgress(progress)
    }

    // Import chapter progress
    for (const progress of data.chapterProgress) {
      await this.saveChapterProgress(progress)
    }
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        ['sessions', 'cardProgress', 'chapterProgress', 'dailyStreaks'],
        'readwrite'
      )

      const stores = ['sessions', 'cardProgress', 'chapterProgress', 'dailyStreaks']
      let completed = 0

      stores.forEach(storeName => {
        const request = transaction.objectStore(storeName).clear()
        request.onsuccess = () => {
          completed++
          if (completed === stores.length) resolve()
        }
        request.onerror = () => reject(request.error)
      })
    })
  }
}

// Singleton instance
export const progressStorage = new ProgressStorage()
