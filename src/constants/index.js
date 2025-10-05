export const STORAGE_KEYS = {
    PROGRESS: 'learnflow_progress',
    DECKS: 'learnflow_decks',
    CARDS: 'learnflow_cards',
    NOTIFICATIONS: 'learnflow_notif_history',
    NOTIFIED_IDS: 'learnflow_notified_ids',
    LAST_SESSION: 'learnflow_last_session'
  };
  
  export const INITIAL_DECKS = [
    { 
      id: 'deck-medical-initial', 
      name: 'Medical Questions', 
      createdAt: new Date().toISOString() 
    },
    { 
      id: 'deck-music-initial', 
      name: 'Piano & Music Theory', 
      createdAt: new Date().toISOString() 
    }
  ];
  
  export const INITIAL_CARDS = [
    {
      id: 1,
      deckId: 'deck-medical-initial',
      type: 'multiple_choice',
      topic: 'SIDS Risk Factors',
      question: 'Which of the following maternal factors is most strongly associated with increased risk of Sudden Infant Death Syndrome (SIDS)?',
      options: [
        'Maternal age over 35',
        'Maternal age under 20',
        'History of gestational diabetes',
        'Multiparity (4+ children)'
      ],
      correctAnswer: 1,
      explanation: 'Maternal age under 20, inadequate prenatal care, and maternal smoking or substance use are significant risk factors for SIDS.',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      deckId: 'deck-medical-initial',
      type: 'multiple_choice',
      topic: 'Anaphylaxis',
      question: 'A 4-year-old boy develops urticaria, wheezing, and stridor minutes after being stung by a bee. What is the immediate, first-line treatment?',
      options: [
        'Intravenous diphenhydramine',
        'Nebulized albuterol',
        'Intramuscular epinephrine',
        'Oral corticosteroid'
      ],
      correctAnswer: 2,
      explanation: 'Intramuscular epinephrine is the first-line treatment for anaphylaxis and should be administered immediately.',
      createdAt: new Date().toISOString()
    }
  ];
  
  export const QUALITY_RATINGS = {
    AGAIN: 1,
    HARD: 3,
    GOOD: 4,
    EASY: 5
  };