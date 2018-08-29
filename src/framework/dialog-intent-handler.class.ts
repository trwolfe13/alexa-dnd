import { HandlerInput } from 'ask-sdk-core';
import { Intent, IntentRequest, Response } from 'ask-sdk-model';
import { IntentHandler } from 'framework';

export abstract class DialogIntentHandler extends IntentHandler {
  handle(handlerInput: HandlerInput): Response {
    const request = (<IntentRequest>handlerInput.requestEnvelope.request);
    if (request.dialogState !== 'COMPLETED') {
      return this.inProgress(handlerInput, request.intent);
    }
    return this.intents[request.intent.name](handlerInput, request.intent);
  }

  inProgress(handlerInput: HandlerInput, intent: Intent): Response {
    return handlerInput.responseBuilder
      .addDelegateDirective(intent)
      .getResponse();
  }
}
