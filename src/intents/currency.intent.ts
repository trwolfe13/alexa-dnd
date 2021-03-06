import { HandlerInput } from 'ask-sdk-core';
import { Intent, Response } from 'ask-sdk-model';

import * as Currencies from '../data/currencies.json';
import { IntentHandler, IntentMap } from '../framework';
import { Currency } from '../models';
import * as Utils from '../utils';

export class CurrencyIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      CurrencyConversion: this.currencyConversion,
    };
  }

  currencyConversion(handlerInput: HandlerInput, intent: Intent): Response {
    const value = Number(Utils.slotValue(intent.slots.value));
    const from = Utils.slotValue(intent.slots.from);
    const to = Utils.slotValue(intent.slots.to);

    let speech = '';
    if (to) {
      const exchangeRate = Currencies[from][to];
      speech = `${value * exchangeRate} ${to} pieces`;
    } else {
      const amount: Currency = { [from]: value };
      const result = Utils.convertCurrency(amount);
      speech = Utils.speakCurrency(result);
    }

    return handlerInput.responseBuilder
      .speak(speech)
      .getResponse();
  }
}
