
import { store } from 'store'


export const switchTheme = (payload) => {
	store.dispatch({
		type: 'switchTheme',
		payload
	})
}

export const toggleTheme = () => {
	store.dispatch({
		type: 'toggleTheme'
	})
}
