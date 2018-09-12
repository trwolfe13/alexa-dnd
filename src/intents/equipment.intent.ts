import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Equipment from '../data/equipment.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class EquipmentIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      EquipmentDescription: this.equipmentDescription,
      EquipmentCost: this.equipmentCost,
      EquipmentWeight: this.equipmentWeight
    };
  }

  equipmentDescription(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.equipment);
    const equipment = (<any[]><any>Equipment).find(s => s.name === name);
    return handlerInput.responseBuilder
      .speak(equipment.description)
      .withSimpleCard(name, equipment.description)
      .getResponse();
  }

  equipmentCost(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.equipment);
    const equipment = (<any[]><any>Equipment).find(s => s.name === name);

    if (!equipment.cost || equipment.cost === '--') {
      const speech = `I don't know how much ${name} costs.`;
      return handlerInput.responseBuilder.speak(speech).getResponse();
    }

    const cost = Utils.parseCurrency(equipment.cost);
    return handlerInput.responseBuilder
      .speak(Utils.speakCurrency(cost))
      .getResponse();
  }

  equipmentWeight(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.equipment);
    const equipment = (<any[]><any>Equipment).find(s => s.name === name);

    if (!equipment.weight || equipment.weight === '--') {
      const speech = `I don't know how much ${name} weighs.`;
      return handlerInput.responseBuilder.speak(speech).getResponse();
    }

    return handlerInput.responseBuilder
      .speak(equipment.weight)
      .getResponse();
  }
}
