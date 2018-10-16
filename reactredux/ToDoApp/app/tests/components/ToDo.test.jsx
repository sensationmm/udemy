var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var ToDo = require('ToDo');

describe('To Do', () => {
	it('should exist', () => {
		expect(ToDo).toExist();
	});

	it('should call onToggle prop with id when clicked', () => {
		var todoData = {
			id: 199,
			text: 'Write toDo.test.jsx test',
			completed: true
		};

		var spy = expect.createSpy();
		var toDo = TestUtils.renderIntoDocument(<ToDo {...todoData} onToggle={spy} />);
		var $el = $(ReactDOM.findDOMNode(toDo));

		TestUtils.Simulate.click($el[0]);

		expect(spy).toHaveBeenCalledWith(todoData.id);
	});
});