import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, Shield, BookOpen, Users, ExternalLink } from 'lucide-react'

export default function MedicalDisclaimer() {
  return (
    <Card className="glass-card border-amber-400/30 mt-8 backdrop-blur-xl">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-6">
          {/* Main Header */}
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-400/10 p-3">
              <AlertTriangle className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-200 mb-2">
                Medical & Educational Disclaimer
              </h3>
              <p className="text-sm text-amber-200/90 leading-relaxed">
                <strong>FOR EDUCATIONAL PURPOSES ONLY.</strong> ChapterFlashEMT and all associated 
                applications are educational tools designed to supplement—not replace—formal 
                EMS training and certification programs. The information provided should not be 
                used as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>

          {/* Key Guidelines */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Shield className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-200 mb-1">Follow Local Protocols</h4>
                <p className="text-xs text-blue-200/80">
                  Always adhere to your local protocols, medical director's orders, 
                  and scope of practice. Call 911 for real emergencies immediately.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <BookOpen className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-200 mb-1">Supplement Training</h4>
                <p className="text-xs text-green-200/80">
                  Use this as a study aid alongside your official coursework, 
                  hands-on training, clinical hours, and lab practice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Users className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-purple-200 mb-1">Professional Guidance</h4>
                <p className="text-xs text-purple-200/80">
                  Consult qualified instructors, medical professionals, and your 
                  certifying body for authoritative guidance.
                </p>
              </div>
            </div>
          </div>

          {/* No Affiliation Notice */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="font-semibold text-foreground mb-2">No Official Affiliation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              ChapterFlashEMT is an independently developed EMS study tool and is not affiliated with, 
              endorsed by, or officially connected to the following organizations:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 pl-4">
              <li>• The National Registry of Emergency Medical Technicians (NREMT)</li>
              <li>• The American Academy of Orthopaedic Surgeons (AAOS)</li>
              <li>• Emergency Care & Transportation of the Sick and Injured</li>
              <li>• Any EMS publisher, textbook creator, or certifying body</li>
            </ul>
          </div>

          {/* Certification Notice */}
          <div className="rounded-xl bg-primary/10 border border-primary/30 p-4">
            <h4 className="font-semibold text-primary-foreground mb-2">Certification Requirements</h4>
            <p className="text-sm text-primary-foreground/90 leading-relaxed">
              <strong>This application does not certify, license, or qualify you to practice as an Emergency Medical Technician.</strong> 
              Proper certification must be obtained through accredited EMS programs, approved clinical rotations, 
              and recognized certifying bodies like NREMT or state agencies.
            </p>
          </div>

          {/* Legal Notice */}
          <div className="border-t border-white/10 pt-4">
            <h4 className="font-semibold text-foreground mb-2">Legal Notice & Liability</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong>Content Disclaimer:</strong> All educational content is original or based on publicly 
              available EMS education standards. We use industry-standard security but no system is 100% secure. 
              <strong>Limitation of Liability:</strong> ChapterFlashEMT provides content "as is" without warranties. 
              We are not liable for exam performance, clinical decisions, misuse of information, or damages 
              arising from app use. Users are responsible for verifying information accuracy and following 
              official requirements from their medical director and certifying body.
            </p>
          </div>

          {/* Contact & Support */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Questions or Concerns?</h4>
                <p className="text-xs text-muted-foreground">
                  For questions about content accuracy, reporting issues, or educational partnerships, 
                  contact your program instructor or reach out through official channels. Always 
                  prioritize guidance from your medical director and training program.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="text-center text-xs text-muted-foreground border-t border-white/10 pt-4">
            <p>
              © 2025 ChapterFlashEMT. All rights reserved. Built with ❤️ for EMS education excellence.
              <br />
              Part of the ProMedixEMS™ family of educational tools.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}