import Link from 'next/link'
import { Shield, BookOpen, AlertTriangle, Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-xl border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20 p-2">
                <Shield className="h-6 w-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  ChapterFlashEMT
                </h3>
                <p className="text-xs text-muted-foreground">EMS Education Excellence</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced spaced repetition learning for EMT-B certification preparation. 
              Built with ❤️ for the EMS community.
            </p>
          </div>

          {/* Educational Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Learning
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/study/quick-drill" className="hover:text-primary transition-colors">Quick Drill</Link></li>
              <li><Link href="/study/deep-session" className="hover:text-primary transition-colors">Deep Session</Link></li>
              <li><Link href="/study/exam-mimic" className="hover:text-primary transition-colors">Exam Mimic</Link></li>
              <li><Link href="/analytics" className="hover:text-primary transition-colors">Progress Analytics</Link></li>
              <li><Link href="/scenarios" className="hover:text-primary transition-colors">Scenario Chains</Link></li>
            </ul>
          </div>

          {/* Legal & Safety */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Legal & Safety
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Medical Disclaimer</Link></li>
              <li><Link href="/safety" className="hover:text-primary transition-colors">Safety Guidelines</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Report Issues</Link></li>
            </ul>
          </div>

          {/* Community & Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              Community
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About ChapterFlashEMT</Link></li>
              <li><Link href="/instructors" className="hover:text-primary transition-colors">For Instructors</Link></li>
              <li><Link href="/feedback" className="hover:text-primary transition-colors">Send Feedback</Link></li>
              <li><Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link></li>
              <li><Link href="/open-source" className="hover:text-primary transition-colors">Open Source</Link></li>
            </ul>
          </div>
        </div>

        {/* Educational Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="rounded-xl bg-amber-400/10 border border-amber-400/30 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-amber-400/20 p-2 flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-300" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-200">Important Educational Notice</h4>
                <p className="text-sm text-amber-200/90 leading-relaxed">
                  <strong>ChapterFlashEMT™ is an independent EMS education tool</strong> and is not 
                  affiliated with NREMT, AAOS, or any certifying body. This application is 
                  designed for <strong>educational purposes only</strong> to supplement formal 
                  EMT training programs. Always follow your medical director's protocols, 
                  local scope of practice, and official training materials.
                </p>
                <p className="text-xs text-amber-300/80">
                  <strong>Emergency Reminder:</strong> This app is not for use during real 
                  emergencies. Call 911 immediately and follow your local protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Affiliation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            <p>© 2025 ChapterFlashEMT. All rights reserved.</p>
            <p className="text-xs mt-1">
              Part of the <span className="text-primary font-semibold">ProMedixEMS™</span> family of educational tools.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-green-400" />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-3 w-3 text-blue-400" />
              <span>Education Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-3 w-3 text-red-400" />
              <span>Community Built</span>
            </div>
          </div>
        </div>

        {/* Professional Standards Notice */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-center text-muted-foreground/80 leading-relaxed max-w-4xl mx-auto">
            <strong>Professional Standards:</strong> ChapterFlashEMT adheres to the highest standards 
            of educational content accuracy and safety. However, medical knowledge evolves continuously. 
            Users must verify all information against current protocols, official training materials, 
            and guidance from qualified medical professionals. This application supports but never 
            replaces proper EMT training, hands-on practice, and certification through accredited programs.
          </p>
        </div>

        {/* Attribution */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground/60">
            Built with Next.js, TypeScript, and ❤️ for the EMS community.
            <br />
            Spaced repetition algorithms inspired by evidence-based learning research.
          </p>
        </div>
      </div>
    </footer>
  )
}