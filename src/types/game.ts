export type EmotionType = 'emotion' | 'modifier';
export type EmotionIntensity = 'low' | 'medium' | 'high';

export type Emotion = {
  id: string;
  name: string;
  type: EmotionType;
  tier: number;
  tags: string[];
  intensity: EmotionIntensity;
  insight: string;
  unlock?: {
    minDiscoveries?: number;
  };
  futurePremium?: boolean;
};

export type Recipe = {
  id: string;
  inputs: string[];
  output: string;
};

export type CombinationStatus = 'new' | 'known' | 'invalid' | 'locked' | 'incomplete';

export type CombinationResult = {
  status: CombinationStatus;
  output?: Emotion;
  recipe?: Recipe;
  message: string;
};

export type CombinationRecord = {
  id: string;
  inputs: string[];
  output?: string;
  status: CombinationStatus;
  createdAt: string;
};

export type GameSnapshot = {
  discoveredIds: string[];
  combinationHistory: CombinationRecord[];
  onboardingComplete: boolean;
};

export type TabKey = 'lab' | 'library' | 'profile';
