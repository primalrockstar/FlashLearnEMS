import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Database, Eye, Lock, Smartphone, AlertTriangle } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="glass-card backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Privacy Policy</CardTitle>
              <p className="text-muted-foreground">Last updated: January 2025</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Overview */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Our Commitment to Privacy</h3>
            <div className="rounded-xl bg-primary/10 border border-primary/30 p-6">
              <p className="text-sm leading-relaxed">
                <strong>ChapterFlashEMT</strong> respects your privacy and is committed to protecting 
                your personal information. This policy explains how we collect, use, and safeguard 
                data related to your educational progress and app usage. We prioritize 
                <strong> local data storage</strong> and <strong>minimal data collection</strong> 
                to keep your study information secure and private.
              </p>
            </div>
          </section>

          {/* Data We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Information We Collect</h3>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Study Progress Data */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-green-400" />
                  Local Study Data
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Flashcard performance and accuracy rates</li>
                  <li>• Spaced repetition scheduling and intervals</li>
                  <li>• Study session duration and frequency</li>
                  <li>• Knowledge area strengths and weaknesses</li>
                  <li>• Personal study preferences and settings</li>
                  <li>• Offline deck downloads and sync status</li>
                </ul>
                <div className="bg-green-400/10 rounded-lg p-3 mt-4">
                  <p className="text-xs text-green-200">
                    <strong>Stored Locally:</strong> All study data remains on your device 
                    and is not transmitted to external servers.
                  </p>
                </div>
              </div>

              {/* Anonymous Analytics */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-orange-400" />
                  Anonymous Usage Analytics
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• App crashes and error reports (anonymized)</li>
                  <li>• Feature usage patterns (no personal data)</li>
                  <li>• Performance metrics and load times</li>
                  <li>• Study mode preferences (aggregated)</li>
                  <li>• Content effectiveness metrics</li>
                </ul>
                <div className="bg-orange-400/10 rounded-lg p-3 mt-4">
                  <p className="text-xs text-orange-200">
                    <strong>Privacy First:</strong> Analytics are completely anonymous 
                    and cannot be linked to individual users.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data We Don't Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold">Information We Do NOT Collect</h3>
            </div>
            <div className="rounded-xl bg-red-400/10 border border-red-400/30 p-6">
              <p className="text-sm leading-relaxed mb-4">
                <strong>We prioritize your privacy.</strong> ChapterFlashEMT does NOT collect, 
                store, or transmit the following information:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Personal identifying information (names, emails, phone numbers)</li>
                  <li>• Student ID numbers or certification details</li>
                  <li>• Educational institution or training program affiliation</li>
                  <li>• Location data or GPS coordinates</li>
                </ul>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Contact lists or device access permissions</li>
                  <li>• Social media accounts or external profiles</li>
                  <li>• Financial information or payment details</li>
                  <li>• Biometric data or device identifiers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold">How We Use Your Data</h3>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="font-medium text-foreground mb-3">Educational Enhancement</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Optimize spaced repetition algorithms for better learning outcomes</li>
                  <li>• Personalize study recommendations based on performance patterns</li>
                  <li>• Identify knowledge gaps and suggest focused review sessions</li>
                  <li>• Track progress across different EMT-B topic areas</li>
                </ul>
              </div>
              
              <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                <h4 className="font-medium text-foreground mb-3">App Improvement</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Improve app performance and fix technical issues</li>
                  <li>• Develop new features based on usage patterns</li>
                  <li>• Enhance content quality and educational effectiveness</li>
                  <li>• Ensure compatibility across different devices and platforms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">Data Security & Storage</h3>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Local Storage First</h4>
                  <p className="text-muted-foreground">
                    Your study progress, preferences, and flashcard performance are stored 
                    locally on your device using secure, encrypted storage methods. This 
                    data never leaves your device unless you explicitly choose to sync 
                    or backup to cloud services you control.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Industry-Standard Security</h4>
                  <p className="text-muted-foreground">
                    We implement encryption, secure coding practices, and regular security 
                    updates. However, no digital system is 100% secure. Users should not 
                    store sensitive personal information beyond study-related data.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Data Backup Responsibility</h4>
                  <p className="text-muted-foreground">
                    Since data is stored locally, users are responsible for backing up their 
                    study progress. We cannot recover lost data due to device failure, 
                    app deletion, or system issues.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Services */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold">Third-Party Services</h3>
            </div>
            <div className="rounded-xl bg-yellow-400/10 border border-yellow-400/30 p-6">
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>Minimal Third-Party Integration:</strong> ChapterFlashEMT minimizes 
                  third-party service usage to protect your privacy. Any external services 
                  used (such as crash reporting or anonymous analytics) are configured 
                  with the strongest privacy settings available.
                </p>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Anonymous Error Reporting</h4>
                  <p className="text-muted-foreground">
                    We may use privacy-focused crash reporting to identify and fix app issues. 
                    These reports contain no personal information and help us improve app 
                    stability for all users.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-semibold">Your Privacy Rights</h3>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <p className="text-sm leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Delete all local study data by uninstalling the app or using reset options</li>
                <li>• Export your study progress for backup purposes (where technically feasible)</li>
                <li>• Disable anonymous analytics through app settings</li>
                <li>• Request information about data practices (contact through official channels)</li>
                <li>• Report privacy concerns or data handling issues</li>
              </ul>
              <div className="bg-cyan-400/10 rounded-lg p-3 mt-4">
                <p className="text-xs text-cyan-200">
                  <strong>Educational Focus:</strong> Since ChapterFlashEMT prioritizes local 
                  storage and educational use, most privacy controls are built directly 
                  into the app settings and data management features.
                </p>
              </div>
            </div>
          </section>

          {/* Contact & Updates */}
          <section className="space-y-4 border-t border-white/10 pt-6">
            <h3 className="text-lg font-semibold">Policy Updates & Contact</h3>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Policy Changes:</strong> We may update this Privacy Policy to reflect 
                changes in our data practices, legal requirements, or app features. Continued 
                use after changes constitutes acceptance of the updated policy.
              </p>
              <p>
                <strong>Questions or Concerns:</strong> For privacy questions or to report 
                concerns about data handling, contact your training program instructor or 
                reach out through official educational channels. We are committed to 
                maintaining the highest standards of privacy for EMS education.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t border-white/10 pt-6">
            <p>
              © 2025 ChapterFlashEMT. All rights reserved. Privacy-focused EMS education.
              <br />
              Part of the ProMedixEMS™ family of educational tools.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}