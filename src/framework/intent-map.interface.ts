import { HandlerInput } from 'ask-sdk';
import { Intent, Response } from 'ask-sdk-model';

export interface IntentMap {
  [intent: string]: (handlerInput: HandlerInput, intent: Intent) => Response;
}
