import React from 'react';
import { Navbar } from '../components/Navbar';

export const AboutView = () => {
  return (
    <div className="min-h-screen text-white px-4 py-4">
      <Navbar onHistoryClick={() => {}} onHomeClick={() => window.location.href = '/'} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-700">
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="LearnFlow" className="w-24 h-24 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About LearnFlow</h1>
            <p className="text-gray-400 text-lg">Revolutionizing learning through spaced repetition</p>
          </div>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="mb-4">
                LearnFlow is designed to help students, professionals, and lifelong learners master any subject 
                through the scientifically-proven spaced repetition method. Our platform makes it easy to create, 
                organize, and study flashcards while optimizing your learning schedule for maximum retention.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Smart Spaced Repetition</h3>
                  <p>Our algorithm adapts to your learning pace, showing cards when you're most likely to forget them.</p>
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">Google Drive Sync</h3>
                  <p>Seamlessly sync your study materials across all devices with secure Google Drive integration.</p>
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-400 mb-2">Progress Tracking</h3>
                  <p>Monitor your learning progress with detailed analytics and performance insights.</p>
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">Smart Notifications</h3>
                  <p>Get reminded to study at optimal times based on your learning schedule.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Why Spaced Repetition Works</h2>
              <p className="mb-4">
                Spaced repetition is based on the psychological spacing effect, where information is more easily 
                recalled if learning is spread out over time. Studies show that spaced repetition can improve 
                long-term retention by up to 200% compared to traditional cramming methods.
              </p>
              <p>
                LearnFlow implements this scientifically-backed approach to help you learn more effectively, 
                retain information longer, and achieve your educational goals faster.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-white">Create Your First Deck</h4>
                    <p className="text-gray-400">Start by creating a deck for your subject area.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-white">Import or Create Cards</h4>
                    <p className="text-gray-400">Add flashcards by pasting formatted text or creating them manually.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-white">Start Studying</h4>
                    <p className="text-gray-400">Begin your study session and let our algorithm guide your learning.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Privacy & Security</h2>
              <p className="mb-4">
                We take your privacy seriously. Your study data is stored locally and optionally synced to your 
                personal Google Drive. We never sell your data or use it for advertising purposes.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/privacy"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Read Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Contact & Support</h2>
              <p className="mb-4">
                Have questions or need help? We're here to support your learning journey.
              </p>
              <div className="bg-slate-700/50 p-4 rounded-lg inline-block">
                <p className="mb-2"><strong>Email:</strong> contact@customs.best</p>
                <p><strong>Website:</strong> customs.best</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};