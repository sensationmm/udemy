var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var ToDoApp = require('ToDoApp');

describe('To Do App', () => {
	it('should exist', () => {
		expect(ToDoApp).toExist();
	});

	it('should add ToDo to the todos state on handle add to to', () => {
		var todoText = 'test text';
		var todoApp = TestUtils.renderIntoDocument(<ToDoApp />);

		todoApp.setState({todos: []});
		todoApp.handleAddToDo(todoText);

		expect(todoApp.state.todos[0].text).toBe(todoText);
		expect(todoApp.state.todos[0].createdAt).toBeA('number');
	});

	it('should toggle completed value when handleToggle called', () => {
		var todoData = {
			id: 11,
			text: 'Test features',
			completed: false, 
			createdAt: 0,
			completedAt: undefined
		};

		var todoApp = TestUtils.renderIntoDocument(<ToDoApp />);
		todoApp.setState({todos:[todoData]});

		expect(todoApp.state.todos[0].completed).toBe(false);
		todoApp.handleToggle(todoApp.state.todos[0].id);
		expect(todoApp.state.todos[0].completed).toBe(true);
		expect(todoApp.state.todos[0].completedAt).toBeA('number');
	});

	it('should set to uncompleted when handleToggle called on a completed todo', () => {
		var todoData = {
			id: 11,
			text: 'Test features',
			completed: true, 
			createdAt: 0,
			completedAt: 123
		};

		var todoApp = TestUtils.renderIntoDocument(<ToDoApp />);
		todoApp.setState({todos:[todoData]});

		expect(todoApp.state.todos[0].completed).toBe(true);
		todoApp.handleToggle(todoApp.state.todos[0].id);
		expect(todoApp.state.todos[0].completed).toBe(false);
		expect(todoApp.state.todos[0].completedAt).toNotExist();
	});

});