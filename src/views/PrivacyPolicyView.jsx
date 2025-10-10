import React from 'react';
import { Navbar } from '../components/Navbar';

export const PrivacyPolicyView = () => {
  return (
    <div className="min-h-screen text-white px-4 py-4">
      <Navbar onHistoryClick={() => {}} onHomeClick={() => window.location.href = '/'} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-700">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-8">Effective Date: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                LearnFlow ("we," "our," or "us") operates the LearnFlow spaced repetition learning application. 
                This Privacy Policy explains how we collect, use, and protect your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Google Account Information</h3>
                  <p>When you sign in with Google OAuth, we collect:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Your Google account email address</li>
                    <li>Your basic profile information (name, profile picture)</li>
                    <li>Google Drive access for syncing study materials</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Study Data</h3>
                  <p>We collect and store:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Your created study decks and flashcards</li>
                    <li>Study session progress and performance metrics</li>
                    <li>Spaced repetition algorithm data</li>
                    <li>Learning preferences and settings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Usage Information</h3>
                  <p>We automatically collect:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>App usage statistics and interaction patterns</li>
                    <li>Device information and browser type</li>
                    <li>IP address and general location data</li>
                    <li>Error logs and performance metrics</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Provide and maintain the LearnFlow service</li>
                <li>Sync your study materials across devices via Google Drive</li>
                <li>Personalize your learning experience</li>
                <li>Analyze usage patterns to improve our service</li>
                <li>Send study reminders and notifications (with your consent)</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage and Security</h2>
              <div className="space-y-4">
                <p>
                  Your study data is stored locally in your browser and optionally synced to your Google Drive. 
                  We implement appropriate security measures to protect your information, including:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Encryption in transit using HTTPS/TLS</li>
                  <li>OAuth 2.0 for secure Google authentication</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and monitoring systems</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing</h2>
              <p className="mb-4">We do not sell, trade, or rent your personal information. We may share data only in these limited circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
              <div className="space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Access, update, or delete your personal information</li>
                  <li>Revoke Google Drive access at any time</li>
                  <li>Opt out of notifications and communications</li>
                  <li>Export your study data</li>
                  <li>Request data portability</li>
                </ul>
                <p className="text-sm text-gray-400 mt-4">
                  To exercise these rights, please contact us at contact@customs.best
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
              <p className="mb-4">
                LearnFlow integrates with Google services (OAuth, Drive) which have their own privacy policies. 
                We recommend reviewing Google's Privacy Policy to understand how they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p>
                We retain your information as long as your account is active or as needed to provide services. 
                You may delete your account and associated data at any time. Some information may be retained 
                for legal compliance or legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p>
                LearnFlow is not intended for children under 13. We do not knowingly collect personal information 
                from children under 13. If we become aware of such collection, we will take steps to delete the information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes by 
                posting the new policy on this page with an updated effective date. Your continued use of 
                LearnFlow after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="mb-2">If you have questions about this Privacy Policy, please contact us:</p>
                <ul className="space-y-1">
                  <li><strong>Email:</strong> contact@customs.best</li>
                  <li><strong>Website:</strong> customs.best</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};