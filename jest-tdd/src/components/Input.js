import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from '../actions/guessedWords';

export class UnconnectedInput extends Component {
  constructor(props) {
    super(props);

    this.inputBox = React.createRef();
  }

  submitGuessedWord = (evt) => {
    evt.preventDefault();

    const guessedWord = this.inputBox.current.value;

    if(guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.inputBox.current.value = '';
    }
  }

  render() {
    const { success } = this.props;

    return (
      <div data-test="component-input">
        {!success && 
          <form>
          <input 
            data-test="input-box" 
            id="word-guess" 
            ref={this.inputBox}
            placeholder="Enter guess" 
          />
          <input 
            data-test="submit-button" 
            type="submit" 
            onClick={(e) => this.submitGuessedWord(e)} 
          />
          </form>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  success: state.success
});

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
