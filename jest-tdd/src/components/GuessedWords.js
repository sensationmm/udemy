import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
	return (
		<div data-test="component-guessed-words">
      {props.guessedWords.length === 0 &&
        <div data-test="guess-instructions">
          Try to guess the secret word
        </div>
      }

      {props.guessedWords.length > 0 &&
        <div data-test="guessed-words">
        Guessed Words
        <table>
        <tr>
        <th>Word</th>
        <th>Letter count</th>
        </tr>
        {
          props.guessedWords.map((item, count) => {
            return (
              <tr data-test="guessed-word" key={`guessed-word-${count}`}>
              <td>{item.guessedWord}</td>
              <td>{item.letterMatchCount}</td>
              </tr>
            )
          })
        } 
        </table>
        </div>
      }
    </div>
	);
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWords: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    }).isRequired
  )
}

GuessedWords.defaultProps = {
  guessedWords: []
}

export default GuessedWords;
