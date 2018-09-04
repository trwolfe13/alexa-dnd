import * as Alexa from 'ask-sdk';

import * as Errors from './errors';
import * as Intents from './intents';
import * as Requests from './requests';

export const handler =
  Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(
      new Requests.LaunchRequestHandler(),
      new Intents.CharacterAbilitiesIntentHandler(),
      new Intents.ClassesIntentHandler(),
      new Intents.ConditionIntentHandler(),
      new Intents.CurrencyIntentHandler(),
      new Intents.LevelIntentHandler(),
      new Intents.MagicItemsIntentHandler(),
      new Intents.MagicSchoolsIntentHandler(),
      new Intents.RacesIntentHandler(),
      new Intents.ReferenceIntentHandler(),
      new Intents.SpellsIntentHandler(),
      new Intents.WildMagicIntentHandler(),
      new Requests.SessionEndedRequestHandler()
    )
    .addErrorHandlers(
      Errors.DefaultErrorHandler
    )
    .lambda();
