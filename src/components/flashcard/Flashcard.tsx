'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Target, AlertTriangle, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FlashcardData {
  id: string
  question: string
  answer: string
  difficulty: string
  type: string
  tags: string[]
  chapterNumber?: number
  chapterTitle?: string
}

interface FlashcardProps {
  flashcard: FlashcardData
  isFlipped: boolean
  onFlip: () => void
  showDifficulty?: boolean
  showTimer?: boolean
  startTime?: number
  className?: string
}

const difficultyColors = {
  Basic: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30',
  Intermediate: 'bg-amber-400/10 text-amber-100 border-amber-400/30', 
  Advanced: 'bg-red-500/10 text-red-200 border-red-500/30'
}

const typeIcons = {
  definition: '📖',
  recognition: '👁️',
  application: '⚡',
  scenario: '🏥',
  assessment: '📊'
}

const typeStyles = {
  definition: 'bg-blue-500/10 border-blue-500/30',
  recognition: 'bg-green-500/10 border-green-500/30',
  application: 'bg-purple-500/10 border-purple-500/30',
  scenario: 'bg-red-500/10 border-red-500/30',
  assessment: 'bg-cyan-500/10 border-cyan-500/30'
}

export function Flashcard({ 
  flashcard, 
  isFlipped, 
  onFlip, 
  showDifficulty = true,
  showTimer = false,
  startTime,
  className 
}: FlashcardProps) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    if (showTimer && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showTimer, startTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isProtocolOrEmergency = flashcard.tags.some(tag => 
    ['emergency', 'protocol', 'treatment', 'medication', 'procedure'].includes(tag.toLowerCase())
  ) || flashcard.type === 'scenario'

  return (
    <div className={cn("perspective-1000", className)}>
      <motion.div
        className="relative w-full h-96 preserve-3d cursor-pointer"
        onClick={onFlip}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Question Side */}
        <Card className="absolute inset-0 backface-hidden glass-card border-white/10 shadow-2xl">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{typeIcons[flashcard.type as keyof typeof typeIcons] || '📝'}</span>
                  <Badge className={cn(
                    "text-xs font-medium border",
                    typeStyles[flashcard.type as keyof typeof typeStyles] || 'bg-gray-500/10 border-gray-500/30'
                  )}>
                    {flashcard.type}
                  </Badge>
                </div>
                {flashcard.chapterNumber && (
                  <Badge variant="secondary" className="text-xs bg-white/10 border-white/20 text-white">
                    Ch. {flashcard.chapterNumber}
                  </Badge>
                )}
              </div>
              
              {showTimer && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/20 rounded-lg px-3 py-1 backdrop-blur-sm">
                  <Clock className="w-4 h-4" />
                  {formatTime(elapsedTime)}
                </div>
              )}
            </div>

            {/* Question */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-4">
                  <span className="text-primary">ChapterFlashEMT</span>
                  EMT-B
                </div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Question</h3>
                <p className="text-xl leading-relaxed text-foreground font-medium">
                  {flashcard.question}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-wrap gap-2">
                {flashcard.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-white/5 border-white/20 text-white/80">
                    {tag}
                  </Badge>
                ))}
                {flashcard.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-white/5 border-white/20 text-white/80">
                    +{flashcard.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              {showDifficulty && (
                <Badge className={cn(
                  "text-xs font-medium border",
                  difficultyColors[flashcard.difficulty as keyof typeof difficultyColors]
                )}>
                  <Target className="w-3 h-3 mr-1" />
                  {flashcard.difficulty}
                </Badge>
              )}
            </div>

            {/* Flip indicator */}
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">Click to reveal answer</p>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-primary text-lg"
              >
                ↻
              </motion.div>
            </div>
          </CardContent>
        </Card>

        {/* Answer Side */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 glass-card border-white/10 shadow-2xl">
          <CardContent className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <Badge className="text-xs bg-emerald-500/10 border-emerald-500/30 text-emerald-200">
                    Answer
                  </Badge>
                </div>
                {isProtocolOrEmergency && (
                  <Badge className="text-xs bg-amber-400/10 border-amber-400/30 text-amber-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Protocol
                  </Badge>
                )}
              </div>
              
              {showTimer && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/20 rounded-lg px-3 py-1 backdrop-blur-sm">
                  <Clock className="w-4 h-4" />
                  {formatTime(elapsedTime)}
                </div>
              )}
            </div>

            {/* Answer */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center max-w-md mb-4">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Answer</h3>
                <p className="text-xl leading-relaxed text-foreground font-medium mb-4">
                  {flashcard.answer}
                </p>
              </div>
              
              {/* Safety disclaimer for medical content */}
              {isProtocolOrEmergency && (
                <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-4 max-w-md backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-amber-200 mb-2">
                        Educational Content Only
                      </h4>
                      <p className="text-xs text-amber-200/90 leading-relaxed">
                        This content is for educational purposes only. Always follow local protocols, 
                        medical direction, and your scope of practice in real emergency situations. 
                        Consult current guidelines and your medical director.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">Click to flip back</p>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-primary text-lg"
              >
                ↻
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}