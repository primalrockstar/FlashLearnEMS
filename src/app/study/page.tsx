'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { StudyInterface } from '@/components/study/StudyInterface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/ui/logo'
import { MedicalDisclaimerBanner } from '@/components/ui/medical-disclaimer-banner'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  BarChart3,
  Home,
  Play,
  Settings,
  BookOpen
} from 'lucide-react'
import { StudySessionConfig, StudyMode, SessionStats, getDefaultConfig } from '@/lib/study-session'
import { getAllLocalFlashcards } from '@/lib/local-flashcards'
import { cn } from '@/lib/utils'

type ViewState = 'mode-selection' | 'studying' | 'results'

function StudyPageContent() {
  const searchParams = useSearchParams()
  const [viewState, setViewState] = useState<ViewState>('mode-selection')
  const [selectedConfig, setSelectedConfig] = useState<StudySessionConfig | null>(null)
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null)
  const [showChapterSelect, setShowChapterSelect] = useState(false)
  const [selectedChapters, setSelectedChapters] = useState<number[]>([])
  
  // Load all flashcards
  const allFlashcards = getAllLocalFlashcards()

  // Get unique chapters
  const chapters = Array.from(new Set(allFlashcards.map(card => card.chapterNumber)))
    .filter((id): id is number => typeof id === 'number')
    .sort((a, b) => a - b)

  useEffect(() => {
    const chapterId = searchParams.get('chapterId')
    if (chapterId) {
      const config: StudySessionConfig = {
        mode: 'deep-session',
        chapterId: parseInt(chapterId),
        cardCount: 100, // Ensure we get all cards for the chapter
        shuffled: true
      }
      setSelectedConfig(config)
      setViewState('studying')
    }
  }, [searchParams])

  const studyModes = [
    {
      mode: 'quick-drill' as StudyMode,
      title: 'Quick Drill',
      description: 'Fast-paced review session for quick retention checks',
      duration: '5-10 minutes',
      cardCount: '10 cards',
      icon: Brain,
      color: 'from-cyan-400 to-blue-500',
      textColor: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10 border-cyan-400/30',
      features: ['Rapid fire questions', 'Perfect for breaks', 'Basic concepts focus']
    },
    {
      mode: 'deep-session' as StudyMode,
      title: 'Deep Session', 
      description: 'Comprehensive study session with spaced repetition',
      duration: '20-30 minutes',
      cardCount: '25 cards',
      icon: Target,
      color: 'from-blue-400 to-purple-500',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-400/10 border-blue-400/30',
      features: ['Spaced repetition', 'Weak area targeting', 'All difficulty levels']
    },
    {
      mode: 'exam-mimic' as StudyMode,
      title: 'Exam Mimic',
      description: 'Full practice test simulation with realistic timing',
      duration: '45-60 minutes', 
      cardCount: '50 cards',
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-500',
      textColor: 'text-purple-400',
      bgColor: 'bg-purple-400/10 border-purple-400/30',
      features: ['Exam conditions', 'Comprehensive coverage', 'Performance analytics']
    },
    {
      mode: 'random-250' as StudyMode,
      title: 'Test Mode',
      description: 'Intensive 250-card session drawn randomly from all chapters',
      duration: '120+ minutes',
      cardCount: '250 cards',
      icon: Brain,
      color: 'from-red-400 to-orange-500',
      textColor: 'text-red-400',
      bgColor: 'bg-red-400/10 border-red-400/30',
      features: ['Massive review', 'Random selection', 'Endurance training']
    }
  ]

  const handleModeSelect = (mode: StudyMode) => {
    if (mode === 'custom-drill') {
      setShowChapterSelect(true)
      return
    }

    const config = getDefaultConfig(mode)
    setSelectedConfig(config)
    setViewState('studying')
  }

  const startCustomDrill = () => {
    if (selectedChapters.length === 0) return

    const config: StudySessionConfig = {
      mode: 'custom-drill',
      chapterIds: selectedChapters,
      shuffled: true,
      includeWeakAreas: false
    }
    setSelectedConfig(config)
    setViewState('studying')
    setShowChapterSelect(false)
  }

  const toggleChapter = (chapterId: number) => {
    setSelectedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const handleSessionEnd = (stats: SessionStats | null) => {
    setSessionStats(stats)
    setViewState('results')
  }

  const handleReturn = () => {
    setViewState('mode-selection')
    setSelectedConfig(null)
    setSessionStats(null)
  }

  const getGradeFromAccuracy = (accuracy: number) => {
    if (accuracy >= 90) return { grade: 'A', color: 'text-emerald-400' }
    if (accuracy >= 80) return { grade: 'B', color: 'text-blue-400' }
    if (accuracy >= 70) return { grade: 'C', color: 'text-yellow-400' }
    if (accuracy >= 60) return { grade: 'D', color: 'text-orange-400' }
    return { grade: 'F', color: 'text-red-400' }
  }

  if (viewState === 'studying' && selectedConfig) {
    return (
      <StudyInterface
        cards={allFlashcards}
        config={selectedConfig}
        onSessionEnd={handleSessionEnd}
        onExit={handleReturn}
      />
    )
  }

  if (viewState === 'results' && sessionStats) {
    const { grade, color } = getGradeFromAccuracy(sessionStats.accuracy)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-3xl mx-auto py-8">
          <Card className="glass-card backdrop-blur-xl">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-blue-500/20">
                <BarChart3 className="h-12 w-12 text-emerald-400 mx-auto" />
              </div>
              <CardTitle className="text-3xl mb-2">Session Complete!</CardTitle>
              <p className="text-muted-foreground">Great work on your study session</p>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Overall Grade */}
              <div className="text-center">
                <div className="inline-flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className={cn("text-6xl font-bold", color)}>{grade}</div>
                  <div>
                    <p className="text-lg font-semibold">Overall Performance</p>
                    <p className="text-sm text-muted-foreground">{sessionStats.accuracy}% accuracy</p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <BookOpen className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Cards Studied</p>
                  <p className="text-xl font-semibold">{sessionStats.completedCards}/{sessionStats.totalCards}</p>
                </div>
                
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <Clock className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Total Time</p>
                  <p className="text-xl font-semibold">{Math.floor(sessionStats.sessionDuration / 60)}m {sessionStats.sessionDuration % 60}s</p>
                </div>
                
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Avg. per Card</p>
                  <p className="text-xl font-semibold">{sessionStats.averageTime}s</p>
                </div>
                
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Study Mode</p>
                  <p className="text-xl font-semibold capitalize">{sessionStats.mode.replace('-', ' ')}</p>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-400/20">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </div>
                    Strong Areas
                  </h3>
                  <div className="space-y-2">
                    {sessionStats.strongAreas.length > 0 ? (
                      sessionStats.strongAreas.slice(0, 5).map((area, index) => (
                        <Badge key={index} variant="secondary" className="bg-emerald-400/10 border-emerald-400/30 text-emerald-200">
                          {area}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Complete more cards to identify strong areas</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-400/20">
                      <Target className="h-4 w-4 text-amber-400" />
                    </div>
                    Areas to Review
                  </h3>
                  <div className="space-y-2">
                    {sessionStats.weakAreas.length > 0 ? (
                      sessionStats.weakAreas.slice(0, 5).map((area, index) => (
                        <Badge key={index} variant="secondary" className="bg-amber-400/10 border-amber-400/30 text-amber-200">
                          {area}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Great job! No weak areas identified</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button onClick={() => handleModeSelect(sessionStats.mode)} className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Study Again
                </Button>
                <Button variant="outline" onClick={handleReturn} className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Choose New Mode
                </Button>
                <Button variant="outline" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Medical Disclaimer */}
      <MedicalDisclaimerBanner variant="compact" className="mb-4 mx-4 rounded-xl" />
      
      <div className="max-w-6xl mx-auto py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <span className="text-primary">Study Center</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
            Choose Your Study Mode
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a study mode that matches your learning goals and available time. 
            Each mode is optimized for different types of practice and retention.
          </p>
        </div>

        {/* Study Mode Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {/* Custom Drill Card */}
          <Card className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-8">
              <div className="text-center">
                <div className={cn(
                  "mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-500/20"
                )}>
                  <Settings className="h-12 w-12 mx-auto text-emerald-400" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">Custom Drill</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Select specific chapters to focus your study session
                </p>
                
                <div className="flex justify-center gap-4 mb-6">
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <Clock className="h-3 w-3 mr-1" />
                    Flexible
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Custom
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    Target specific chapters
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    Focus on weak areas
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    Unlimited duration
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleModeSelect('custom-drill')}
                  className="w-full group-hover:shadow-lg transition-all duration-300 bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
                  variant="outline"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Configure Drill
                </Button>
              </div>
            </CardContent>
          </Card>

          {studyModes.map((mode) => {
            const IconComponent = mode.icon
            return (
              <Card key={mode.mode} className="glass-card group hover:scale-105 transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Icon */}
                    <div className={cn(
                      "mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-r",
                      mode.color.replace('from-', 'from-').replace(' to-', '/20 to-') + '/20'
                    )}>
                      <IconComponent className={cn("h-12 w-12 mx-auto", mode.textColor)} />
                    </div>
                    
                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold mb-3">{mode.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {mode.description}
                    </p>
                    
                    {/* Duration & Cards */}
                    <div className="flex justify-center gap-4 mb-6">
                      <Badge variant="secondary" className="bg-white/10 border-white/20">
                        <Clock className="h-3 w-3 mr-1" />
                        {mode.duration}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/10 border-white/20">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {mode.cardCount}
                      </Badge>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-8">
                      {mode.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-primary"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      onClick={() => handleModeSelect(mode.mode)}
                      className={cn(
                        "w-full group-hover:shadow-lg transition-all duration-300",
                        mode.bgColor
                      )}
                      variant="outline"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start {mode.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Chapter Selection Modal */}
        {showChapterSelect && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl">Select Chapters</CardTitle>
                <p className="text-muted-foreground">Choose which chapters you want to include in your drill</p>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {chapters.map((chapterId) => (
                    <Button
                      key={chapterId}
                      variant="outline"
                      className={cn(
                        "justify-start h-auto py-3 px-4",
                        selectedChapters.includes(chapterId) 
                          ? "bg-primary/20 border-primary text-primary hover:bg-primary/30" 
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      )}
                      onClick={() => toggleChapter(chapterId)}
                    >
                      <div className="text-left">
                        <div className="font-semibold">Chapter {chapterId}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/20">
                <div className="text-sm text-muted-foreground">
                  {selectedChapters.length} chapters selected
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setShowChapterSelect(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={startCustomDrill}
                    disabled={selectedChapters.length === 0}
                  >
                    Start Drill
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Stats */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">{allFlashcards.length}</div>
                <p className="text-sm text-muted-foreground">Total Cards Available</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {new Set(allFlashcards.flatMap(card => card.tags)).size}
                </div>
                <p className="text-sm text-muted-foreground">Study Topics</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {new Set(allFlashcards.map(card => card.chapterNumber)).size}
                </div>
                <p className="text-sm text-muted-foreground">EMT-B Chapters</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">3</div>
                <p className="text-sm text-muted-foreground">Difficulty Levels</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function StudyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading study session...</p>
        </div>
      </div>
    }>
      <StudyPageContent />
    </Suspense>
  )
}