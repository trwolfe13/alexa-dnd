import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Books from '../data/books.json';
import * as Classes from '../data/classes.json';
import * as Races from '../data/races.json';
import * as Spells from '../data/spells.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

function getSpeech(noun: string, obj: any): string {
  if (obj.reference) {
    const book = Books[obj.reference.book];
    let speech = `You can find the ${noun} ${obj.name} in ${book}`;
    if (obj.reference.page) {
      speech += ` on page ${obj.reference.page}.`;
    } else {
      speech += `.`;
    }
    return speech;
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
      ReferenceFindRaceIntent: this.findRace,
      ReferenceFindSubraceIntent: this.findSubrace,
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
    const c = (<any[]><any>Classes).find(cc => cc.name === name);
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
    const book = Books[sc.reference.book];
    let speech = `You can find the ${sc.name} ${c.name} ${c.subclassNoun.singular} in ${book}`;
    if (sc.reference.page) {
      speech += ` on page ${sc.reference.page}`;
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(`${sc.name} ${c.name}`, speech)
      .getResponse();
  }

  findRace(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.race);
    const race = (<any[]><any>Races).find(r => r.name === name);
    const speech = getSpeech('race', race);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findSubrace(handlerInput: HandlerInput, intent: Intent): Response {
    const raceName = Utils.slotValue(intent.slots.race);
    const subraceName = Utils.slotValue(intent.slots.subrace);

    const race = (<any[]><any>Races).find(r => r.name === raceName);
    const subrace = race.subraces.find(sr => sr.name === subraceName);
    const speech = getSpeech('subrace', subrace);

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(subrace.name, speech)
      .getResponse();
  }

}
