
export default (initialState, state, action) => ({
	...state,
	pageView: typeof action.payload === 'undefined'
		? (state.pageView + 1) % state.pageViews.length
		: action.payload,
	rightSideFocus: action.payload === 2
		? state.localeOptions.length > 1 ? 1 : 0
		: state.leftSideFocus,
	localeConfigMode: false,
})