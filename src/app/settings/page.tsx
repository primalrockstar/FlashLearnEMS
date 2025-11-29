'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MedicalDisclaimerBanner } from '@/components/ui/medical-disclaimer-banner'
import { Settings, Palette, Volume2, Bell, Shield, Monitor } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Medical Disclaimer */}
        <MedicalDisclaimerBanner variant="compact" className="mb-8 rounded-xl" />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-wider text-muted-foreground mb-4">
            <Settings className="h-3 w-3" />
            <span className="text-primary">App Settings</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-4">
            Settings & Preferences
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Customize your ChapterFlashEMT experience with personalized settings and preferences.
          </p>
        </div>

        {/* Coming Soon */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <Settings className="h-8 w-8 text-purple-400" />
              </div>
              Advanced Settings Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-8">
              We're developing comprehensive settings to personalize your study experience
              and optimize the app for your learning preferences.
            </p>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <Palette className="h-8 w-8 text-pink-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Theme Customization</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from multiple color themes and display options
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <Bell className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Study Reminders</h3>
                <p className="text-sm text-muted-foreground">
                  Set up notifications to maintain your study schedule
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Privacy Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your data privacy and security preferences
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Full settings panel available in mobile apps launching 2026
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}