import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Equipment from '../data/equipment.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class EquipmentIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      EquipmentDescription: this.equipmentDescription
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
}
