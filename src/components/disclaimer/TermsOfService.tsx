import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText, Shield, AlertCircle, Users, ExternalLink, Clock } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="glass-card backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <ScrollText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Educational Purpose */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <h3 className="text-lg font-semibold">Educational Use Only</h3>
            </div>
            <div className="rounded-xl bg-amber-400/10 border border-amber-400/30 p-6">
              <p className="text-sm leading-relaxed mb-4">
                <strong>ChapterFlashEMT is designed exclusively for educational purposes</strong> to supplement 
                formal Emergency Medical Technician (EMT) training programs. This application is intended to:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Support study and retention of EMT-B level concepts and protocols</li>
                <li>• Provide spaced repetition learning for improved knowledge retention</li>
                <li>• Offer practice scenarios and assessment tools for exam preparation</li>
                <li>• Complement, but never replace, official training materials and instruction</li>
              </ul>
            </div>
          </section>

          {/* No Official Affiliation */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Independent Educational Tool</h3>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <p className="text-sm leading-relaxed mb-4 font-semibold text-blue-200">
                ChapterFlashEMT is an independent EMS education tool and is not affiliated with, endorsed by, 
                or officially connected to any certifying body, educational publisher, or medical organization.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Not affiliated with:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• National Registry of Emergency Medical Technicians (NREMT)</li>
                    <li>• American Academy of Orthopaedic Surgeons (AAOS)</li>
                    <li>• Emergency Care & Transportation publishers</li>
                    <li>• State EMS authorities or certification boards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Always consult official sources:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Your medical director's protocols</li>
                    <li>• Accredited training program materials</li>
                    <li>• Current edition textbooks and resources</li>
                    <li>• State and local EMS regulations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold">Limitation of Liability</h3>
            </div>
            <div className="rounded-xl bg-red-400/10 border border-red-400/30 p-6">
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>IMPORTANT:</strong> ChapterFlashEMT and its developers provide this educational 
                  content "AS IS" without any warranties, express or implied. We are not liable for:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground pl-4">
                  <li>• Exam performance, pass/fail results, or certification outcomes</li>
                  <li>• Clinical decisions made based on information from this application</li>
                  <li>• Misuse of educational content in real-world medical situations</li>
                  <li>• Damages arising from technical issues, data loss, or system downtime</li>
                  <li>• Inaccuracies in content due to evolving medical standards</li>
                  <li>• Actions taken in emergencies without proper professional protocols</li>
                </ul>
                <div className="bg-background/50 rounded-lg p-4 mt-4">
                  <p className="text-xs text-muted-foreground">
                    <strong>Emergency Situations:</strong> This app is not for use during actual 
                    emergencies. Always call 911 immediately and follow your local protocols, 
                    medical director's orders, and scope of practice guidelines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data and Privacy */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold">Data & Privacy</h3>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Study Progress & Analytics</h4>
                  <p className="text-muted-foreground">
                    We collect anonymous study metrics to improve spaced repetition algorithms 
                    and identify knowledge gaps. No personally identifiable information is 
                    transmitted or stored on external servers.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Local Data Storage</h4>
                  <p className="text-muted-foreground">
                    Study progress, preferences, and flashcard performance are stored locally 
                    on your device. Users are responsible for backing up their data. We cannot 
                    recover lost progress due to device issues or app reinstallation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Security Disclaimer</h4>
                  <p className="text-muted-foreground">
                    While we implement industry-standard security practices, no digital system 
                    is 100% secure. Users should not store sensitive personal information within 
                    the application beyond study-related data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">User Responsibilities</h3>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <p className="text-sm leading-relaxed mb-4">By using ChapterFlashEMT, you agree to:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Use this application solely for legitimate educational purposes</li>
                <li>• Verify all information against official sources and current protocols</li>
                <li>• Follow your medical director's guidance and local scope of practice</li>
                <li>• Complete required hands-on training through accredited programs</li>
                <li>• Not rely solely on this app for certification or clinical competency</li>
                <li>• Report significant content errors or safety concerns promptly</li>
                <li>• Respect intellectual property rights and educational fair use guidelines</li>
              </ul>
            </div>
          </section>

          {/* Content Accuracy */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-semibold">Content Accuracy & Updates</h3>
            </div>
            <div className="rounded-xl bg-orange-400/10 border border-orange-400/30 p-6">
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>Educational Content:</strong> All content is based on widely accepted 
                  EMS education standards and best practices. However, medical knowledge evolves 
                  continuously, and protocols vary by jurisdiction.
                </p>
                <p>
                  <strong>User Responsibility:</strong> Users are responsible for verifying that 
                  all information aligns with their current coursework, local protocols, and 
                  medical director's guidance. When in doubt, consult official sources.
                </p>
                <p>
                  <strong>Content Updates:</strong> We strive to keep content current but cannot 
                  guarantee real-time updates to reflect the latest medical standards or protocol 
                  changes. Always prioritize official training materials and instructor guidance.
                </p>
              </div>
            </div>
          </section>

          {/* Terms Changes */}
          <section className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="text-lg font-semibold">Modifications to Terms</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms of Service at any time to reflect 
              changes in our services, legal requirements, or educational standards. Continued 
              use of ChapterFlashEMT after changes constitutes acceptance of the updated terms. 
              For questions about these terms or content accuracy, contact your training 
              program instructor or medical director.
            </p>
          </section>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t border-white/10 pt-6">
            <p>
              © 2025 ChapterFlashEMT. All rights reserved. Built with ❤️ for EMS education excellence.
              <br />
              Part of the ProMedixEMS™ family of educational tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}