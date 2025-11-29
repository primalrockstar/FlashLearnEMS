'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MedicalDisclaimerBanner } from '@/components/ui/medical-disclaimer-banner'
import { BarChart3, TrendingUp, Target, BookOpen, Clock, Flame, Award, Activity, Zap, Download, Upload } from 'lucide-react'
import { progressStorage, type ProgressStats, type ChapterProgress, type DailyStreak } from '@/lib/progress-storage'
import { Button } from '@/components/ui/button'

export default function ProgressPage() {
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [chapterProgress, setChapterProgress] = useState<ChapterProgress[]>([])
  const [recentStreaks, setRecentStreaks] = useState<DailyStreak[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProgressData()
  }, [])

  const loadProgressData = async () => {
    try {
      await progressStorage.init()
      const [statsData, chaptersData, streaksData] = await Promise.all([
        progressStorage.getProgressStats(),
        progressStorage.getAllChapterProgress(),
        progressStorage.getDailyStreaks(7)
      ])
      
      setStats(statsData)
      setChapterProgress(chaptersData)
      setRecentStreaks(streaksData)
    } catch (error) {
      console.error('Failed to load progress data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = async () => {
    try {
      const data = await progressStorage.exportData()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const filename = 'chapterflashemt-backup-' + new Date().toISOString().split('T')[0] + '.json'
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to export data:', error)
    }
  }

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      await progressStorage.importData(text)
      await loadProgressData()
      alert('Data imported successfully!')
    } catch (error) {
      console.error('Failed to import data:', error)
      alert('Failed to import data. Please check the file format.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white/60">Loading your progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MedicalDisclaimerBanner variant="compact" className="mb-8 rounded-xl" />
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-white/60 mb-4">
            <BarChart3 className="h-3 w-3" />
            <span className="text-blue-400">Progress Analytics</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
            Your Study Progress
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Track your learning journey with detailed analytics - all stored offline on your device.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats?.totalCardsStudied || 0}</div>
              <p className="text-sm text-white/60">Cards Studied</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20">
                  <Flame className="h-6 w-6 text-orange-400" />
                </div>
                <Award className="h-5 w-5 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats?.currentStreak || 0}</div>
              <p className="text-sm text-white/60">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <Activity className="h-5 w-5 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats?.overallAccuracy || 0}%</div>
              <p className="text-sm text-white/60">Accuracy</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stats?.totalMinutesStudied || 0}</div>
              <p className="text-sm text-white/60">Minutes Studied</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-purple-400" />
              Offline Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60 mb-4">
              <strong className="text-white/80">100% Offline:</strong> All your progress data is stored locally using IndexedDB. 
              Perfect for studying anywhere, even without internet!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleExportData} className="bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
                <Download className="h-4 w-4 mr-2" />
                Export Backup
              </Button>
              <Button onClick={() => document.getElementById('import-file')?.click()} className="bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30">
                <Upload className="h-4 w-4 mr-2" />
                Import Backup
              </Button>
              <input id="import-file" type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
