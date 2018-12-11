import React from 'react';
import '../styles/css/error.css';

/*
 * Error
 *
 * Renders a simple error message
 *
 * @author Kevin Reynolds <kevin@sensationmultimedia.co.uk>
 *
 * @param {string} message - message to display
*/

const Error = (props) => {
	return (
		<div className="error">
			{props.message}
		</div>
	);
};

export default Error;
