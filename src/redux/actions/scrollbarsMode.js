
import { store } from 'store'

export const toggleScrollbarsMode = () => {
	store.dispatch({
		type: 'toggleScrollbarsMode'
	})
}
