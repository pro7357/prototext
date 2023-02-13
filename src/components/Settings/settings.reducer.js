
import normalizeInitialState from 'globalUtils/normalizeInitialState'
import models from './models/settings'

const initialState = normalizeInitialState(models)


export default (state = initialState, action) => {

	if(action.type === 'setSettingsProperty') {
		return {
			...state,
			[action.propId]: action.payload
		}
	}

	return state

}