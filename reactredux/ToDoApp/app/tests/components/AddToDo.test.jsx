var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddToDo = require('AddToDo');

describe('Add To Do', () => {
	it('should exist', () => {
		expect(AddToDo).toExist();
	});

	it('should call onAddToDo if text is entered', () => {
		var toDoText = 'new item';
		var spy = expect.createSpy();
		var addToDoForm = TestUtils.renderIntoDocument(<AddToDo onAddToDo={spy} />);
		var $el = $(ReactDOM.findDOMNode(addToDoForm));

		addToDoForm.refs.item.value = toDoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(toDoText);
	});

	it('should not call onAddToDo if no text is entered', () => {
		var spy = expect.createSpy();
		var addToDoForm = TestUtils.renderIntoDocument(<AddToDo onAddToDo={spy} />);
		var $el = $(ReactDOM.findDOMNode(addToDoForm));

		addToDoForm.refs.item.value = '';
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});
});