#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define the chapter type with flashcards
type ChapterWithFlashcards = {
  id: number
  number: number
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  flashcards: Array<{
    id: string
    question: string
    answer: string
    difficulty: string
    certificationLevel: string
    type: string
    tags: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    chapterNumber: number | null
    categoryId: number | null
  }>
}

async function verifyChapters() {
  try {
    console.log('📚 Detailed Chapter Analysis...\n')
    
    // Get all chapters with card counts
    const chapters: ChapterWithFlashcards[] = await prisma.chapter.findMany({
      include: {
        flashcards: {
          where: {
            isActive: true
          }
        }
      },
      orderBy: {
        number: 'asc'
      }
    })
    
    console.log(`📊 Found ${chapters.length} chapters:\n`)
    
    chapters.forEach((chapter: ChapterWithFlashcards, index: number) => {
      console.log(`${(index + 1).toString().padStart(2, ' ')}. Chapter ${chapter.number.toString().padStart(2, ' ')}: ${chapter.title}`)
      console.log(`    💳 ${chapter.flashcards.length} flashcards`)
      console.log('')
    })
    
    // Verify we have chapters 1-45
    const missingChapters: number[] = []
    for (let i = 1; i <= 45; i++) {
      const chapterExists = chapters.find((ch: ChapterWithFlashcards) => ch.number === i)
      if (!chapterExists) {
        missingChapters.push(i)
      }
    }
    
    if (missingChapters.length === 0) {
      console.log('✅ All 45 EMT-B chapters are present!')
    } else {
      console.log(`❌ Missing chapters: ${missingChapters.join(', ')}`)
    }
    
    // Calculate total cards
    const totalCards = chapters.reduce((sum: number, ch: ChapterWithFlashcards) => sum + ch.flashcards.length, 0)
    console.log(`\n📈 Total flashcards across all chapters: ${totalCards}`)
    
    // Find chapters with no cards
    const emptyChapters = chapters.filter((ch: ChapterWithFlashcards) => ch.flashcards.length === 0)
    if (emptyChapters.length > 0) {
      console.log(`\n⚠️  Chapters with no flashcards:`)
      emptyChapters.forEach((ch: ChapterWithFlashcards) => {
        console.log(`   Chapter ${ch.number}: ${ch.title}`)
      })
    }
    
    // Show chapters with most/least cards
    const sortedByCards = [...chapters].sort((a: ChapterWithFlashcards, b: ChapterWithFlashcards) => b.flashcards.length - a.flashcards.length)
    console.log(`\n🔝 Most cards: Chapter ${sortedByCards[0].number} - ${sortedByCards[0].title} (${sortedByCards[0].flashcards.length} cards)`)
    console.log(`🔻 Least cards: Chapter ${sortedByCards[sortedByCards.length - 1].number} - ${sortedByCards[sortedByCards.length - 1].title} (${sortedByCards[sortedByCards.length - 1].flashcards.length} cards)`)
    
  } catch (error) {
    console.error('❌ Error verifying chapters:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyChapters()