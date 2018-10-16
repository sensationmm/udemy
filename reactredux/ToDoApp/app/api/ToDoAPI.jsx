var $ = require('jQuery');

module.exports = {
	setToDos: function(todos) {
		if($.isArray(todos)) {
			localStorage.setItem('todos', JSON.stringify(todos));
			return todos;
		}
	},
	getToDos: function() {
		var stringTodos = localStorage.getItem('todos');
		var todos = [];

		try {
			todos = JSON.parse(stringTodos);
		} catch (e) {

		}

		return $.isArray(todos) ? todos : [];
	},
	filterToDos: function(todos, showCompleted, searchText) {
		var filteredTodos = todos;

		//filter by showCompleted
		filteredTodos = filteredTodos.filter((todo) => {
			return !todo.completed || showCompleted;
		});

		//filter by searchText
		filteredTodos = filteredTodos.filter((todo) => {
			if(searchText === '') {
				return true;
			} else {
				var todoText = todo.text.toLowerCase();

				if(todoText.indexOf(searchText) > -1) {
					return true;
				} else {
					return false;
				}
			}
		});

		//sort todos with non-completed first
		filteredTodos.sort((a,b) => {
			if(!a.completed && b.completed) {
				return -1;
			} else if(a.completed && !b.completed) {
				return 1;
			} else {
				return 0;
			}
		});

		return filteredTodos;
	}
};