
const initialState = ''

export default (state = initialState, action) => {

	if(action.type === 'setFilePath') {
		return action.payload
	}

	return state

}