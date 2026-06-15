# LifeOS: The Career Evolution Dashboard 🚀

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ac5d6bc-dcd4-433c-a26a-dd8e60e78b65/deploy-status)](https://app.netlify.com/projects/lifeoshq/deploys)

LifeOS is a personal operating system for structured career transitions. It synchronises rigorous technical learning paths (GTM Engineering & Software Engineering) with daily discipline, habits, and curated knowledge into a single high-performance dashboard — built around one simple idea: *organise your life better*.

## 🌟 Key Features

- **Multi-Track Mastery**: Simultaneous tracking for GTME roadmaps and elite SWE curricula (DSA, System Design, Cloud).
- **High-Density Dashboard**: A GitHub-inspired "Momentum" heatmap and progress rings to visualise consistency across 28-day cycles.
- **Knowledge Capsules**: Drop in any link (YouTube, LinkedIn, article) and get an AI-generated summary, auto-category, and a consume/done queue so nothing stays buried.
- **PWA & Mobile-First**: Fully installable on iOS and Android with fullscreen standalone mode and offline capabilities.
- **Robust Sync Engine**: Firestore multi-tab persistence ensures data entered offline is never lost and syncs automatically on reconnection.
- **Intelligent Navigation**: Isolated tab memory allows independent month/week tracking for the Dashboard, GTME, SWE, Habits, and Capsules.
- **Stable Data Foundation**: Content-based semantic IDs protect user progress from curriculum reordering or updates.

## 📱 Mobile Installation

LifeOS is optimised for your smartphone:
- **iOS**: Open the app in **Safari**, tap the **Share** button, and select **"Add to Home Screen"**.
- **Android**: Open the app in **Chrome** and follow the automated **"Add to Home Screen"** prompt.

## 🛠 Tech Stack
*   **Core:** React 19, Vite, React Router
*   **Styling:** Tailwind CSS
*   **Database/Auth:** Firebase Firestore + Google Auth
*   **AI:** Gemini 2.5 Flash Lite (via Netlify serverless function)
*   **Hosting:** Netlify (with serverless functions for server-side API calls)
*   **PWA:** Service Workers, Web Manifest

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/DeeepshikhaRaghuvanshi/lifeos.git
   cd lifeos
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add environment variables — copy `.env.example` to `.env` and fill in your Firebase config and Gemini API key.

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🏗 Architecture

- `/src/components/Dashboard/`: Analytics widgets (Heatmap, Rings, Pagination).
- `/src/components/KnowledgeCapsules/`: Swimlane view, capsule cards, add-link modal.
- `/src/hooks/`: Firebase data hooks (`useProgressTracker`, `useKnowledgeCapsules`, `useAuth`).
- `/netlify/functions/summarize.js`: Serverless function — fetches page metadata and calls Gemini API server-side.
- `/src/utils/trackMerger.js`: Centralised logic for multi-track synchronisation.
- `/src/utils/idGenerator.js`: Semantic hashing for stable progress tracking.
