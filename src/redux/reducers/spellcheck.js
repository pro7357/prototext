
import normalizeInitialState from 'globalUtils/normalizeInitialState'

const initialState = normalizeInitialState('spellcheck',false,true)

// Check spelling or not.
export default (state = initialState, action) => {

	if(action.type === 'toggleSpellchecker') {
		let newValue = !state
		localStorage.setItem('spellcheck',newValue)
		return newValue
	}

	return state

}