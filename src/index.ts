import * as Alexa from 'ask-sdk';

import * as Errors from './errors';
import * as Intents from './intents';
import * as Requests from './requests';

export const handler =
  Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(
      new Requests.LaunchRequestHandler(),
      new Intents.HelpIntentHandler(),
      new Intents.CancelAndStopIntentHandler(),
      new Intents.CharacterAbilitiesIntentHandler(),
      new Intents.ClassesIntentHandler(),
      new Intents.ConditionIntentHandler(),
      new Intents.CurrencyIntentHandler(),
      new Intents.LevelIntentHandler(),
      new Intents.MagicSchoolsIntentHandler(),
      new Intents.ReferenceIntentHandler(),
      new Intents.SpellsIntentHandler(),
      new Intents.WildMagicIntentHandler(),
      new Requests.SessionEndedRequestHandler()
    )
    .addErrorHandlers(
      Errors.DefaultErrorHandler
    )
    .lambda();
