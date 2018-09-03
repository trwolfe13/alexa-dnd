import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Levels from '../data/levels.json';

import { IntentHandler, IntentMap } from '../framework';

export class MagicItemsIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      LevelsAbsoluteExperience: this.absoluteExperience,
      LevelsRelativeExperience: this.relativeExperience,
      LevelsProficiency: this.proficiencyBonus,
    };
  }

  absoluteExperience(handlerInput: HandlerInput, intent: Intent): Response {
    const level = Number(intent.slots.level.value);

    if (level < 1 || level > 20) {
      return handlerInput.responseBuilder
        .speak('Character levels only go between 1 and 20.')
        .getResponse();
    }

    const xp = Levels[level.toString()].experience;
    return handlerInput.responseBuilder
      .speak(`You need ${xp} experience points to reach level ${level}.`)
      .getResponse();
  }

  relativeExperience(handlerInput: HandlerInput, intent: Intent): Response {
    const lowerLevel = Number(intent.slots.lowerLevel.value);
    const upperLevel = Number(intent.slots.upperLevel.value);

    if (lowerLevel < 1 || lowerLevel > 20 || upperLevel < 1 || upperLevel > 20) {
      return handlerInput.responseBuilder
        .speak('Character levels are between 1 and 20.')
        .getResponse();
    }

    if (lowerLevel === upperLevel) {
      return handlerInput.responseBuilder
        .speak(`You are already at level ${lowerLevel}.`)
        .getResponse();
    }

    if (lowerLevel > upperLevel) {
      return handlerInput.responseBuilder
        .speak('You can\'t decrease in levels.')
        .getResponse();
    }

    const lower = Levels[lowerLevel.toString()].experience;
    const upper = Levels[upperLevel.toString()].experience;

    const xp = upper - lower;
    return handlerInput.responseBuilder
      .speak(`You need ${xp} experience points to reach level ${upperLevel}.`)
      .getResponse();
  }

  proficiencyBonus(handlerInput: HandlerInput, intent: Intent): Response {
    const level = Number(intent.slots.level.value);

    if (level < 1 || level > 20) {
      return handlerInput.responseBuilder
        .speak('Character levels only go between 1 and 20.')
        .getResponse();
    }

    const prof = Levels[level.toString()].proficiency;
    return handlerInput.responseBuilder
      .speak(`At level ${level}, your proficiency bonus is plus ${prof}.`)
      .getResponse();
  }
}
