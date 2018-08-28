import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export abstract class IntentHandler {
  abstract get intentNames(): string[];

  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && this.intentNames.includes(handlerInput.requestEnvelope.request.intent.name);
  }

  abstract handle(handlerInput: HandlerInput): Response;
}
