
import { store } from 'store'


export const setFilePath = payload => {
	store.dispatch({
		type: 'setFilePath',
		payload
	})
}


export const resetFilePath = () => {
	setFilePath('')
}