import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import { DialogIntentHandler, IntentMap } from '../framework';

export class CharacterAbilitiesIntentHandler extends DialogIntentHandler {
  get intents(): IntentMap {
    return {
      CharacterStrengthVerbIntent: this.characterStrengthVerb,
      CharacterJumpVerbIntent: this.characterJumpVerb,
      CharacterBreathIntent: this.characterBreath
    };
  }

  characterStrengthVerb(handlerInput: HandlerInput, intent: Intent): Response {
    const strength = Number(intent.slots.strength.value);

    const verbSlot = intent.slots.verb;
    const verb = verbSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;

    let speech = `I don\'t know how much you can ${verb}.`;
    switch (verb) {
      case 'push': speech = `You can push up to ${strength * 30} pounds.`; break;
      case 'drag': speech = `You can drag up to ${strength * 30} pounds.`; break;
      case 'lift': speech = `You can lift up to ${strength * 30} pounds.`; break;
      case 'carry': speech = `You can carry up to ${strength * 15} pounds.`; break;
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }

  characterJumpVerb(handlerInput: HandlerInput, intent: Intent): Response {
    const strength = Number(intent.slots.strength.value);

    const verbSlot = intent.slots.verb;
    const verb = verbSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;

    let speech = 'I don\'t know how far you can jump.';
    switch (verb) {
      case 'far': {
        const standingLong = Math.floor(strength / 2);
        speech = `You can jump ${standingLong} feet from standing or ${strength} feet with a run-up.`;
        break;
      }
      case 'high': {
        const strengthMod = Math.floor((strength - 10) / 2);
        const runningHigh = Math.max(0, strengthMod + 3);
        const standingHigh = Math.floor(runningHigh / 2);
        speech = `You can jump ${standingHigh} feet high from standing or ${runningHigh} feet high with a run-up.`;
        break;
      }
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }

  characterBreath(handlerInput: HandlerInput, intent: Intent): Response {
    const constitution = Number(intent.slots.constitution.value);
    const conMod = Math.floor((constitution - 10) / 2);
    const seconds = Math.max(60 + conMod * 60, 30);
    const breath = seconds >= 60 ? `${seconds / 60} minutes` : `${seconds}`;
    const rounds = Math.floor(seconds / 6);
    const suffocate = Math.max(conMod, 1);

    const speech = `You can hold your breath for ${breath} or ${rounds} rounds. ` +
      `When you run out of breath, you have ${suffocate} rounds before you drop to 0 hit points.`;

    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }
}
