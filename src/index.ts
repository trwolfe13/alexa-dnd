import * as Alexa from 'ask-sdk';

import * as Errors from './errors';
import * as Intents from './intents';
import * as Requests from './requests';

export const handler =
  Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(
      new Requests.LaunchRequestHandler(),
      new Intents.HelloWorldIntentHandler(),
      new Intents.HelpIntentHandler(),
      new Intents.CancelAndStopIntentHandler(),
      new Intents.ReferenceIntentHandler(),
      new Requests.SessionEndedRequestHandler()
    )
    .addErrorHandlers(
      Errors.DefaultErrorHandler
    )
    .lambda();
