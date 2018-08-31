import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Spells from '../data/spells.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class ReferenceIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      ReferenceFindSpellIntent: this.findSpell,
    };
  }

  findSpell(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    let speech = `I don't know where you can find ${name}.`;
    if (spell.reference) {
      speech = `You can find the ${name} spell in the ${spell.reference.book} on page ${spell.reference.page}`;
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }
}
