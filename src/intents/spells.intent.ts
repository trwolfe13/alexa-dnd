import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Spells from '../data/spells.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class SpellsIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      SpellMaterialsIntent: this.spellMaterials,
      SpellConcentrationIntent: this.spellConcentration,
    };
  }

  spellMaterials(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    let speech = `You don\'t need materials to cast ${name}.`;
    if (spell.components.material) {
      speech = `To cast ${name}, you need ${spell.components.material}.`;
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  spellConcentration(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    return handlerInput.responseBuilder
    .speak(spell.concentration ? 'Yes.' : 'No.')
    .getResponse();
  }
}
