import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Races from '../data/races.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class RacesIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      RaceList: this.raceList,
      SubraceList: this.subraceList
    };
  }

  raceList(handlerInput: HandlerInput): Response {
    const races = (<any[]><any>Races).map(r => r.name).sort();
    return handlerInput.responseBuilder
      .speak('The races are: ' + Utils.spokenConcat(races))
      .getResponse();
  }

  subraceList(handlerInput: HandlerInput, intent: Intent): Response {
    const raceName = Utils.slotValue(intent.slots.race);
    const race = (<any[]><any>Races).find(r => r.name === raceName);
    const subraces = race.subraces.map(sr => sr.name).sort();
    return handlerInput.responseBuilder
      .speak(`The subraces of ${race.name} are: ` + Utils.spokenConcat(subraces))
      .getResponse();
  }
}
