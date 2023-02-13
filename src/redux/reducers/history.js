
const initialState = 0

export default (state = initialState, action) => {

	if(action.type === 'setHistorySteps') {
		return action.payload
	}
	return state

}