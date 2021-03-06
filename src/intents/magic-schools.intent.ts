import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as MagicSchools from '../data/magic-schools.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class MagicSchoolsIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      MagicSchoolsList: this.magicSchoolsList,
      MagicSchool: this.magicSchool,
    };
  }

  magicSchoolsList(handlerInput: HandlerInput): Response {
    const schools = Object.keys(MagicSchools).sort();
    return handlerInput.responseBuilder
      .speak('The schools of magic are: ' + Utils.spokenConcat(schools))
      .getResponse();
  }

  magicSchool(handlerInput: HandlerInput, intent: Intent): Response {
    const school = Utils.slotValue(intent.slots.school);
    if (!MagicSchools[school.toLowerCase()]) {
      return handlerInput.responseBuilder
        .speak('Sorry, I don\'t know about that school of magic.')
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(MagicSchools[school.toLowerCase()])
      .withSimpleCard(school, MagicSchools[school.toLowerCase()])
      .getResponse();
  }
}
