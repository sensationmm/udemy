var redux = require('redux');

console.log('starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {

	switch(action.type) {
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
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
	type: 'CHANGE_NAME',
	name: 'Kevin'
});

console.log('newState', store.getState());