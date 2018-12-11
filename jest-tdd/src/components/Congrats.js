import React from 'react';
import PropTypes from 'prop-types';

const Congrats = (props) => {
	return (
		<div data-test="component-congrats">
      { props.success &&
        <div data-test="congrats-message">
          Congratulations! You guessed the word!
        </div>
      }
    </div>
	);
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
}

Congrats.defaultProps = {
  success: false
}

export default Congrats;
