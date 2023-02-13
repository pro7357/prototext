
export default (initialState, state, action) => ({
	...state,
	[action.key+'Mode']: action.value
})