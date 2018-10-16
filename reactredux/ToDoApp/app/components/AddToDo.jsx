var React = require('react');

var AddToDo = React.createClass({
	onSubmit: function(e) {
		e.preventDefault();

		var newItem = this.refs.item.value;

		if(newItem.length > 0) {
			this.refs.item.value = '';
			this.props.onAddToDo(newItem);
		} else {
			this.refs.item.focus();
		}
	},
	render: function() {

		return (
			<div className="container__footer">
				<form ref="form" onSubmit={this.onSubmit}>
				<input type="text" ref="item" placeholder="What do you need to do?" />
				<button className="button expanded">Add</button>
				</form>
			</div>
		)
	}

});

module.exports = AddToDo;