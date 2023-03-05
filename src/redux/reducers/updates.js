
const initialState = null

export default (state = initialState, action) => {

	if(action.type === 'setUpdatesInfo') {
		return action.payload
	}
	return state

}