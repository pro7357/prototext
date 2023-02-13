
import normalizeInitialState from '../utils/normalizeInitialState'
import { themeIds } from './themes'

const initialState = normalizeInitialState('theme',0,true)


export default (state = initialState, action) => {

	// if(action.type === 'switchTheme') {
	// 	return action.payload
	// }

	if(action.type === 'toggleTheme') {
		let newValue = (state + 1) % themeIds.length
		localStorage.setItem('theme',newValue)
		return newValue
	}

	return state

}