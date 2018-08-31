import * as Currencies from '../data/currencies.json';
import { Currency } from '../models';
import { spokenConcat } from './spoken-concat.func';

function convertToCopper(amount: Currency) {
  return (amount.platinum || 0) * Currencies['platinum'].copper +
    (amount.gold || 0) * Currencies['gold'].copper +
    (amount.electrum || 0) * Currencies['electrum'].copper +
    (amount.silver || 0) * Currencies['silver'].copper +
    (amount.copper || 0) * Currencies['copper'].copper;
}

export function convertCurrency(amount: Currency): Currency {
  const result: Currency = { copper: convertToCopper(amount) };
  const speechParts = [];
  const hoistCurrency = (cur) => {
    const rate = Currencies[cur].copper;
    if (result.copper >= rate) {
      result[cur] = Math.floor(result.copper / rate);
      speechParts.push(`${result[cur]} ${cur}`);
      if (cur !== 'copper') {
        result.copper -= result[cur] * rate;
      }
    }
  };
  hoistCurrency('platinum');
  hoistCurrency('gold');
  hoistCurrency('silver');
  hoistCurrency('copper');

  return result;
}

export function speakCurrency(amount: Currency): string {
  const speech = [];
  ['platinum', 'gold', 'electrum', 'silver', 'copper'].forEach(cur => {
    if (amount[cur] > 0) { speech.push(`${amount[cur]} ${cur}`); }
  });
  return spokenConcat(speech);
}
