import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { IntentHandler, IntentMap } from '../framework';

export class CancelAndStopIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      'AMAZON.CancelIntent': this.cancel,
      'AMAZON.StopIntent': this.cancel,
    };
  }

  cancel(handlerInput: HandlerInput): Response {
    const speechText = 'Goodbye!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
}
