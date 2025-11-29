'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-900/30 border border-red-700/50">
                <Shield className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-4xl font-bold text-white">Medical Disclaimer</h1>
            </div>
            <p className="text-xl text-white/70">
              Important Safety and Legal Information
            </p>
          </div>
        </div>

        {/* Critical Warning */}
        <div className="bg-red-900/20 border-2 border-red-700/50 rounded-xl p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-12 w-12 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-red-300 mb-4">
                CRITICAL: FOR EDUCATIONAL USE ONLY
              </h2>
              <div className="space-y-4 text-red-200 text-lg leading-relaxed">
                <p className="font-semibold">
                  ChapterFlashEMT is NOT intended for use in actual medical emergencies or patient care.
                </p>
                <p>
                  This application provides educational content only and should never replace proper medical training, 
                  clinical experience, official certification programs, or qualified medical supervision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 space-y-12">
          
          {/* Purpose & Scope */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Info className="h-6 w-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Purpose & Scope</h3>
            </div>
            <div className="space-y-4 text-white/80 leading-relaxed">
              <p>
                ChapterFlashEMT is designed as a supplementary educational tool to help EMT students review and 
                reinforce knowledge obtained through accredited EMT training programs. This application:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-green-300 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    What This App IS:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Educational study aid and review tool</li>
                    <li>• Supplement to formal EMT training</li>
                    <li>• Practice flashcard system</li>
                    <li>• Study progress tracker</li>
                    <li>• Knowledge reinforcement platform</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-red-300 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    What This App IS NOT:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Medical advice or guidance</li>
                    <li>• Replacement for formal training</li>
                    <li>• Diagnostic or treatment tool</li>
                    <li>• Emergency reference guide</li>
                    <li>• Substitute for clinical experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Training Requirements */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Training Requirements</h3>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
              <p className="text-white/80 leading-relaxed">
                To become a certified Emergency Medical Technician, you must complete an accredited EMT program 
                that includes both classroom instruction and hands-on clinical experience. This application cannot 
                and does not replace:
              </p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>• Formal EMT education programs</li>
                <li>• Clinical rotations and field experience</li>
                <li>• Skills labs and practical assessments</li>
                <li>• National Registry EMT (NREMT) certification</li>
                <li>• State licensing requirements</li>
                <li>• Continuing education obligations</li>
              </ul>
            </div>
          </section>

          {/* Medical Practice Warnings */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Medical Practice Warnings</h3>
            <div className="space-y-6">
              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-amber-300 mb-3">Always Follow Local Protocols</h4>
                <p className="text-white/80">
                  EMT practices vary by jurisdiction. Always follow your local protocols, medical direction, 
                  and scope of practice. When in doubt, consult with your medical director or qualified supervisor.
                </p>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Emergency Situations</h4>
                <p className="text-white/80">
                  In actual emergencies, rely on your training, established protocols, and qualified medical 
                  supervision. Do not use this application as a reference during patient care.
                </p>
              </div>
              
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-300 mb-3">No Medical Advice</h4>
                <p className="text-white/80">
                  This application does not provide medical advice, diagnosis, or treatment recommendations. 
                  For medical emergencies, call emergency services immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Liability Limitations */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Liability Limitations</h3>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <p className="text-white/80 leading-relaxed">
                WebConnect360 and the developers of ChapterFlashEMT disclaim all liability for any damages, 
                injuries, or adverse outcomes resulting from the use or misuse of this application. Users 
                assume full responsibility for their actions and decisions. This application is provided 
                "as is" without warranties of any kind.
              </p>
            </div>
          </section>

          {/* Content Accuracy */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Content Accuracy</h3>
            <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
              <p className="text-white/80">
                While we strive for accuracy, medical information and EMT protocols evolve continuously. 
                Users should:
              </p>
              <ul className="space-y-2 text-white/70">
                <li>• Verify all information with authoritative sources</li>
                <li>• Consult current textbooks and official guidelines</li>
                <li>• Follow the most recent protocols from your jurisdiction</li>
                <li>• Seek guidance from qualified instructors and medical directors</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6">Questions or Concerns</h3>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
              <p className="text-white/80 mb-4">
                For questions about this disclaimer or the application, contact:
              </p>
              <div className="space-y-2 text-blue-300">
                <p>Email: <a href="mailto:support@webconnect360.com" className="hover:text-blue-200">support@webconnect360.com</a></p>
                <p>Technical: <a href="mailto:tech@webconnect360.com" className="hover:text-blue-200">tech@webconnect360.com</a></p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/60">
          <p className="text-sm">
            Last updated: November 2025 | WebConnect360.com | ProMedixEMS™ Suite
          </p>
        </div>
      </div>
    </div>
  )
}