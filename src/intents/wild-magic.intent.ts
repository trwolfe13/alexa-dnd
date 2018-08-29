import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import * as Random from 'random-js';

import * as WildMagic from '../data/wild-magic.json';
import { IntentHandler, IntentMap } from '../framework';

export class WildMagicIntentHandler extends IntentHandler {
  get intents(): IntentMap {
    return {
      WildMagicIntent: this.wildMagic,
    };
  }

  wildMagic(handlerInput: HandlerInput): Response {
    const random = new Random(Random.engines.mt19937().autoSeed());
    const number = random.integer(1, 100);

    const effect = (<any[]><any>WildMagic).find(e => number >= e.lower && number <= e.upper);

    return handlerInput.responseBuilder
      .speak(effect.description)
      .withSimpleCard('Wild Magic Surge!', effect.description)
      .getResponse();
  }
}
