import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Spells from '../data/spells.json';
import * as Classes from '../data/classes.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

function getSpeech(noun: string, obj: any): string {
  if (obj.reference) {
    return `You can find the ${noun} ${obj.name} in the ${obj.reference.book} on page ${obj.reference.page}`;
  } else {
    return `I don't know where you can find the ${noun} ${obj.name}.`;
  }
}

export class ReferenceIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      ReferenceFindSpellIntent: this.findSpell,
      ReferenceFindClassIntent: this.findClass,
      ReferenceFindSubclassIntent: this.findSubclass,
    };
  }

  findSpell(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);
    const speech = getSpeech('spell', spell);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findClass(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.class);
    const c = (<any[]><any>Classes).find(cc => c.name === name);
    const speech = getSpeech('class', c);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findSubclass(handlerInput: HandlerInput, intent: Intent): Response {
    const className = Utils.slotValue(intent.slots.class);
    const subclassName = Utils.slotValue(intent.slots.subclass);

    const c = (<any[]><any>Classes).find(cc => cc.name === className);
    const sc = c.subclasses.find(scc => scc.name === subclassName);
    const speech = `You can find the ${sc.name} ${c.name} ${c.subclassNoun} in the ${sc.reference.book} on page ${sc.reference.page}`;

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(`${sc.name} ${c.name}`, speech)
      .getResponse();
  }
}
