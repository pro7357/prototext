
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import requestElectronApi from 'globalUtils/requestElectronApi'
import deepClone from '../utils/deepClone'
import rootReducer from './reducers/root'
import { setHistorySteps } from './actions/hystory'
import { setEditorState } from 'editorActions'


let store
let history = []
let historyLen = 100
let thereAreUnsavedChanges = false


export const undo = () => {
	let stateFormHistory = history.pop()
	setEditorState(stateFormHistory.editor, true)
	setHistorySteps(history.length)
}


const stateMiddleware = store => next => action => {

	const actionType = action.type

	let isReset = actionType === 'resetEditorState'
	let isSoftReset = actionType === 'softResetEditorState'

	if(isReset) {
		thereAreUnsavedChanges = false
	}

	if(
		!isReset &&
		thereAreUnsavedChanges === false &&
		(
			action.allowUndo ||
			['setSecretKey','updBlock'].includes(actionType)
		)
	) {
		requestElectronApi('thereAreUnsavedChanges')
		thereAreUnsavedChanges = true
	}

	if(action.allowUndo || isSoftReset) {

		let state = deepClone(store.getState())

		delete state.editor.pageView

		if(isSoftReset) {

			localStorage.setItem('contentBeforeSoftReset',JSON.stringify(state.editor.content))
			location.reload()

		} else {

			// Limit history.
			if(history.length === historyLen) {
				history = history.slice(1)
			}

			history = history.concat(state)

			store.dispatch({
				type: 'setHistorySteps',
				payload: history.length
			})

		}

	}

	let result = next(action)

	if(action.lsKey) {
		localStorage.setItem(
			action.lsKey,
			JSON.stringify(action.payload)
		)
	}

	// localStorage.setItem('state', JSON.stringify(store.getState()))
	return result
}


function initializeGlobalState(initialState) {

	store = createStore(
		rootReducer,
		isDesktopBuild ? {} : initialState || {},
		composeWithDevTools(applyMiddleware(stateMiddleware))
	)

	return store

}

if(!store) {

	// Store the state in the local storage.
	// This function is disabled at the moment.

	let allowKeepAllStateInLS = false

	if(allowKeepAllStateInLS) {
		let savedState = localStorage.getItem('state')

		try {
			// savedState = savedState && JSON.parse(savedState)
		} catch (e) {
			console.error(e)
		}

		store = initializeGlobalState(savedState)
	}

	// Initialization from scratch.
	store = initializeGlobalState()

}


export {
	initializeGlobalState,
	store
}