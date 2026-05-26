---
name: life-os-workflow
description: Specialized workflow for the LifeOS (formerly GTME Tracker) application. Use when managing the LifeOS project, including career track updates, URL routing, UI restoration, and multi-track dashboard synchronization.
---

# LifeOS Workflow

This skill guides the development and maintenance of LifeOS, a career-transition dashboard.

## Project Context
LifeOS (originally gtme-tracker) manages multiple upskilling tracks:
- **GTME Track**: GTM Engineering upskilling (3-month focus).
- **SWE Track**: Software Engineering upskilling (starts Month 2, ends Month 4).
- **Habit Tracker**: Daily discipline (Meditation, Affirmations, Exercise).

## Core Principles

### 1. URL-Based Routing
Always use `react-router-dom` for top-level navigation.
- `/`: Dashboard (Heatmap, Progress, Combined Checklist).
- `/gtme`: GTME Tracker (Original vertical grid view).

### 2. Smart Navigation
The `PhaseNavigation` component must be "page-aware":
- On `/gtme`: Show only Months 1-3.
- On Dashboard: Show all months available across all tracks (currently 4).

### 3. UI Consistency
Maintain the "devout" and "disciplined" aesthetic.
- Use `getTypeStyles` in `src/utils/helpers.jsx` to map task types to specific colors:
  - `Active`: Indigo
  - `Theory`: Blue
  - `Passive`: Teal
  - `Databricks Integration`: Orange
  - `Revision`: Amber

## Development Workflow

### Step 1: Branching (Mandatory)
Before starting any implementation:
1. Create a descriptive feature branch: `feature/brief-description`.
2. Do NOT work directly on `main`.

### Step 2: Atomic Commits
Commit after each logical unit of work (e.g., "feat: update swe data", "style: fix header layout").

### Step 3: Conflict Resolution & Sync
When syncing with the original repo (`upstream`):
1. Fetch and merge `upstream/main`.
2. Use **Hard Reset** if the upstream has a "Squash and Merge" history that diverges from local commits:
   `git reset --hard upstream/main`
   `git push origin main --force`

### Step 4: Verification
Always run `npm run lint` before finalizing a session.
