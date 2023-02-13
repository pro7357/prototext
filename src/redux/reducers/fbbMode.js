
import normalizeInitialState from 'globalUtils/normalizeInitialState'

const initialState = normalizeInitialState('fbbMode',true,true)

// Fast block breaking mode by press the Enter key otherwise by Shift+Enter
export default (state = initialState, action) => {

	if(action.type === 'toggleFbbMode') {
		let newValue = !state
		localStorage.setItem('fbbMode',newValue)
		return newValue
	}

	return state

}