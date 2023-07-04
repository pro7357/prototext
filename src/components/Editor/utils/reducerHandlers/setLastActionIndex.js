
export default (initialState, state, action) => ({
	...state,
	lastActionIndex: action.lastActionIndex,
	targetPageIndex: action.targetPageIndex,
	targetLocaleIndex: action.targetLocaleIndex,
	targetBlockIndex: action.targetBlockIndex,
})