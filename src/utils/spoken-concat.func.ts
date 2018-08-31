export function spokenConcat(items: string[]): string {
  let list = '';
  if (items.length === 1) { return items[0]; }
  if (items.length === 2) { return `${items[0]} and ${items[1]}`; }
  for (let x = 0; x < items.length; x++) {
    const item = items[x];
    if (x === 0) {
      list += item;
    } else if (x < item.length - 1) {
      list += ', ' + item;
    } else if (x === item.length - 1) {
      list += ' and ' + item;
    }
  }
  return list;
}
