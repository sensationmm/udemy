var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Test = require('Test');

describe('Test', () => {
	it('should exist', () => {
		expect(Test).toExist();
	});
});