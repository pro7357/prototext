
import normalizeInitialState from '../../../src/utils/normalizeInitialState'
import { themeIds } from 'app/theme/themes'

const initialState = normalizeInitialState('theme',1,true)


export default (state = initialState, action) => {

	if(action.type === 'toggleTheme') {
		let newValue = (state + 1) % themeIds.length
		localStorage.setItem('theme',newValue)
		return newValue
	}

	return state

}