import React from 'react';
import { Navbar } from '../components/Navbar';

export const TermsOfServiceView = () => {
  return (
    <div className="min-h-screen text-white px-4 py-4">
      <Navbar onHistoryClick={() => {}} onHomeClick={() => window.location.href = '/'} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-700">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Terms of Service</h1>
          <p className="text-gray-400 text-sm mb-8">Effective Date: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using LearnFlow ("the Service"), you accept and agree to be bound by these Terms of Service ("Terms"). 
                If you do not agree to these Terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="mb-4">
                LearnFlow is a web-based spaced repetition learning application that helps users create, manage, and study 
                educational content through flashcards and decks. The Service includes:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Flashcard creation and management tools</li>
                <li>Spaced repetition algorithm for optimized learning</li>
                <li>Google Drive integration for data synchronization</li>
                <li>Progress tracking and analytics</li>
                <li>Study reminders and notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts and Registration</h2>
              <div className="space-y-4">
                <p>To use LearnFlow, you must:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Be at least 13 years of age</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
                <p className="text-sm text-gray-400">
                  You are responsible for maintaining the confidentiality of your Google account used to access LearnFlow.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
              <div className="space-y-4">
                <p>You agree NOT to use LearnFlow to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Upload or share illegal, harmful, or offensive content</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights of others</li>
                  <li>Attempt to reverse engineer or hack the Service</li>
                  <li>Share copyrighted educational materials without permission</li>
                  <li>Spam, harass, or abuse other users</li>
                  <li>Use the Service for commercial purposes without authorization</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Content and Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Your Content</h3>
                  <p>You retain ownership of all content you create and upload to LearnFlow. By using our Service, you grant us a limited license to:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Store and process your content to provide the Service</li>
                    <li>Backup and sync your content via Google Drive</li>
                    <li>Display your content within the application</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Our Content</h3>
                  <p>LearnFlow and its original content, features, and functionality are owned by us and protected by international copyright, trademark, and other intellectual property laws.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our collection and use of your information is governed by our Privacy Policy, 
                which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
              <div className="space-y-4">
                <p>We strive to maintain Service availability, but we do not guarantee:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Uninterrupted or error-free operation</li>
                  <li>That the Service will meet your specific requirements</li>
                  <li>That defects will be corrected promptly</li>
                  <li>Compatibility with all devices or browsers</li>
                </ul>
                <p className="text-sm text-gray-400">
                  We reserve the right to modify, suspend, or discontinue the Service at any time with reasonable notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
              <div className="space-y-4">
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>LearnFlow is provided "AS IS" without warranties of any kind</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability is limited to the amount paid by you in the last 12 months</li>
                  <li>We are not responsible for data loss or corruption</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of 
                LearnFlow, your violation of these Terms, or your infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
              <div className="space-y-4">
                <p>Either party may terminate this agreement at any time:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>You may stop using the Service and delete your account</li>
                  <li>We may suspend or terminate your access for Terms violations</li>
                  <li>We may discontinue the Service with 30 days notice</li>
                </ul>
                <p className="text-sm text-gray-400">
                  Upon termination, you may export your data before account deletion.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Dispute Resolution</h2>
              <div className="space-y-4">
                <p>Any disputes arising from these Terms will be resolved through:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Good faith negotiations</li>
                  <li>Binding arbitration if negotiations fail</li>
                  <li>Individual basis only (no class actions)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the jurisdiction where 
                LearnFlow operates, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of material changes by posting 
                the updated Terms with a new effective date. Your continued use after changes constitutes acceptance 
                of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="mb-2">If you have questions about these Terms of Service, please contact us:</p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> contact@customs.best</li>
                  <li><strong>Website:</strong> customs.best</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will 
                continue to be valid and enforceable.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};