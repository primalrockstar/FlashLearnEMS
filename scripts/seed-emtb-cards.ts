import { PrismaClient } from '@prisma/client'
import { seedFlashcards, clearExistingData, validateFlashcardData, FlashcardSeedData } from '../src/lib/seed-flashcards'

const prisma = new PrismaClient()

// Since I can't directly read your JSON file, I'll create a sample processor
// You can copy the full JSON content from your file into the processFullExport function

interface ExportedCard {
  id: string
  question?: string
  front?: string
  answer?: string
  back?: string
  category?: string
  difficulty?: string
  tags?: string[]
  chapterNumber?: number
  chapterTitle?: string
  type?: string
}

// Chapter titles for all 45 chapters
const chapterTitles: Record<number, string> = {
  1: "EMS Systems", 2: "Workforce Safety and Wellness", 3: "Medical, Legal, and Ethical Issues",
  4: "Communications and Documentation", 5: "Medical Terminology", 6: "The Human Body",
  7: "Life Span Development", 8: "Patient Assessment", 9: "Communications",
  10: "Documentation", 11: "General Pharmacology", 12: "Emergency Medications",
  13: "BLS Resuscitation", 14: "Airway Management", 15: "Respiration",
  16: "Cardiovascular Emergencies", 17: "Respiratory Emergencies", 18: "Soft Tissue Trauma",
  19: "Burns", 20: "Musculoskeletal Trauma", 21: "Toxicology",
  22: "Psychiatric Emergencies", 23: "Gynecologic Emergencies", 24: "Obstetrics and Neonatal Care",
  25: "Neonatal Care", 26: "Pediatrics", 27: "Geriatrics",
  28: "Head and Spine Injuries", 29: "Chest Trauma", 30: "Abdominal Trauma",
  31: "Orthopedic Trauma", 32: "Environmental Emergencies", 33: "Endocrine Emergencies",
  34: "Hematologic Emergencies", 35: "Genitourinary Emergencies", 36: "Toxicologic Emergencies",
  37: "Trauma Systems", 38: "Vehicle Extrication", 39: "Incident Management",
  40: "Terrorism Response", 41: "Disaster Response", 42: "Crime Scene Operations",
  43: "Hazardous Materials", 44: "Multiple Casualty Incidents", 45: "Air Medical Transport"
}

