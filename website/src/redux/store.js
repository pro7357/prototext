
import { createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import rootReducer from './reducers/root'


let store

function initializeGlobalState(initialState) {

	store = createStore(
		rootReducer,
		initialState || {},
		composeWithDevTools()
	)

	return store

}

if(!store) {

	// Initialization from scratch.
	store = initializeGlobalState()

}


export {
	initializeGlobalState,
	store
}