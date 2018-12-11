export const getLetterMatchCount = (guessedWord, secretWord) => {
  const secretLetterSet = new Set(secretWord.split(''));
  const guesssedLetterSet = new Set(guessedWord.split(''));

  return [...secretLetterSet].filter(letter => guesssedLetterSet.has(letter)).length;
}
