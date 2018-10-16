var React = require('react');
var ReactDOM = require('react-dom');
var Greeter = require('Greeter');


var firstName = 'Kevin';
var messageString = 'This is from a component!';

ReactDOM.render(
	<Greeter name={firstName} />,
	document.getElementById('app')
);


