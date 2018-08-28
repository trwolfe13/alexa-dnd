import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

import { RequestHandler } from '../framework';

export class LaunchRequestHandler extends RequestHandler {
  get requestType(): string { return 'LaunchRequest'; }

  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
}
