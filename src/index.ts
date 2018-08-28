import * as Alexa from 'ask-sdk';

import * as Errors from './errors';
import * as Intents from './intents';
import * as Requests from './requests';

export const handler =
  Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(
      Requests.LaunchRequestHandler,
      Intents.HelloWorldIntentHandler,
      Intents.HelpIntentHandler,
      Intents.CancelAndStopIntentHandler,
      Requests.SessionEndedRequestHandler
    )
    .addErrorHandlers(
      Errors.DefaultErrorHandler
    )
    .lambda();