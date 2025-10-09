# LearnFlow - Spaced Repetition Learning App

A modern, browser-based spaced repetition learning application built with React and Vite. Create custom flashcard decks, import questions, and leverage scientifically-proven spaced repetition algorithms to optimize your study sessions.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment-to-netlify)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Data Storage](#data-storage)
- [Browser Compatibility](#browser-compatibility)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Custom Deck Creation** - Create unlimited decks for any subject
- **Smart Spaced Repetition** - Automatically schedules reviews based on your performance using a modified SM-2 algorithm
- **Question Import** - Import multiple-choice questions from formatted text
- **Progress Tracking** - View detailed statistics on your study sessions
- **Study Notifications** - Optional reminders when cards are due for review
- **Persistent Storage** - All data saved in browser localStorage
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **localStorage** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. **Clone the repository:**
```bash
   git clone <your-repo-url>
   cd cardapp

Install dependencies:

bash   npm install

Start the development server:

bash   npm run dev

Open your browser to http://localhost:5173

Building for Production
bashnpm run build
The production-ready files will be in the dist/ directory.
🌐 Deployment to Netlify
Method 1: Drag and Drop

Run npm run build
Drag the dist folder to Netlify Drop

Method 2: Git Integration (Recommended)

Push your code to GitHub
Connect your repository to Netlify
Configure build settings:

Build command: npm run build
Publish directory: dist


Deploy


⚠️ Important: Create a public/_redirects file with the following content for proper routing:
/*    /index.html   200

📁 Project Structure
cardapp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── DeckCard.jsx
│   │   ├── FlashCard.jsx
│   │   ├── Icon.jsx
│   │   ├── Navbar.jsx
│   │   └── NotificationToast.jsx
│   ├── views/              # Page-level components
│   │   ├── HomeView.jsx
│   │   ├── StudyView.jsx
│   │   └── NotificationHistoryModal.jsx
│   ├── context/            # React Context for state management
│   │   └── AppContext.jsx
│   ├── utils/              # Helper functions
│   │   ├── storage.js
│   │   ├── spacedRepetition.js
│   │   └── questionParser.js
│   ├── hooks/              # Custom React hooks
│   │   └── useNotifications.js
│   ├── constants/          # App configuration
│   │   └── index.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
│   └── _redirects          # Netlify routing config
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
📖 Usage
Creating a Deck

Enter a deck name in the "Create a New Deck" section
Click "Create Deck"

Importing Questions

Select a deck from the dropdown
Click "Paste Content to Import"
Paste questions in the following format:

0001. Question text here?
A. First option
B. Second option
C. Third option
D. Fourth option
Answer: B

Click "Import Questions"

Studying

Click "Start Studying" on any deck with due cards
Read the question and select an answer
Click "Check Answer" to reveal the correct answer
Rate your recall:

Again (1 min) - Review very soon
Hard (1 hour) - Review shortly
Good (1 day) - Standard interval
Easy (4 days) - Longer interval



Spaced Repetition Algorithm
The app uses a simplified SM-2 algorithm:
RatingNext ReviewEffectAgain1 minuteResets the card progressHard1 hourShort intervalGood1 dayStandard intervalEasy4 daysLonger interval
Intervals increase with successful reviews and reset with failures.
💾 Data Storage
All data is stored in browser localStorage under these keys:

learnflow_decks - Deck metadata
learnflow_cards - Card content
learnflow_progress - Review history and scheduling
learnflow_notif_history - Notification history
learnflow_notified_ids - Recently notified cards
learnflow_last_session - Last study session results


⚠️ Warning: Clearing browser data will delete all your decks and progress. Consider implementing export/import functionality for backups.

🌍 Browser Compatibility

Chrome/Edge 90+
Firefox 88+
Safari 14+

Requires localStorage support.
🐛 Known Issues

Stats tracking requires the useEffect dependency fix (only [session], not [session, progress])
No cloud sync - data is device-specific
No export/import feature yet

🔮 Future Enhancements

 Export/Import decks as JSON
 Cloud sync with database backend
 Multiple question types (true/false, fill-in-the-blank)
 Study streaks and achievements
 Dark/light theme toggle
 Markdown support in questions
 Image support in flashcards

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is open source and available under the MIT License.
💬 Support
For issues and questions, please open an issue on the GitHub repository.
🙏 Acknowledgments

Spaced repetition algorithm inspired by SuperMemo's SM-2
UI design inspired by modern flashcard applications like Anki