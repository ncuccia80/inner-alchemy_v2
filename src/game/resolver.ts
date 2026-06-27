import { emotionById, recipes } from '../data/content';
import { CombinationResult, Recipe } from '../types/game';

function sameInputs(left: string[], right: string[]) {
  if (left.length !== right.length) {
    return false;
  }

  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((value, index) => value === sortedRight[index]);
}

export function findRecipe(inputIds: string[]): Recipe | undefined {
  return recipes.find((recipe) => sameInputs(recipe.inputs, inputIds));
}

export function resolveCombination(inputIds: string[], discoveredIds: string[], usableIds = discoveredIds): CombinationResult {
  if (inputIds.length < 2) {
    return {
      status: 'incomplete',
      message: 'Choose two states to begin the experiment.'
    };
  }

  const uniqueInputs = new Set(inputIds);
  if (uniqueInputs.size !== inputIds.length) {
    return {
      status: 'invalid',
      message: 'This state is already fully itself.'
    };
  }

  const unavailable = inputIds.find((id) => !usableIds.includes(id));
  if (unavailable) {
    return {
      status: 'locked',
      message: 'That ingredient has not been discovered yet.'
    };
  }

  const recipe = findRecipe(inputIds);
  if (!recipe) {
    return {
      status: 'invalid',
      message: 'No new state emerged. Try a different pairing.'
    };
  }

  const output = emotionById[recipe.output];
  if (!output || output.futurePremium) {
    return {
      status: 'invalid',
      message: 'That path is quiet for now.'
    };
  }

  if (discoveredIds.includes(output.id)) {
    return {
      status: 'known',
      output,
      recipe,
      message: `${output.name} is already in your library.`
    };
  }

  return {
    status: 'new',
    output,
    recipe,
    message: `${output.name} emerged.`
  };
}
