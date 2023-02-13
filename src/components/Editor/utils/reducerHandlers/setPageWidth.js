
export default (initialState, state, action) => ({
	...state,
	pageWidth: action.payload
})