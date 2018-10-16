var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var ToDoSearch = require('ToDoSearch');

describe('To Do Search', () => {
	it('should exist', () => {
		expect(ToDoSearch).toExist();
	});

	it('should call onSearch with entered input text', () => {
		var searchText = 'new item';
		var spy = expect.createSpy();
		var toDoSearch = TestUtils.renderIntoDocument(<ToDoSearch onSearch={spy} />);
		var $el = $(ReactDOM.findDOMNode(toDoSearch));

		toDoSearch.refs.searchText.value = searchText;
		TestUtils.Simulate.change(toDoSearch.refs.searchText);

		expect(spy).toHaveBeenCalledWith(false, searchText);
	});

	it('should call onSearch with proper checked value', () => {
		var spy = expect.createSpy();
		var toDoSearch = TestUtils.renderIntoDocument(<ToDoSearch onSearch={spy} />);
		var $el = $(ReactDOM.findDOMNode(toDoSearch));

		toDoSearch.refs.showCompleted.checked = true;
		TestUtils.Simulate.change(toDoSearch.refs.showCompleted);

		expect(spy).toHaveBeenCalledWith(true, '');
	});
});