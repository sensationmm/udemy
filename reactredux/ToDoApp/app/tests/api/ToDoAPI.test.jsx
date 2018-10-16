var expect = require('expect');

var ToDoAPI = require('ToDoAPI');

describe('To Do API', () => {
	beforeEach(() => {
		localStorage.removeItem('todos');
	});

	it('should exist', () => {
		expect(ToDoAPI).toExist();
	});

	describe('setToDos', () => {
		it('should set valid todos array', () => {
			var todos = [{
				id: 23,
				text: 'Dummy todo',
				completed: false
			}];
			ToDoAPI.setToDos(todos);

			var actualToDos = JSON.parse(localStorage.getItem('todos'));
			expect(actualToDos).toEqual(todos);
		});

		it('should not set invalid todos array', () => {
			var todos = 'not an array';
			ToDoAPI.setToDos(todos);

			var actualToDos = JSON.parse(localStorage.getItem('todos'));
			expect(actualToDos).toBe(null);
		});
	});

	describe('getToDos', () => {
		it('should return empty array for bad local storage data', () => {
			var actualToDos = ToDoAPI.getToDos();

			expect(actualToDos).toEqual([]);
		});

		it('should return todos if valid array in localStorage', () => {
			var todos = [{
				id: 23,
				text: 'Dummy todo',
				completed: false
			}];
			localStorage.setItem('todos', JSON.stringify(todos));

			var actualToDos = ToDoAPI.getToDos();
			expect(actualToDos).toEqual(todos);
		});
	});

	describe('filterToDos', () => {
		var todos = [
			{
				id: 1,
				text: 'Some text here',
				completed: true
			},
			{
				id: 2,
				text: 'Other text here',
				completed: false
			},
			{
				id: 3,
				text: 'Some text here',
				completed: true
			},
		];

		it('should return all items if showCompleted equals true', () => {
			var filteredToDos = ToDoAPI.filterToDos(todos, true, '');

			expect(filteredToDos.length).toBe(todos.length);
		});

		it('should return only uncompleted items if showCompleted equals false', () => {
			var filteredToDos = ToDoAPI.filterToDos(todos, false, '');

			expect(filteredToDos.length).toBe(1);
		});

		it('should sort by completed status', () => {
			var filteredToDos = ToDoAPI.filterToDos(todos, true, '');

			expect(filteredToDos[0].completed).toBe(false);
			expect(filteredToDos[1].completed).toBe(true);
			expect(filteredToDos[2].completed).toBe(true);
		});

		it('should filter to todos by search text', () => {
			var filteredToDos = ToDoAPI.filterToDos(todos, true, 'some');

			expect(filteredToDos.length).toBe(2);
		});

		it('should return all todos if search text is empty', () => {
			var filteredToDos = ToDoAPI.filterToDos(todos, true, '');

			expect(filteredToDos.length).toBe(3);
		});
	});

});