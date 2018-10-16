var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

var ToDoList = require('ToDoList');
var AddToDo = require('AddToDo');
var ToDoSearch = require('ToDoSearch');
var ToDoAPI = require('ToDoAPI');

var ToDoApp = React.createClass({
	getInitialState: function() {
		return {
			showCompleted: false,
			searchText: '',
			todos: ToDoAPI.getToDos()
		};
	},
	componentDidUpdate: function(prevProps, prevState) {
		ToDoAPI.setToDos(this.state.todos);
	},
	handleAddToDo: function(text) {
		this.setState({
			todos: [
				...this.state.todos,
				{
					id: uuid(),
					text: text,
					completed: false,
					createdAt: moment().unix(),
					completedAt: undefined
				}
			]
		});
	},
	handleToggle: function(id) {
		var updatedTodos = this.state.todos.map((todo) => {
			if(todo.id === id) {
				todo.completed = !todo.completed;
				todo.completedAt = todo.completed ? moment().unix() : undefined;
			}
			return todo;
		});

		this.setState({
			todos: updatedTodos
		});
	},
	handleSearch: function(showCompleted, searchText) {
		this.setState({
			showCompleted: showCompleted,
			searchText: searchText.toLowerCase()
		});
	},
	render: function() {
		var {todos, showCompleted, searchText} = this.state;
		var fiteredToDos = ToDoAPI.filterToDos(todos, showCompleted, searchText);

		return (
			<div>
				<h1 className="page-title">To-Do App</h1>
				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="container">
							<ToDoSearch onSearch={this.handleSearch} />
							<ToDoList todos={fiteredToDos} onToggle={this.handleToggle} />
							<AddToDo onAddToDo={this.handleAddToDo} />
						</div>
					</div>
				</div>
			</div>
		)
	}

});




module.exports = ToDoApp;