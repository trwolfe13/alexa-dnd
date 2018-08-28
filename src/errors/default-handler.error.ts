import { ErrorHandler, HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export const DefaultErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput): boolean { return true; },
  handle(handlerInput: HandlerInput, error): Response {
    console.log(`Error handled: ${error.message}`);
    const speechText = 'Sorry, I didn\'t understand the command. Please try again.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};