
import normalizeInitialState from 'globalUtils/normalizeInitialState'
import recentDocsDemo from './data/recentDocsDemo'

// key, defaultValue, isFromLocalStorage
const initialState = normalizeInitialState([
	['recentDocs', isDesktopBuild ? false : recentDocsDemo, true],
	['selectedDocs',[],true],
	['isFSStartingMode',false,true],
])


export default (state = initialState, action) => {

	switch (action.type) {

		case 'setSelectedDocs':
			return {
				...state,
				selectedDocs: action.payload
			}


		case 'setRecentDocs':
			return {
				...state,
				recentDocs: action.payload
			}


		case 'switchFullscreenWelcomeMode':
			return {
				...state,
				isFSStartingMode: action.payload
			}


		default:
			return state

	}
}