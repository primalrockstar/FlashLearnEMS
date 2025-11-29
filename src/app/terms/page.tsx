import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - ChapterFlashEMT',
  description: 'Terms of Service for ChapterFlashEMT - ProMedixEMS™ educational application'
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-8">Terms of Service</h1>
          <div className="text-slate-300 space-y-6 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">1. Acceptance of Terms</h2>
              <p>
                By downloading, installing, or using ChapterFlashEMT (the "App"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, do not use the App. These terms constitute a legally binding agreement between 
                you and ProMedixEMS™.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">2. Description of Service</h2>
              <p className="mb-4">
                ChapterFlashEMT is an educational mobile application designed to help Emergency Medical Technician (EMT) students 
                and professionals study and prepare for certification examinations. The App provides:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>700+ EMT flashcards covering 45 chapters</li>
                <li>Adaptive learning algorithms with spaced repetition</li>
                <li>Multiple study modes (Quick Drill, Deep Session, Exam Mimic)</li>
                <li>Progress tracking and performance analytics</li>
                <li>Offline study capabilities</li>
              </ul>
            </section>

            <section className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-red-300 mb-4">⚠️ 3. Medical Disclaimer</h2>
              <div className="space-y-4">
                <p className="font-semibold">
                  IMPORTANT: ChapterFlashEMT is an educational tool and is NOT a substitute for proper medical training, 
                  certification programs, or clinical experience.
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Educational Purpose Only:</strong> The App is designed to supplement formal EMT education, not replace it</li>
                  <li><strong>Not Medical Advice:</strong> Content in the App does not constitute medical advice or patient care guidance</li>
                  <li><strong>Follow Local Protocols:</strong> Always follow your local medical protocols, scope of practice, and medical direction</li>
                  <li><strong>Verify Information:</strong> Always verify medical information with authoritative sources and qualified instructors</li>
                  <li><strong>No Warranty:</strong> We make no warranties about the accuracy, completeness, or reliability of the educational content</li>
                </ul>
                <p className="text-red-200 font-medium">
                  In emergency situations, always follow your training, protocols, and medical direction. When in doubt, 
                  consult with qualified medical professionals.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">4. License to Use</h2>
              <p className="mb-4">
                Subject to these terms, ProMedixEMS™ grants you a limited, non-exclusive, non-transferable license to:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Download and install the App on your personal devices</li>
                <li>Use the App for your personal educational purposes</li>
                <li>Access and use the educational content for studying</li>
              </ul>
              <p className="mt-4">
                This license is revocable and may be terminated at any time if you violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">5. Restrictions</h2>
              <p className="mb-4">You agree NOT to:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Copy, modify, distribute, or create derivative works of the App</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Use the App for commercial purposes without permission</li>
                <li>Share your account or license with others</li>
                <li>Remove or modify any proprietary notices or labels</li>
                <li>Use the App in any way that violates applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the App to provide medical advice to others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">6. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the App are owned by ProMedixEMS™ and are protected by 
                international copyright, trademark, and other intellectual property laws. The educational content is 
                based on publicly available EMT curriculum standards and fair-use educational materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">7. Payments and Subscriptions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-blue-200 mb-2">Payment Options:</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li><strong>One-time Purchase:</strong> $14.99 for lifetime access</li>
                    <li><strong>Monthly Subscription:</strong> $4.99/month with auto-renewal</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-200 mb-2">Billing Terms:</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Payments are processed through the App Store or Google Play</li>
                    <li>Subscriptions automatically renew unless cancelled</li>
                    <li>Cancel anytime through your App Store or Google Play account</li>
                    <li>Refunds are subject to App Store and Google Play policies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">8. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, 
                use, and protect your information when you use the App.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">9. Updates and Modifications</h2>
              <p>
                We may update the App from time to time to add features, fix bugs, or improve performance. 
                We may also modify these terms. Material changes will be communicated through the App or via email. 
                Continued use of the App after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">10. Disclaimers</h2>
              <div className="space-y-3">
                <p><strong>AS IS BASIS:</strong> The App is provided "as is" without warranties of any kind.</p>
                <p><strong>NO WARRANTY:</strong> We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.</p>
                <p><strong>EDUCATIONAL ACCURACY:</strong> While we strive for accuracy, we cannot guarantee that all content is error-free or current.</p>
                <p><strong>AVAILABILITY:</strong> We do not guarantee that the App will be available at all times or free from interruptions.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">11. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROMEDIXEMS™ SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, 
                ARISING OUT OF OR RELATING TO YOUR USE OF THE APP.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless ProMedixEMS™ from any claims, losses, liability, damages, and 
                expenses arising from your use of the App or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">13. Termination</h2>
              <p>
                We may terminate your access to the App at any time for violation of these terms. Upon termination, 
                your right to use the App will cease immediately. You may terminate your use by deleting the App from 
                your devices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">14. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of [Your State/Country], 
                without regard to conflict of law principles. Any disputes shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">15. Contact Information</h2>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p><strong>ProMedixEMS™ Legal Team</strong></p>
                <p>Email: legal@promedixems.com</p>
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
              <h3 className="text-lg font-semibold text-blue-300 mb-2">🚑 ProMedixEMS™ Commitment</h3>
              <p className="text-sm">
                ChapterFlashEMT is built by EMS professionals for EMS professionals. Our commitment is to provide 
                high-quality educational tools while maintaining the highest standards of safety, privacy, and professional excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}