import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export abstract class RequestHandler {
  abstract get requestType(): string;

  canHandle(handlerInput: HandlerInput): boolean {
    return handlerInput.requestEnvelope.request.type === this.requestType;
  }

  abstract handle(handlerInput: HandlerInput): Response;
}
