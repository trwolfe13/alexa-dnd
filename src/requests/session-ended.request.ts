import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { RequestHandler } from '../framework';

export class SessionEndedRequestHandler extends RequestHandler {
  get requestType(): string { return 'SessionEndedRequest'; }

  handle(handlerInput: HandlerInput): Response {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
  }
}
