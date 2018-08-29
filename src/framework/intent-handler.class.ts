import { HandlerInput } from 'ask-sdk-core';
import { IntentRequest, Response } from 'ask-sdk-model';

import { IntentMap } from './intent-map.interface';

export abstract class IntentHandler {
  abstract get intents(): IntentMap;

  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && Object.keys(this.intents).includes(handlerInput.requestEnvelope.request.intent.name);
  }

  handle(handlerInput: HandlerInput): Response {
    const intent = (<IntentRequest>handlerInput.requestEnvelope.request).intent;
    return this.intents[intent.name](handlerInput, intent);
  }
}
