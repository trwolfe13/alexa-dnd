export function invertPronoun(pronoun: string): string {
  const lPronoun = pronoun.toLowerCase().trim();
  if (lPronoun === 'i') {
    return 'you';
  } else if (lPronoun === 'you') {
    return 'i';
  }

  if (lPronoun.startsWith('my ')) {
    return lPronoun.replace('my ', 'your ');
  }

  return lPronoun;
}
