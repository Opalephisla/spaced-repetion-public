import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { DeckCard } from '../components/DeckCard';
import { Icon } from '../components/Icon';
import { parseQuestionsFromText } from '../utils/questionParser';
import { getDueCards } from '../utils/spacedRepetition';

export const HomeView = ({ onStartStudy, onShowHistory }) => {
  const {
    decks,
    setDecks,
    cards,
    setCards,
    progress,
    addNotification,
    lastSession,
    notificationsEnabled,
    setNotificationsEnabled
  } = useApp();

  const [newDeckName, setNewDeckName] = useState('');
  const [importDeckId, setImportDeckId] = useState(decks[0]?.id || '');
  const [pasteContent, setPasteContent] = useState('');
  const [showPasteBox, setShowPasteBox] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleCreateDeck = () => {
    if (!newDeckName.trim()) return;

    const deck = {
      id: `deck-${Date.now()}`,
      name: newDeckName.trim(),
      createdAt: new Date().toISOString()
    };

    setDecks(prev => [...prev, deck]);
    setNewDeckName('');
    setImportDeckId(deck.id);
    addNotification('Success!', `Deck "${deck.name}" created.`, 'success');
  };

  const handleImport = () => {
    if (!pasteContent.trim()) {
      setUploadStatus('Please paste content first.');
      setTimeout(() => setUploadStatus(''), 2000);
      return;
    }

    if (!importDeckId) {
      setUploadStatus('Please select a deck.');
      setTimeout(() => setUploadStatus(''), 2000);
      return;
    }

    const parsed = parseQuestionsFromText(pasteContent).map(q => ({
      ...q,
      deckId: importDeckId
    }));

    if (parsed.length > 0) {
      setCards(prev => [...prev, ...parsed]);
      const deckName = decks.find(d => d.id === importDeckId)?.name || 'the deck';
      setUploadStatus(`Imported ${parsed.length} questions to ${deckName}!`);
      addNotification('Success!', `Imported ${parsed.length} questions.`, 'success');
      setPasteContent('');
      setShowPasteBox(false);
      setTimeout(() => setUploadStatus(''), 3000);
    } else {
      setUploadStatus('No questions found. Check format.');
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  const handleStartStudy = (deckId) => {
    const deckCards = cards.filter(c => c.deckId === deckId);
    const dueCards = getDueCards(deckCards, progress);

    if (dueCards.length === 0) {
      addNotification('No Cards Due', 'Come back later for more reviews!', 'info');
      return;
    }

    const shuffled = [...dueCards].sort(() => Math.random() - 0.5);
    const deckName = decks.find(d => d.id === deckId)?.name || 'Selected Deck';

    onStartStudy({ deckId, deckName, cards: shuffled });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    addNotification(
      notificationsEnabled ? 'Notifications Disabled' : 'Notifications Enabled',
      notificationsEnabled
        ? 'You will no longer receive reminders.'
        : 'You will receive study reminders!',
      notificationsEnabled ? 'info' : 'success'
    );
  };

  return (
    <div className="min-h-screen text-white px-4 py-4">
      <Navbar onHistoryClick={onShowHistory} onHomeClick={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Spaced Repetition Learning
          </h1>
          <p className="text-gray-400 text-lg">Create custom decks for any subject.</p>
          
          <button
            onClick={toggleNotifications}
            className={`mt-4 flex items-center justify-center mx-auto ${
              notificationsEnabled
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white text-sm py-2 px-4 rounded-lg transition-colors shadow-lg`}
          >
            <Icon type="bell" />
            <span className="ml-2">
              {notificationsEnabled ? '✓ Notifications Enabled' : 'Enable Notifications'}
            </span>
          </button>
        </div>

        {/* Last Session Stats */}
        {lastSession && (
  <div className="mb-8 bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
    <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Recent Study Session</h3>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-700/50 p-4 rounded-lg gap-4">
      <div className="flex-1">
        <p className="text-sm text-gray-400">Deck</p>
        <p className="text-base sm:text-lg font-semibold text-white break-words">{lastSession.deckName}</p>
      </div>
      <div className="text-left sm:text-right">
        <p className="text-sm text-gray-400">Accuracy</p>
        <p className="text-lg sm:text-xl font-semibold text-green-400">
          {lastSession.total > 0
            ? Math.round((lastSession.correct / lastSession.total) * 100)
            : 0}%
        </p>
        <p className="text-xs text-gray-500">
          ({lastSession.correct} correct / {lastSession.incorrect} incorrect)
        </p>
      </div>
    </div>
  </div>
)}

<div className="mb-8 bg-slate-800 rounded-xl p-6">
  <h3 className="text-xl font-bold text-white mb-4">Create a New Deck</h3>
  <div className="flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      value={newDeckName}
      onChange={e => setNewDeckName(e.target.value)}
      onKeyPress={e => e.key === 'Enter' && handleCreateDeck()}
      placeholder="Enter deck name..."
      className="flex-grow bg-slate-700 text-white rounded-lg p-3 text-sm border-2 border-slate-600 focus:border-blue-500 outline-none"
    />
    <button
      onClick={handleCreateDeck}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
    >
      <Icon type="plus" />
      <span className="ml-2">Create Deck</span>
    </button>
  </div>
</div>

        {/* Import Questions Section */}
        <div className="mb-8 bg-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-3">Import Questions</h3>
          
          <div className="flex items-center gap-4 mb-4">
            <label className="text-sm font-medium text-gray-400">Import to:</label>
            <select
              value={importDeckId}
              onChange={e => setImportDeckId(e.target.value)}
              className="bg-slate-700 text-white rounded-lg p-2 text-sm border-2 border-slate-600 focus:border-blue-500 outline-none flex-grow"
            >
              {decks.length === 0 ? (
                <option disabled>Create a deck first</option>
              ) : (
                decks.map(deck => (
                  <option key={deck.id} value={deck.id}>
                    {deck.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            onClick={() => setShowPasteBox(!showPasteBox)}
            className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            <Icon type="plus" />
            <span className="ml-2 text-sm">Paste Content to Import</span>
          </button>

          {showPasteBox && (
            <div className="mt-4 space-y-3">
              <textarea
                value={pasteContent}
                onChange={e => setPasteContent(e.target.value)}
                placeholder="Format: 0001. Question... A. Option 1 B. Option 2 C. Option 3 D. Option 4 Answer: A"
                className="w-full h-48 bg-slate-700 text-white rounded-lg p-4 text-sm border-2 border-slate-600 focus:border-blue-500 outline-none font-mono"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleImport}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Import Questions
                </button>
                <button
                  onClick={() => setShowPasteBox(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {uploadStatus && (
            <div
              className={`mt-3 text-center text-sm p-3 rounded-lg ${
                uploadStatus.includes('Successfully') || uploadStatus.includes('Imported')
                  ? 'bg-green-900 text-green-200'
                  : 'bg-blue-900 text-blue-200'
              }`}
            >
              {uploadStatus}
            </div>
          )}
        </div>

        {/* Decks Grid */}
        <h2 className="text-2xl font-bold text-white mb-4">Your Decks</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {decks.map(deck => {
            const deckCards = cards.filter(c => c.deckId === deck.id);
            const dueCards = getDueCards(deckCards, progress);

            return (
              <DeckCard
                key={deck.id}
                deck={deck}
                dueCount={dueCards.length}
                totalCount={deckCards.length}
                onStart={handleStartStudy}
              />
            );
          })}
          {decks.length === 0 && (
            <p className="text-gray-400 sm:col-span-2 text-center">
              You haven't created any decks yet. Add one above to get started!
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img src="/logo.svg" alt="LearnFlow" className="w-8 h-8" />
              <span className="text-white font-semibold">LearnFlow</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm">
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="mailto:contact@customs.best"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 LearnFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};