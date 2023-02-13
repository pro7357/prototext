
export default (initialState, state, action) => ({
	...state,
	compactMenuMode: !state.compactMenuMode
})