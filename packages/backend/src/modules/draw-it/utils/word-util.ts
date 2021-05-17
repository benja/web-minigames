export default class WordUtil {
  public static pickRandomWord(words: string[]): string {
    return words[Math.floor(Math.random() * words.length)];
  }

  public static pickCollection(words: string[], set: number = 3): string[] {
    const subset: string[] = [];
    while (subset.length < set) {
      const newWord = WordUtil.pickRandomWord(words);
      if (!subset.includes(newWord)) {
        subset.push(newWord);
      }
    }
    return subset;
  }

  public static pickUnusedSubSet(words: string[], set: number = 3, subSet: string[]): string[] {
    const subset: string[] = [];
    while (subset.length < set) {
      const newWord = WordUtil.pickRandomWord(words);
      if (!subset.includes(newWord) && !subSet.includes(newWord)) {
        subset.push(newWord);
      }
    }
    return subset;
  }
}
