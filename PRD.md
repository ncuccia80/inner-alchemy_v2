# Inner Alchemy - Product Requirements Document

## Product Summary

Inner Alchemy is a contemplative mobile game where players combine emotional states to discover new emotions and psychological concepts.

The core mechanic is familiar: combine two items and discover a new item. The innovation is the content domain. Instead of combining earth, fire, water, and air, players combine emotional primitives such as Love, Fear, Anger, Sadness, Joy, Disgust, Trust, and Anticipation.

## Product Positioning

Inner Alchemy should feel like:
- A game first
- A reflective emotional-literacy tool second
- Beautiful, thoughtful, and accessible
- Psychologically insightful without sounding clinical
- Premium without being pretentious

It must never present itself as therapy.

## Target Platforms

MVP:
- iOS through Expo
- Android through Expo

Initial development:
- React Native
- Expo
- TypeScript

Future:
- Supabase backend
- Cloud save
- Premium content
- Expansion packs

## Core User Experience

A player opens the app and sees a dark, minimal, beautiful game board. They start with 8 emotional primitives. They select or drag two emotions together. If the combination is valid, a discovery modal appears with the new emotion and a short insight. The player can continue experimenting, check the library, and track progress.

## MVP Features

Must include:
- 8 starting primitives
- Tap-to-combine or drag-to-combine interface
- Combination resolver
- Discovery modal
- Collection/library screen
- Progress counter
- Local persistence
- Reset progress
- Not-therapy disclaimer

Must not include in MVP:
- Account login
- Supabase
- Subscription payments
- Journaling
- AI features
- Social sharing
- Audio
- Full premium implementation

## Design Direction

Visual style:
- Dark mode first
- Minimalist
- Soft gradients
- Glowing emotion orbs/chips
- Smooth discovery animation
- Premium, contemplative, modern

Inspired by the Base44 prototype:
- Orb-based emotional UI
- Dark contemplative background
- Discovery modal with glow effect
- Collection sheet / library concept
- Progress tracking
- Premium architecture reserved for later

## Success Criteria

The first MVP succeeds if:
1. A stranger understands the mechanic in under 60 seconds.
2. A stranger can play for 15-20 minutes.
3. Discoveries feel emotionally resonant.
4. The player wants to keep exploring.
5. The game feels like a real product, not a clinical worksheet.

## Safety and Ethical Guardrails

- Do not diagnose the user.
- Do not claim to treat emotional distress.
- Do not use crisis-oriented content in MVP.
- Include a gentle disclaimer.
- For intense states, support a future intensity filter.
