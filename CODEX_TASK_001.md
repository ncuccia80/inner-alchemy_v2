# CODEX_TASK_001

Build the first playable MVP of Inner Alchemy.

## Instructions

Read all files in this repository before coding:
- README.md
- docs/PRD.md
- docs/MVP_SCOPE.md
- docs/ONTOLOGY.md
- docs/UX_SPEC.md
- docs/TECH_ARCHITECTURE.md
- data/emotions.json
- data/recipes.json

## Build Stack

Use:
- React Native
- Expo
- TypeScript
- AsyncStorage for local persistence

## Build Requirements

Create a working mobile-first app with:

1. Onboarding
   - Simple explanation
   - Not-therapy disclaimer
   - Tutorial combination: Fear + Love = Jealousy

2. Lab Screen
   - 8 starting primitives
   - Tap-to-select/tap-to-combine interface
   - Combination resolver
   - Gentle invalid-combo response
   - Progress counter

3. Discovery Modal
   - New discovery reveal
   - Emotion name
   - Insight text
   - Tier label
   - Continue button

4. Library Screen
   - Discovered emotions
   - Emotion detail view
   - Recipe display for discovered emotions

5. Profile/Settings Screen
   - Reset progress
   - Disclaimer
   - Basic progress summary

6. Data Loading
   - Load from data/emotions.json and data/recipes.json
   - Do not hardcode recipes inside components

## Do Not Build Yet

Do not build:
- Subscriptions
- Login
- Supabase
- Journaling
- AI features
- Social sharing
- Audio
- Therapist/coaching features
- Full premium system

## Design Standard

The app should look beautiful enough to show to a potential collaborator.

Use:
- Dark mode first
- Soft gradients
- Glowing emotion orbs or chips
- Smooth discovery animation
- Clean typography

## Acceptance Criteria

The task is complete when:
- The app runs in Expo.
- The user can start with 8 primitives.
- The user can discover Jealousy, Grief, Anxiety, and at least 20 other states.
- Progress persists after closing/reopening.
- Library reflects discovered states.
- Reset works.
- No premium, login, or scope creep is added.
