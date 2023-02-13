
import normalizeInitialState from 'globalUtils/normalizeInitialState'

const initialState = normalizeInitialState('scrollbarsMode',false,true)

// Show or hide custom scrollbars.
export default (state = initialState, action) => {

	if(action.type === 'toggleScrollbarsMode') {
		let newValue = !state
		localStorage.setItem('scrollbarsMode',newValue)
		return newValue
	}

	return state

}