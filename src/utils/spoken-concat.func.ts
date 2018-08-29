export function spokenConcat(items: string[]): string {
  let list = '';
  for (let x = 0; x < items.length; x++) {
    const item = items[x];
    if (x === 0) {
      list += item;
    } else if (x < item.length - 1) {
      list += ', ' + item;
    } else if (x === item.length - 1) {
      list += ' and ' + item + '.';
    }
  }
  return list;
}
