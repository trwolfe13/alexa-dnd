import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentHandler } from '../framework';

export class ReferenceIntentHandler extends IntentHandler {
  get intentNames(): string[] { return ['ReferenceIntentHandler']; }

  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Hello World!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
}
