
import { store } from 'store'

export const setSettingsProperty = (propId, payload) => {
	store.dispatch({
		type: 'setSettingsProperty',
		propId,
		payload
	})
}