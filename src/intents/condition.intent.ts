import { HandlerInput } from 'ask-sdk-core';
import { Intent, IntentRequest, Response } from 'ask-sdk-model';

import * as Utils from '../utils';
import { IntentHandler, IntentMap } from '../framework';
import * as Conditions from '../data/conditions.json';
import * as Exhaustion from '../data/exhaustion.json';

export class ConditionIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      ConditionIntent: this.conditionDetail,
      ConditionListIntent: this.conditionList,
      ConditionExhaustionIntent: this.exhaustion,
      ConditionExhaustionLevelIntent: this.exhaustionLevel
    };
  }

  conditionList(handlerInput: HandlerInput): Response {
    const conditions = Object.keys(Conditions).sort();
    return handlerInput.responseBuilder
      .speak('The conditions are: ' + Utils.spokenConcat(conditions))
      .getResponse();
  }

  conditionDetail(handlerInput: HandlerInput, intent: Intent): Response {
    const conditionSlot = intent.slots.Condition;
    const condition = conditionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.name;

    if (!Conditions[condition.toLowerCase()]) {
      return handlerInput.responseBuilder
        .speak('Sorry, I don\'t know what that condition means.')
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(Conditions[condition.toLowerCase()])
      .withSimpleCard(condition, Conditions[condition.toLowerCase()])
      .getResponse();
  }

  exhaustion(handlerInput: HandlerInput): Response {
    let speech = 'The levels of exhaustion are:';
    const levels = <any[]><any>Exhaustion;
    levels.forEach(level => {
      speech += ` Level ${level.level}: ${level.effect}.`;
    });

    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }

  exhaustionLevel(handlerInput: HandlerInput, intent: Intent): Response {
    const positionSlot = intent.slots.Position;
    let position, positionName;
    if (positionSlot && positionSlot.value) {
      positionName = positionSlot.value.toLowerCase();
      position = Number(positionSlot.resolutions.resolutionsPerAuthority[0].values[0].value.id);
    }

    const levels = <any[]><any>Exhaustion;
    const level = levels.find(l => l.level === position);

    if (!level) {
      return handlerInput.responseBuilder
        .speak('I could find that level of exhaustion.')
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(`The ${positionName} level of exhaustion is ${level.effect}.`)
      .getResponse();
  }
}
