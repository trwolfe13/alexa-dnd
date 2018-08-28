import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentHandler } from '../framework';

export class HelpIntentHandler extends IntentHandler {
  get intentNames(): string[] { return ['HelpIntentHandler']; }

  handle(handlerInput: HandlerInput): Response {
    const speechText = 'You can say hello to me!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
}
