import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Spells from '../data/spells.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class SpellsIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      SpellMaterials: this.spellMaterials,
      SpellDescription: this.spellDescription,
      SpellConcentration: this.spellConcentration,
      SpellRitual: this.spellRitual,
      SpellTarget: this.spellTarget,
      SpellTime: this.spellTime,
      SpellSchool: this.spellSchool,
      SpellLevel: this.spellLevel,
      SpellDuration: this.spellDuration
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

  spellRitual(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    return handlerInput.responseBuilder
      .speak(spell.ritual ? 'Yes.' : 'No.')
      .getResponse();
  }

  spellDescription(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    return handlerInput.responseBuilder
      .speak(spell.description)
      .withSimpleCard(name, spell.description)
      .getResponse();
  }

  spellTarget(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    let speech = '';
    switch (spell.range.distance) {
      case 'touch': {
        speech = `The ${spell.name} spell is cast by touch.`;
        break;
      }
      case 'self': {
        if (spell.range.aoe) {
          const aoe = `${spell.range.aoe.size} ${spell.range.aoe.type}`;
          speech = `The ${spell.name} spell is cast in a ${aoe} originating from the caster.`;
        } else {
          speech = `The ${spell.name} spell targets the caster.`;
        }
        break;
      }
      default: {
        if (spell.range.aoe) {
          const aoe = `${spell.range.aoe.size} ${spell.range.aoe.type}`;
          speech = `The ${spell.name} spell is cast in a ${aoe} within ${spell.range.distance} of the caster.`;
        } else {
          speech = `The ${spell.name} spell is cast on a single target within ${spell.range.distance} of the caster.`;
        }
        break;
      }
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }

  spellTime(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    let speech = spell.casting.time;
    if (spell.casting.condition) {
      speech += `, ${spell.casting.condition}`;
    }
    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }

  spellSchool(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    return handlerInput.responseBuilder
      .speak(spell.school)
      .getResponse();
  }

  spellLevel(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    return handlerInput.responseBuilder
      .speak(`${name} is level ${spell.level}.`)
      .getResponse();
  }

  spellDuration(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.spell);
    const spell = (<any[]><any>Spells).find(s => s.name === name);

    return handlerInput.responseBuilder
      .speak(spell.duration)
      .getResponse();
  }
}
