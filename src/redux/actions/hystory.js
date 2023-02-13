
import { store } from 'store'


export const setHistorySteps = payload => {
	store.dispatch({
		type: 'setHistorySteps',
		payload
	})
}

export const resetHistory = () => {
	setHistorySteps(0)
}