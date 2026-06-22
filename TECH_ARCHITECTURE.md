# Technical Architecture

## Recommended Stack

MVP:
- React Native
- Expo
- TypeScript
- AsyncStorage for local persistence

Later:
- Supabase for auth, cloud save, content management
- RevenueCat for subscriptions
- Expo Application Services for builds

## Recommended Repo Structure

inner-alchemy/
  app/
    index.tsx
  src/
    components/
      EmotionOrb.tsx
      CombineZone.tsx
      DiscoveryModal.tsx
      EmotionLibrary.tsx
      ProgressBar.tsx
    data/
      emotions.ts
      recipes.ts
    game/
      resolver.ts
      useGameState.ts
      storage.ts
    screens/
      LabScreen.tsx
      LibraryScreen.tsx
      ProfileScreen.tsx
    types/
      game.ts
  docs/
  data/

## Data Model

Emotion:
- id
- name
- type
- tier
- tags
- intensity
- insight
- unlock metadata optional

Recipe:
- id
- inputs
- output
- constraints optional

Resolver:
- Inputs are unordered.
- Same input twice should not produce a result unless explicitly defined.
- If recipe exists and output is undiscovered, add to discovered.
- If already discovered, show repeat state.
- If no recipe exists, show gentle no-result message.

## Persistence

MVP local state:
- discoveredIds
- combinationHistory
- onboardingComplete
- settings

Use AsyncStorage.

## Testing

Build basic tests for:
- unordered recipe matching
- discovered state update
- no-result handling
- repeat discovery handling
