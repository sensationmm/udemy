var redux = require('redux');


console.log('starting todo example');

var stateDefault = {
	searchText: '', 
	showCompleted: false, 
	todos: []
};

var reducer = (state = stateDefault, action) => {

	switch(action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			}
			break;
		default:
			return state;
	}


	return state;
};

var store = redux.createStore(reducer);

console.log('currentState', store.getState());

store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Dog'
});

console.log('search text should be dog', store.getState());