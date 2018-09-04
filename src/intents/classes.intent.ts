import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Classes from '../data/classes.json';
import { IntentHandler, IntentMap } from '../framework';
import * as Utils from '../utils';

export class ClassesIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      ClassList: this.classList,
      SubclassList: this.subclassList
    };
  }

  classList(handlerInput: HandlerInput): Response {
    const classes = (<any[]><any>Classes).map(c => c.name).sort();
    return handlerInput.responseBuilder
      .speak('The classes are: ' + Utils.spokenConcat(classes))
      .getResponse();
  }

  subclassList(handlerInput: HandlerInput, intent: Intent): Response {
    const className = Utils.slotValue(intent.slots.class);
    const cc = (<any[]><any>Classes).find(c => c.name === className);
    const subclasses = cc.subclasses.map(sc => sc.name).sort();
    return handlerInput.responseBuilder
      .speak(`The ${cc.name} ${cc.subclassNoun.plural} are: ` + Utils.spokenConcat(subclasses))
      .getResponse();
  }
}
