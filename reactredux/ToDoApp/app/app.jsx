var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var ToDoApp = require('ToDoApp');

//Load Foundation
$(document).foundation();

//App css
require('style!css!sass-loader!applicationStyles');

ReactDOM.render(
	<ToDoApp />,
	document.getElementById('app')
);


