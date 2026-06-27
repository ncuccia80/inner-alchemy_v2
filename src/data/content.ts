import rawEmotions from '../../emotions.json';
import rawRecipes from '../../recipes.json';
import { Emotion, Recipe } from '../types/game';

export const emotions = rawEmotions as Emotion[];
export const recipes = rawRecipes as Recipe[];

export const emotionById = emotions.reduce<Record<string, Emotion>>((lookup, emotion) => {
  lookup[emotion.id] = emotion;
  return lookup;
}, {});

export const primitiveEmotionIds = emotions.filter((emotion) => emotion.tier === 0 && emotion.type === 'emotion').map((emotion) => emotion.id);

export const playableEmotionIds = emotions
  .filter((emotion) => !emotion.futurePremium)
  .map((emotion) => emotion.id);

export const playableRecipeIds = recipes
  .filter((recipe) => {
    const output = emotionById[recipe.output];
    return Boolean(output && !output.futurePremium && recipe.inputs.every((id) => emotionById[id] && !emotionById[id].futurePremium));
  })
  .map((recipe) => recipe.id);

export const libraryEmotionIds = [
  ...primitiveEmotionIds,
  ...recipes
    .filter((recipe) => playableRecipeIds.includes(recipe.id))
    .map((recipe) => recipe.output)
].filter((id, index, all) => all.indexOf(id) === index);

export function getRecipeForOutput(outputId: string) {
  return recipes.find((recipe) => recipe.output === outputId);
}

export function getTierLabel(tier: number) {
  if (tier === 0) {
    return 'Primitive';
  }
  if (tier === 1) {
    return 'Tier 1 Discovery';
  }
  return 'Tier 2 State';
}
