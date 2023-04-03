
import { store } from 'store'

export const setSelectedDocs = payload => {
	store.dispatch({
		type: 'setSelectedDocs',
		lsKey: 'selectedDocs',
		payload
	})
}


export const setRecentDocs = payload => {
	store.dispatch({
		type: 'setRecentDocs',
		lsKey: 'recentDocs',
		payload
	})
}


export const addRecentDoc = filePath => {
	const state = store.getState()
	const recentDocs = state.welcomeSettings.recentDocs || []
	if(!recentDocs.includes(filePath)) {
		setRecentDocs(
			[].concat(filePath, recentDocs)
		)
	}

}


export const switchFullscreenWelcomeMode = payload => {
	store.dispatch({
		type: 'switchFullscreenWelcomeMode',
		lsKey: 'isFSStartingMode',
		payload
	})
}