# Inner Alchemy

Inner Alchemy is a mobile-first emotional alchemy game inspired by Little Alchemy.

Players combine emotional primitives to discover new emotions, complex mental states, and eventually transformational states such as healing, integration, wisdom, and flourishing.

This repository is the founder/developer handoff package for the first MVP.

Important product guardrail:
Inner Alchemy is a reflective game. It is not therapy, psychological assessment, diagnosis, treatment, or a substitute for professional mental health care.

Recommended build stack:
- React Native
- Expo
- TypeScript
- Local persistence for MVP
- Supabase later

## Run the Expo MVP locally

Prerequisites:
- Node.js 18 or newer
- pnpm 11 or newer
- Expo Go installed on an iOS or Android device, or a local simulator/emulator

Install dependencies:

```bash
pnpm install
```

Start Expo:

```bash
pnpm start
```

Then:
- Scan the QR code with Expo Go on a physical device.
- Press `i` in the Expo terminal to open iOS Simulator.
- Press `a` in the Expo terminal to open an Android emulator.
- Press `w` in the Expo terminal to open the web build.

Useful checks:

```bash
pnpm typecheck
```

The MVP stores progress locally with AsyncStorage. Use the Profile tab's reset action to clear progress and return to the eight starting primitives.
