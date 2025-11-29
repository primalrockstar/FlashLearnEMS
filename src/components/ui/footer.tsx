import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { 
  Shield, 
  AlertTriangle, 
  ExternalLink,
  Github,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Medical Disclaimer Banner */}
        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-red-900/30 flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-red-300 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Important Medical Disclaimer
              </h3>
              <div className="text-red-200/90 space-y-2 text-sm leading-relaxed">
                <p>
                  <strong>ChapterFlashEMT is an educational tool designed to supplement formal EMT training.</strong> 
                  It is NOT a substitute for accredited EMT education programs, clinical training, hands-on experience, 
                  official certification courses, or medical advice.
                </p>
                <p>
                  <strong>Always follow your local protocols, medical direction, and scope of practice.</strong> 
                  In emergency situations, rely on your training, protocols, and qualified medical supervision. 
                  When in doubt, consult with qualified medical professionals or your medical director.
                </p>
                <p className="font-medium text-red-300">
                  This application does not provide medical advice and should never be used for actual patient care decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Information */}
          <div className="space-y-6">
            <div>
              <Logo size="sm" showSubtext={false} />
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                Professional EMT education software designed for modern EMS students and healthcare professionals.
              </p>
            </div>
            
            {/* WebConnect360 Attribution */}
            <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-700/30">
              <p className="text-sm text-blue-200 mb-2">
                <strong>Built by WebConnect360</strong>
              </p>
              <p className="text-xs text-blue-300/80 mb-3">
                Part of the comprehensive ProMedixEMS™ suite of medical education applications.
              </p>
              <div className="flex items-center gap-2">
                <Link 
                  href="https://webconnect360.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-1"
                >
                  WebConnect360.com <ExternalLink className="h-3 w-3" />
                </Link>
                <span className="text-blue-400/50">•</span>
                <Link 
                  href="https://github.com/primalrockstar/WebConnect360" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-300 hover:text-blue-200 transition-colors flex items-center gap-1"
                >
                  <Github className="h-3 w-3" /> GitHub
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/study" className="block text-white/70 hover:text-white transition-colors text-sm">
                Study Center
              </Link>
              <Link href="/browse" className="block text-white/70 hover:text-white transition-colors text-sm">
                Browse Content
              </Link>
              <Link href="/progress" className="block text-white/70 hover:text-white transition-colors text-sm">
                Progress Analytics
              </Link>
              <Link href="/settings" className="block text-white/70 hover:text-white transition-colors text-sm">
                Settings
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Legal & Support</h4>
            <div className="space-y-3">
              <Link href="/privacy" className="block text-white/70 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-white/70 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/medical-disclaimer" className="block text-white/70 hover:text-white transition-colors text-sm">
                Medical Disclaimer
              </Link>
              <Link href="/support" className="block text-white/70 hover:text-white transition-colors text-sm">
                Support Center
              </Link>
              <Link href="/contact" className="block text-white/70 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/70">Support</p>
                  <Link 
                    href="mailto:support@webconnect360.com" 
                    className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    support@webconnect360.com
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/70">Technical</p>
                  <Link 
                    href="mailto:tech@webconnect360.com" 
                    className="text-sm text-green-300 hover:text-green-200 transition-colors"
                  >
                    tech@webconnect360.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/70">General</p>
                  <Link 
                    href="mailto:hello@webconnect360.com" 
                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    hello@webconnect360.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-white/60">
                © 2025 <strong>WebConnect360</strong>. All rights reserved.
              </p>
              <p className="text-xs text-white/50 mt-1">
                ChapterFlashEMT™ and ProMedixEMS™ are trademarks of WebConnect360.
              </p>
            </div>

            {/* Certifications & Compliance */}
            <div className="flex items-center gap-6 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span>HIPAA Compliant Design</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Educational Use Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>Privacy Focused</span>
              </div>
            </div>
          </div>

          {/* Final Disclaimer */}
          <div className="mt-6 p-4 rounded-lg bg-amber-900/20 border border-amber-700/30">
            <p className="text-xs text-amber-200/90 text-center leading-relaxed">
              <strong>Educational Tool Notice:</strong> ChapterFlashEMT provides study materials based on publicly available EMT-B curriculum standards. 
              Not affiliated with NREMT, AAOS, or any specific textbook publisher. Always verify information with authoritative sources and qualified instructors. 
              For medical emergencies, follow your training and local protocols.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}