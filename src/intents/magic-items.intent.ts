import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';
import * as Utils from '../utils';
import * as Items from '../data/magic-items.json';

import { IntentHandler, IntentMap } from '../framework';

export class MagicItemsIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      MagicItemAttunement: this.itemAttunement,
      MagicItemRarity: this.itemRarity,
      MagicItemDescription: this.itemDescription
    };
  }

  itemAttunement(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.item);
    const item = (<any[]><any>Items).find(i => i.name === name);

    return handlerInput.responseBuilder
      .speak(item.attuned ? 'Yes.' : 'No.')
      .getResponse();
  }

  itemRarity(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.item);
    const item = (<any[]><any>Items).find(i => i.name === name);

    return handlerInput.responseBuilder
      .speak(item.rarity)
      .getResponse();
  }

  itemDescription(handlerInput: HandlerInput, intent: Intent): Response {
    const name = Utils.slotValue(intent.slots.item);
    const item = (<any[]><any>Items).find(i => i.name === name);

    return handlerInput.responseBuilder
      .speak(item.description)
      .withSimpleCard(name, item.description)
      .getResponse();
  }
}
