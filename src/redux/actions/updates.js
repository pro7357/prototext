
import { store } from 'store'


export const setUpdatesInfo = payload => {
	store.dispatch({
		type: 'setUpdatesInfo',
		payload
	})
}

export const resetUpdatesInfo = () => {
	setUpdatesInfo(null)
}