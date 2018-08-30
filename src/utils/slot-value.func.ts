import { Slot, slu } from 'ask-sdk-model';

function slot(s: Slot): slu.entityresolution.Value {
  const res = s.resolutions.resolutionsPerAuthority;
  if (res.length < 1) { return undefined; }
  if (res[0].values.length < 1) { return undefined; }
  return s.resolutions.resolutionsPerAuthority[0].values[0].value;
}

export function slotValue(s: Slot): string {
  const obj = slot(s);
  return obj ? obj.name : undefined;
}

export function slotId(s: Slot): string {
  const obj = slot(s);
  return obj ? obj.id : undefined;
}