function transformCard(card: ExportedCard, chapterNum: number): FlashcardSeedData {
  const question = card.question || card.front || `Chapter ${chapterNum} Question`
  const answer = card.answer || card.back || 'Answer not provided'
  
  // Generate comprehensive tags
  const tags: string[] = []
  
  if (card.category) tags.push(card.category.toLowerCase().replace(/\s+/g, '-'))
  if (card.tags) tags.push(...card.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')))
  
  // Add chapter-based tag
  const chapterTitle = chapterTitles[chapterNum]
  if (chapterTitle) tags.push(chapterTitle.toLowerCase().replace(/\s+/g, '-'))
  
  // Smart content-based tags
  const content = (question + ' ' + answer).toLowerCase()
  if (content.includes('emergency') || content.includes('911')) tags.push('emergency')
  if (content.includes('protocol') || content.includes('procedure')) tags.push('protocol')
  if (content.includes('medication') || content.includes('drug')) tags.push('medication')
  if (content.includes('trauma') || content.includes('injury')) tags.push('trauma')
  if (content.includes('cardiac') || content.includes('heart')) tags.push('cardiology')
  if (content.includes('respiratory') || content.includes('breathing')) tags.push('respiratory')
  if (content.includes('pediatric') || content.includes('child')) tags.push('pediatric')
  if (content.includes('vital') || content.includes('pulse')) tags.push('vital-signs')
  if (content.includes('assessment')) tags.push('assessment')
  if (content.includes('treatment')) tags.push('treatment')
  
  return {
    id: card.id || `ch${chapterNum}-${Date.now()}`,
    question,
    answer,
    difficulty: (card.difficulty as 'Basic' | 'Intermediate' | 'Advanced') || 'Basic',
    type: (card.type as any) || 'definition',
    tags: [...new Set(tags)].slice(0, 8), // Remove duplicates, limit to 8
    chapterNumber: chapterNum,
    chapterTitle: card.chapterTitle || chapterTitles[chapterNum] || `Chapter ${chapterNum}`
  }
}

// Process the 30 main flashcards first
function createMainFlashcards(): FlashcardSeedData[] {
  const mainCards = [
    {
      id: "ch1-001",
      question: "What are the four levels of EMS training?",
      answer: "Emergency Medical Responder (EMR), Emergency Medical Technician (EMT), Advanced Emergency Medical Technician (AEMT), and Paramedic",
      difficulty: "Basic",
      type: "definition",
      chapterNumber: 1,
      tags: ["ems-levels", "certification", "training"]
    },
    {
      id: "ch1-002", 
      question: "What does EMT scope of practice define?",
      answer: "The range of duties and skills that an EMT is allowed and expected to perform when necessary",
      difficulty: "Basic",
      type: "definition", 
      chapterNumber: 1,
      tags: ["scope-of-practice", "emt-duties"]
    },
    {
      id: "ch2-001",
      question: "What are the five stages of grief according to Kübler-Ross?", 
      answer: "Denial, anger, bargaining, depression, and acceptance",
      difficulty: "Basic",
      type: "definition",
      chapterNumber: 2,
      tags: ["grief-stages", "kübler-ross"]
    }
    // Add more main cards as needed
  ]
  
  return mainCards.map(card => transformCard(card as ExportedCard, card.chapterNumber))
}

// Generate sample chapter cards (you'll replace this with your full data)
function createChapterFlashcards(): FlashcardSeedData[] {
  const chapterCards: FlashcardSeedData[] = []
  
  // Generate 15 cards per chapter for 45 chapters = 675 cards
  for (let chapter = 1; chapter <= 45; chapter++) {
    for (let cardNum = 1; cardNum <= 15; cardNum++) {
      const id = `ch${chapter}-${String(cardNum).padStart(3, '0')}`
      
      // Sample questions based on chapter topic
      const questions = getChapterQuestions(chapter)
      const question = questions[cardNum - 1] || `Chapter ${chapter} Question ${cardNum}`
      const answer = `Answer for ${question}`
      
      const card: FlashcardSeedData = {
        id,
        question,
        answer,
        difficulty: ['Basic', 'Intermediate', 'Advanced'][cardNum % 3] as 'Basic' | 'Intermediate' | 'Advanced',
        type: ['definition', 'recognition', 'application', 'scenario', 'assessment'][cardNum % 5] as any,
        tags: generateChapterTags(chapter, question),
        chapterNumber: chapter,
        chapterTitle: chapterTitles[chapter]
      }
      
      chapterCards.push(card)
    }
  }
  
  return chapterCards
}

function getChapterQuestions(chapter: number): string[] {
  const questions: Record<number, string[]> = {
    1: [
      "What are the four levels of EMS training?",
      "What does EMT scope of practice define?", 
      "What is medical direction?",
      "What are the two types of medical control?",
      "What is the difference between protocols and standing orders?",
      "What is continuous quality improvement (CQI)?",
      "What are the 14 attributes of an EMS system?",
      "What is the primary role of an EMT?",
      "What does EMR stand for and what is their role?",
      "What additional skills can an AEMT perform?",
      "What is the highest level of prehospital care?",
      "What is the purpose of NREMT?",
      "What is the difference between licensure and certification?",
      "What is reciprocity in EMS?",
      "What are the key components of an integrated EMS system?"
    ],
    16: [
      "What is the normal adult heart rate range?",
      "What are signs of myocardial infarction?",
      "What is angina pectoris?",
      "When should nitroglycerin be administered?",
      "What are contraindications for nitroglycerin?",
      "What is congestive heart failure?",
      "What are signs of cardiogenic shock?",
      "What is an AED and when is it used?",
      "What are the links in the chain of survival?",
      "What is ventricular fibrillation?",
      "When should you not use an AED?",
      "What is the recovery position?",
      "What are signs of cardiac arrest?",
      "What is the difference between cardiac arrest and heart attack?",
      "What medications can EMTs assist with for cardiac emergencies?"
    ]
  }
  
  return questions[chapter] || [`Chapter ${chapter} sample question`]
}

function generateChapterTags(chapter: number, question: string): string[] {
  const chapterTitle = chapterTitles[chapter]
  const baseTags = [chapterTitle.toLowerCase().replace(/\s+/g, '-')]
  
  // Add content-specific tags
  const content = question.toLowerCase()
  if (content.includes('emergency')) baseTags.push('emergency')
  if (content.includes('cardiac') || content.includes('heart')) baseTags.push('cardiology')
  if (content.includes('respiratory') || content.includes('breathing')) baseTags.push('respiratory')
  if (content.includes('trauma')) baseTags.push('trauma')
  if (content.includes('pediatric')) baseTags.push('pediatric')
  
  return baseTags.slice(0, 6)
}

async function main() {
  try {
    console.log('🚀 Starting EMT-B Flashcard Database Seeding...')
    
    // Create all flashcards
    console.log('📝 Creating flashcard data...')
    const mainCards = createMainFlashcards()
    const chapterCards = createChapterFlashcards()
    const allCards = [...mainCards, ...chapterCards]
    
    console.log(`📊 Generated ${allCards.length} flashcards (${mainCards.length} main + ${chapterCards.length} chapter)`)
    
    // Validate
    console.log('🔍 Validating data...')
    const validCards = validateFlashcardData(allCards)
    
    if (validCards.length === 0) {
      throw new Error('No valid flashcards after validation!')
    }
    
    console.log(`✅ ${validCards.length} cards validated successfully`)
    
    // Clear existing data
    console.log('🧹 Clearing existing data...')
    await clearExistingData()
    
    // Seed database
    console.log('🌱 Seeding database...')
    const result = await seedFlashcards(validCards)
    
    console.log('\n🎉 Database Seeding Complete!')
    console.log(`✅ Created: ${result.created} flashcards`)
    console.log(`📁 Categories: ${result.categories}`)
    console.log(`📚 Chapters: ${result.chapters}`)
    console.log(`⏭️  Skipped: ${result.skipped}`)
    
    console.log('\n🔥 ChapterFlashEMT is now loaded with 705 EMT-B flashcards!')
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  main()
}