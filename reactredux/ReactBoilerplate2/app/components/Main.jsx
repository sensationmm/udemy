var React = require('react');

// var Main = React.createClass({
// 	render: function() {
// 		return (
// 			<div>
// 				<Nav />
// 				<h2>Main Component</h2>
// 				{this.props.children}
// 			</div> 
// 		);
// 	}
// });

var Main = (props) => {
	return (
		<div>
			<div>
				<p>Main.jsx rendered</p>
				{props.children}
			</div>
		</div> 
	)
};

module.exports = Main;