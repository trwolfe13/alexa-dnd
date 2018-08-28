import { HandlerInput } from 'ask-sdk-core';
import { Response, IntentRequest } from 'ask-sdk-model';

import { IntentHandler } from '../framework';

export class ReferenceIntentHandler extends IntentHandler {
  get intentNames(): string[] { return ['ReferenceIntent']; }

  handle(handlerInput: HandlerInput): Response {
    const intent = (<IntentRequest>handlerInput.requestEnvelope.request).intent;

    const itemSlot = intent.slots.Item;
    let item;
    if (itemSlot && itemSlot.value) {
      item = itemSlot.value.toLowerCase();
    }

    const book = 'player handbook';
    const page = '206';

    const speechText = `The ${item} is in the ${book} on page ${page}.`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
}
