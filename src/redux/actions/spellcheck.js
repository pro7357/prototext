
import { store } from 'store'

export const toggleSpellchecker = () => {
	store.dispatch({
		type: 'toggleSpellchecker'
	})
}
