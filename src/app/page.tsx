import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { AppStoreAnnouncement } from "@/components/ui/app-store-announcement"
import { MedicalDisclaimerBanner } from "@/components/ui/medical-disclaimer-banner"
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Play, 
  BookOpen, 
  BarChart3,
  Shield,
  Clock,
  Zap,
  ArrowRight
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* App Store Announcement */}
      <AppStoreAnnouncement />
      
      {/* Medical Disclaimer */}
      <MedicalDisclaimerBanner variant="compact" className="border-x-0 rounded-none" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            {/* Text Logo */}
            <div className="mb-12">
              <Logo size="xl" />
            </div>
            
            {/* Hero Text */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-3xl lg:text-4xl font-semibold text-white/90 mb-4">
                World-Class EMT-B Flashcard Training
              </p>
              <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                Master EMT-B concepts with intelligent spaced repetition, scenario-based learning, 
                and comprehensive analytics. Built for serious EMS students and professionals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/study">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start Studying Now
                </Button>
              </Link>
              <Link href="/browse">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white/20 hover:bg-white/10">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Content
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">45</div>
                <div className="text-sm text-white/60">Demo Cards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">3</div>
                <div className="text-sm text-white/60">Demo Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">3</div>
                <div className="text-sm text-white/60">Study Modes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">100%</div>
                <div className="text-sm text-white/60">Free Demo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Modes Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Learning Path</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Three distinct study modes designed for different learning objectives and time constraints
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Quick Drill */}
            <Card className="glass-card group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 mx-auto mb-6 w-fit">
                  <Brain className="h-12 w-12 text-cyan-400 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Quick Drill</h3>
                <p className="text-white/70 mb-6">
                  Fast-paced review sessions perfect for quick retention checks and study breaks
                </p>
                <div className="space-y-2 mb-6">
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <Clock className="h-3 w-3 mr-1" />
                    5-10 minutes
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <BookOpen className="h-3 w-3 mr-1" />
                    10 cards
                  </Badge>
                </div>
                <Link href="/study">
                  <Button className="w-full bg-cyan-400/10 border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/20">
                    Start Quick Drill
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Deep Session */}
            <Card className="glass-card group hover:scale-105 transition-all duration-300 ring-2 ring-blue-400/30">
              <CardContent className="p-8 text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-500/20 mx-auto mb-6 w-fit">
                  <Target className="h-12 w-12 text-blue-400 mx-auto" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-400/20 text-blue-200 border-blue-400/40">Most Popular</Badge>
                </div>
                <h3 className="text-2xl font-bold mb-3">Deep Session</h3>
                <p className="text-white/70 mb-6">
                  Comprehensive study with spaced repetition and weak area targeting
                </p>
                <div className="space-y-2 mb-6">
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <Clock className="h-3 w-3 mr-1" />
                    20-30 minutes
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <BookOpen className="h-3 w-3 mr-1" />
                    25 cards
                  </Badge>
                </div>
                <Link href="/study">
                  <Button className="w-full bg-blue-400/10 border-blue-400/30 text-blue-200 hover:bg-blue-400/20">
                    Start Deep Session
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Exam Mimic */}
            <Card className="glass-card group hover:scale-105 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-500/20 mx-auto mb-6 w-fit">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Exam Mimic</h3>
                <p className="text-white/70 mb-6">
                  Full practice test simulation with realistic timing and comprehensive coverage
                </p>
                <div className="space-y-2 mb-6">
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <Clock className="h-3 w-3 mr-1" />
                    45-60 minutes
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 border-white/20">
                    <BookOpen className="h-3 w-3 mr-1" />
                    50 cards
                  </Badge>
                </div>
                <Link href="/study">
                  <Button className="w-full bg-purple-400/10 border-purple-400/30 text-purple-200 hover:bg-purple-400/20">
                    Start Exam Mimic
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why FlashLearn?</h2>
            <p className="text-lg text-white/70">
              Advanced features designed specifically for EMT-B certification success
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-green-500/20 mx-auto mb-6 w-fit">
                <Zap className="h-12 w-12 text-emerald-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Spaced Repetition</h3>
              <p className="text-white/70">
                AI-powered scheduling shows you cards exactly when you need to review them for maximum retention
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-400/20 to-cyan-500/20 mx-auto mb-6 w-fit">
                <BarChart3 className="h-12 w-12 text-blue-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
              <p className="text-white/70">
                Detailed insights into your progress with weak area identification and targeted recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-500/20 mx-auto mb-6 w-fit">
                <Shield className="h-12 w-12 text-amber-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety Focused</h3>
              <p className="text-white/70">
                Comprehensive medical disclaimers and safety reminders throughout your learning journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Ace Your EMT-B Exam?</h2>
          <p className="text-xl text-white/70 mb-8">
            Join thousands of EMT students who have improved their knowledge and confidence with FlashLearn
          </p>
          <Link href="/study">
            <Button size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-2xl">
              <Play className="h-6 w-6 mr-3" />
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
