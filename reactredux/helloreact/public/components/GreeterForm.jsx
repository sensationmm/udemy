var React = require('react');

var GreeterForm = React.createClass({
	onFormSubmit: function (e){
		e.preventDefault();

		var updates = {};

		var name = this.refs.name.value;
		var message = this.refs.message.value;

		if(name.length > 0) {
			this.refs.name.value = '';
			updates.name = name;
		}

		if(message.length > 0) {
			this.refs.message.value = '';
			updates.message = message;
		}

		this.props.onUpdate(updates);
	},
	render: function() {
		return (
			<div>
				<form onSubmit={this.onFormSubmit}>
				<div><input type="text" ref="name" placeholder="Enter name" /></div>
				<div><textarea ref="message" placeholder="Enter message"></textarea></div>
				<div><button>Update</button></div>
				</form>
			</div>
		);
	}
});

module.exports = GreeterForm;