import { HandlerInput } from 'ask-sdk-core';
import { IntentRequest, Response } from 'ask-sdk-model';

import * as Conditions from '../data/conditions.json';
import { IntentHandler } from '../framework';

export class ConditionIntentHandler extends IntentHandler {
  get intentNames(): string[] { return ['ConditionIntent']; }

  handle(handlerInput: HandlerInput): Response {
    const intent = (<IntentRequest>handlerInput.requestEnvelope.request).intent;

    const conditionSlot = intent.slots.Condition;
    let condition;
    if (conditionSlot && conditionSlot.value) {
      condition = conditionSlot.value.toLowerCase();
    }

    if (!Conditions[condition]) {
      return handlerInput.responseBuilder
        .speak('Sorry, I don\'t know what that condition means.')
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(Conditions[condition])
      .withSimpleCard(condition, Conditions[condition])
      .getResponse();
  }
}
