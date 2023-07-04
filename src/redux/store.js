
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import requestElectronApi from 'globalUtils/requestElectronApi'
import deepClone from 'globalUtils/deepClone'
import migrateSettings from 'globalUtils/migrateSettings'
import prepareStateToSave from 'globalUtils/prepareStateToSave'
import rootReducer from './reducers/root'
import { setHistorySteps } from './actions/hystory'
import { setEditorState } from 'editorActions'


let store
let history = []
let historyLen = 100
let thereAreUnsavedChanges = false
let lastSavingTime = (new Date()).getTime()


export const undo = () => {

	if(!history.length) {
		return
	}

	let stateFormHistory = history.pop()
	setEditorState(stateFormHistory.editor, true)
	setHistorySteps(history.length)

}


const stateMiddleware = store => next => action => {

	const actionType = action.type

	let state = store.getState()

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

		let stateClone = deepClone(state)

		delete stateClone.editor.pageView

		if(isSoftReset) {

			localStorage.setItem(
				'contentBeforeSoftReset',
				JSON.stringify(stateClone.editor.content)
			)

			location.reload()

		} else {

			// Limit history.
			if(history.length === historyLen) {
				history = history.slice(1)
			}

			history = history.concat(stateClone)

			store.dispatch({
				type: 'setHistorySteps',
				payload: history.length
			})

		}

	}


	let result = next(action)


	// Save the doc automatically.

	const autoSaveMode = state.settings.autoSaveMode
	const filePath = state.filePath

	if(autoSaveMode && filePath) {
		setTimeout(() => {
			requestElectronApi(
				'completeSaving',
				{
					state: prepareStateToSave(),
					filePath,
					silentMode: true
				}
			)
		}, 0)
	}

	if(action.lsKey) {
		if(action.payload === undefined || action.payload === null) {
			localStorage.removeItem(action.lsKey)
		} else {
			localStorage.setItem(
				action.lsKey,
				JSON.stringify(action.payload)
			)
		}
	}

	return result

}


function initializeGlobalState(initialState = {}) {

	store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(
			applyMiddleware(stateMiddleware)
		)
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

	// Migrate settings.
	let initialState = migrateSettings({})

	// Initialization from scratch.
	store = initializeGlobalState(initialState)

}


export {
	initializeGlobalState,
	store
}