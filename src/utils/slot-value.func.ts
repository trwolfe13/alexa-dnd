import { Slot } from 'ask-sdk-model';

export function slotValue(slot: Slot): string {
  const res = slot.resolutions.resolutionsPerAuthority;
  if (res.length < 1) { return undefined; }
  if (res[0].values.length < 1) { return undefined; }
  return slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
}
