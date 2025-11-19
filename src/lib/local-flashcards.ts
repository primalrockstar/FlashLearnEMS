import flashcardsData from '@/data/flashcards-export.json'
import { FlashcardData } from '@/components/flashcard/Flashcard'

interface ExportedFlashcard {
  id: string
  question?: string
  answer?: string
  front?: string
  back?: string
  difficulty?: string
  category?: string
  tags?: string[]
  chapterNumber?: number
  type?: string
  moduleNumber?: number
}

interface ChapterCollection {
  chapterNumber: number
  flashcards: ExportedFlashcard[]
}

// Helper to normalize difficulty
const normalizeDifficulty = (diff?: string): string => {
  if (!diff) return 'Basic'
  const d = diff.toLowerCase()
  if (d.includes('basic') || d.includes('beginner')) return 'Basic'
  if (d.includes('intermediate')) return 'Intermediate'
  if (d.includes('advanced')) return 'Advanced'
  return 'Basic' // Default
}

// Helper to normalize type
const normalizeType = (type?: string): string => {
  if (!type) return 'definition'
  const t = type.toLowerCase()
  if (['definition', 'recognition', 'application', 'scenario', 'assessment'].includes(t)) return t
  return 'definition'
}

export const getAllLocalFlashcards = (): FlashcardData[] => {
  const allCards: FlashcardData[] = []
  
  // Safety check for data existence
  if (!flashcardsData || !flashcardsData.data) {
    console.warn('Flashcards data is missing or malformed')
    return []
  }

  const data = flashcardsData.data

  // Process main flashcards
  if (data.mainFlashcards && Array.isArray(data.mainFlashcards)) {
    data.mainFlashcards.forEach((card: any) => {
      try {
        allCards.push({
          id: card.id || `main-${Math.random().toString(36).substr(2, 9)}`,
          question: card.question || card.front || 'Question missing',
          answer: card.answer || card.back || 'Answer missing',
          difficulty: normalizeDifficulty(card.difficulty),
          type: normalizeType(card.type),
          tags: Array.isArray(card.tags) ? card.tags : [],
          chapterNumber: card.chapterNumber,
          chapterTitle: card.chapterNumber ? `Chapter ${card.chapterNumber}` : undefined
        })
      } catch (e) {
        console.warn('Error processing main flashcard:', card, e)
      }
    })
  }

  // Process chapter collections
  if (data.chapterCollections && Array.isArray(data.chapterCollections)) {
    data.chapterCollections.forEach((collection: any) => {
      if (collection && collection.flashcards && Array.isArray(collection.flashcards)) {
        collection.flashcards.forEach((card: any) => {
          try {
            allCards.push({
              id: card.id || `ch-${collection.chapterNumber}-${Math.random().toString(36).substr(2, 9)}`,
              question: card.question || card.front || 'Question missing',
              answer: card.answer || card.back || 'Answer missing',
              difficulty: normalizeDifficulty(card.difficulty),
              type: normalizeType(card.type),
              tags: Array.isArray(card.tags) ? card.tags : [],
              chapterNumber: collection.chapterNumber,
              chapterTitle: `Chapter ${collection.chapterNumber}`
            })
          } catch (e) {
            console.warn('Error processing chapter flashcard:', card, e)
          }
        })
      }
    })
  }

  return allCards
}

export const getChapterFlashcards = (chapterId: number): FlashcardData[] => {
  return getAllLocalFlashcards().filter(card => card.chapterNumber === chapterId)
}
