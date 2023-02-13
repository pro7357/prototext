
import { store } from 'store'

export const toggleTheme = () => {
	store.dispatch({
		type: 'toggleTheme'
	})
}
