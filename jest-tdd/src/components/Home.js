import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from './Input';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';

import { getSecretWord } from '../actions/secretWord';

export class UnconnectedHome extends Component {

  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
  	return (
  		<div data-test="component-home">
        <h1>Jotto</h1>
        <p>SECRET WORD: {this.props.secretWord}</p>

        <Congrats success={this.props.success} />

        <Input />

        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
  	);
  }
};

UnconnectedHome.propTypes = {
  success: PropTypes.bool.isRequired,
  guessedWords: PropTypes.array.isRequired,
  secretWord: PropTypes.string,
  getSecretWord: PropTypes.func
};

const mapStateToProps = (state) => ({
  success: state.success,
  guessedWords: state.guessedWords,
  secretWord: state.secretWord
});

export default connect(mapStateToProps, { getSecretWord })(UnconnectedHome);
