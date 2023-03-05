
export default (initialState, state, action) => {

	let lMode = state.pageView === 2
	let linkMode = state.linkMode
	let tpi = state.targetPageIndex
	let tbi = state.targetBlockIndex
	let lsf = state.leftSideFocus
	let rsf = state.rightSideFocus
	let selMode = state.selRange

	return {
		...state,
		targetPageIndex: lMode || linkMode || selMode ? tpi : action.focus,
		targetBlockIndex: linkMode ? tbi : 0,
		leftSideFocus: action.side === 'left' ? action.focus : lsf,
		rightSideFocus: lMode && action.side === 'left'
			? rsf
			: action.side === 'right' ? action.focus : rsf
	}

}