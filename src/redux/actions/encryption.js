
import { store } from 'store'


export const setEcryption = payload => {
	store.dispatch({
		type: 'setEcryption',
		payload
	})
}

export const setSecretKey = payload => {
	store.dispatch({
		type: 'setSecretKey',
		payload
	})
}


export const disableEncryption = () => {
	store.dispatch({
		type: 'setEcryption',
		payload: null
	})
}