import React, { Component } from 'react';

class Counter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  render() {
  	return (
  		<div data-test="component-counter">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        <button 
          data-test="increment-button"
          onClick={() => this.setState({counter: this.state.counter+1})}
        >Increment counter</button>
  		</div>
  	);
  }
};

export default Counter;
