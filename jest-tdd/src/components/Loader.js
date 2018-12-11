import React from 'react';
import '../styles/css/loader.css';

const Loader = (props) => {
	return (
		<div className="loader">
			<div className="lds-ripple">
				<div />
				<div />
			</div>
		</div>
	);
};

export default Loader;
