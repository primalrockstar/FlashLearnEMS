import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - ChapterFlashEMT',
  description: 'Privacy Policy for ChapterFlashEMT - ProMedixEMS™ educational application'
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-8">Privacy Policy</h1>
          <div className="text-slate-300 space-y-6 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                ChapterFlashEMT is designed with privacy in mind. We collect minimal information necessary to provide you with the best learning experience:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Study Progress Data:</strong> Your flashcard performance, study sessions, and learning analytics (stored locally on your device)</li>
                <li><strong>App Usage Analytics:</strong> Anonymous usage patterns to improve the app (no personal information)</li>
                <li><strong>Device Information:</strong> Basic device type and OS version for compatibility (no device identifiers)</li>
                <li><strong>Crash Reports:</strong> Technical information when the app crashes to help us fix issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Educational Enhancement:</strong> To personalize your learning experience and track your progress</li>
                <li><strong>App Improvement:</strong> To analyze app performance and develop new features</li>
                <li><strong>Technical Support:</strong> To diagnose and resolve technical issues</li>
                <li><strong>Safety & Security:</strong> To maintain app security and prevent misuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">3. Data Storage & Security</h2>
              <p className="mb-4">
                Your privacy and data security are paramount to us:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Local Storage:</strong> Most of your data is stored locally on your device</li>
                <li><strong>Encryption:</strong> All data transmission uses industry-standard encryption</li>
                <li><strong>No Selling:</strong> We never sell, rent, or share your personal information with third parties</li>
                <li><strong>Minimal Collection:</strong> We only collect what's necessary for app functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">4. Third-Party Services</h2>
              <p className="mb-4">
                ChapterFlashEMT may integrate with the following third-party services:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>App Stores:</strong> Apple App Store and Google Play Store for app distribution</li>
                <li><strong>Analytics:</strong> Privacy-focused analytics services (anonymized data only)</li>
                <li><strong>Crash Reporting:</strong> Technical crash reports to improve app stability</li>
              </ul>
              <p className="mt-4 text-sm text-slate-400">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">5. Children's Privacy</h2>
              <p>
                ChapterFlashEMT is designed for EMT students and healthcare professionals. While some users may be under 18, 
                we do not knowingly collect personal information from children under 13. If you believe a child under 13 has 
                provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the following rights regarding your data:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Access:</strong> Request information about the data we have about you</li>
                <li><strong>Deletion:</strong> Request deletion of your data (locally stored data can be cleared in app settings)</li>
                <li><strong>Portability:</strong> Export your study progress data</li>
                <li><strong>Correction:</strong> Correct any inaccurate information</li>
                <li><strong>Opt-out:</strong> Disable analytics and data collection in app settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">7. Data Retention</h2>
              <p>
                We retain your data only as long as necessary:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Study Progress:</strong> Stored locally until you delete the app or clear data</li>
                <li><strong>Analytics:</strong> Aggregated and anonymized data may be retained for up to 2 years</li>
                <li><strong>Crash Reports:</strong> Technical reports are deleted after 1 year</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">8. International Users</h2>
              <p>
                ChapterFlashEMT complies with applicable privacy laws including GDPR, CCPA, and other regional privacy regulations. 
                Your data may be processed in the United States where our servers are located.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes through 
                the app or via email if you've provided one. Continued use of the app after changes constitutes acceptance 
                of the new privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p><strong>ProMedixEMS™ Privacy Team</strong></p>
                <p>Email: privacy@promedixems.com</p>
                <p>Address: [Your Business Address]</p>
                <p>Phone: [Your Phone Number]</p>
              </div>
            </section>

            <section className="border-t border-slate-700 pt-6 mt-8">
              <p className="text-sm text-slate-400">
                <strong>Last Updated:</strong> November 19, 2025<br/>
                <strong>Effective Date:</strong> November 19, 2025<br/>
                <strong>Version:</strong> 1.0
              </p>
            </section>

            <div className="mt-8 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">🛡️ ProMedixEMS™ Privacy Commitment</h3>
              <p className="text-sm">
                As healthcare professionals ourselves, we understand the importance of privacy and confidentiality. 
                ChapterFlashEMT is built with privacy-by-design principles to protect your educational journey while 
                providing the best possible learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}