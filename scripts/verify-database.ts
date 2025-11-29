#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyDatabase() {
  try {
    console.log('🔍 Verifying ChapterFlashEMT Database...\n')
    
    // Count everything
    const flashcardCount = await prisma.flashcard.count()
    const categoryCount = await prisma.category.count()
    const chapterCount = await prisma.chapter.count()
    
    console.log('📊 Database Summary:')
    console.log(`  💳 Flashcards: ${flashcardCount}`)
    console.log(`  📁 Categories: ${categoryCount}`)
    console.log(`  📚 Chapters: ${chapterCount}`)
    console.log()
    
    // Sample some flashcards
    const sampleFlashcards = await prisma.flashcard.findMany({
      take: 5,
      include: {
        category: true,
        chapter: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log('🎯 Recent Flashcards Sample:')
    sampleFlashcards.forEach((card, index) => {
      console.log(`  ${index + 1}. ${card.question}`)
      console.log(`     📖 ${card.chapter?.title || 'No Chapter'}`)
      console.log(`     🏷️  ${card.category?.name || 'No Category'}`)
      console.log(`     ⚡ ${card.difficulty} • ${card.type}`)
      console.log()
    })
    
    // Count by difficulty
    const difficulties = await prisma.flashcard.groupBy({
      by: ['difficulty'],
      _count: {
        difficulty: true
      }
    })
    
    console.log('📈 Difficulty Breakdown:')
    difficulties.forEach(diff => {
      console.log(`  ${diff.difficulty}: ${diff._count.difficulty} cards`)
    })
    console.log()
    
    // Count by type
    const types = await prisma.flashcard.groupBy({
      by: ['type'],
      _count: {
        type: true
      }
    })
    
    console.log('🎭 Type Breakdown:')
    types.forEach(type => {
      console.log(`  ${type.type}: ${type._count.type} cards`)
    })
    
    console.log('\n✅ Database verification complete!')
    
  } catch (error) {
    console.error('❌ Error verifying database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyDatabase()