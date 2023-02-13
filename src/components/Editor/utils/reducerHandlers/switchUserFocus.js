
export default (initialState, state, action) => ({
	...state,
	targetPageIndex: action.targetPageIndex,
	targetLocaleIndex: action.targetLocaleIndex,
	targetBlockIndex: action.targetBlockIndex,
})