import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Books from '../data/books.json';
import * as Classes from '../data/classes.json';
import * as Equipment from '../data/equipment.json';
import * as Backgrounds from '../data/feats.json';
import * as Feats from '../data/feats.json';
import * as Races from '../data/races.json';
import * as Spells from '../data/spells.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

function getSpeech(obj: any, name: string): string {
  if (obj.reference) {
    const book = Books[obj.reference.book] || obj.reference.book;
    let speech = `You can find the ${name} in ${book}`;
    if (obj.reference.page > 0) {
      speech += ` on page ${obj.reference.page}.`;
    } else {
      speech += `.`;
    }
    return speech;
  } else {
    return `I don't know where you can find the ${name}.`;
  }
}

export class ReferenceIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      ReferenceFindSpell: this.findSpell,
      ReferenceFindClass: this.findClass,
      ReferenceFindSubclass: this.findSubclass,
      ReferenceFindRace: this.findRace,
      ReferenceFindSubrace: this.findSubrace,
      ReferenceFindEquipment: this.findEquipment,
      ReferenceFindBackground: this.findBackground,
      ReferenceFindFeat: this.findFeat
    };
  }

  findSpell(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);
    const speech = getSpeech(spell, `${spell.name} spell`);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findClass(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.class);
    const c = (<any[]><any>Classes).find(cc => cc.name === name);
    const speech = getSpeech(c, `${c.name} class`);
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

    const name = `${sc.name} ${c.name} ${c.subclassNoun.singular}`;
    const speech = getSpeech(sc, name);

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(`${sc.name} ${c.name}`, speech)
      .getResponse();
  }

  findRace(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.race);
    const race = (<any[]><any>Races).find(r => r.name === name);
    const speech = getSpeech(race, `${race.name} race`);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findSubrace(handlerInput: HandlerInput, intent: Intent): Response {
    const subraceName = Utils.slotValue(intent.slots.subrace);
    let race, subrace;

    for (let x = 0; x < (<any[]><any>Races).length; x++) {
      race = Races[x];
      if (subrace = race.subraces.find(sr => sr.name === subraceName)) { break; }
    }

    const name = `${subrace.name} ${race.name}`;
    const speech = getSpeech(subrace, name);

    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findEquipment(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.equipment);
    const equipment = (<any[]><any>Equipment).find(r => r.name === name);
    const speech = getSpeech(equipment, `${equipment.name}`);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findBackground(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.background);
    const background = (<any[]><any>Backgrounds).find(b => b.name === name);
    const speech = getSpeech(background, `${background.name} background`);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }

  findFeat(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.feat);
    const feat = (<any[]><any>Feats).find(r => r.name === name);
    const speech = getSpeech(feat, `${feat.name} feat`);
    return handlerInput.responseBuilder
      .speak(speech)
      .withSimpleCard(name, speech)
      .getResponse();
  }
}
