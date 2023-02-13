
import getTimestamp from 'globalUtils/getTimestamp'

export default (initialState, state, action) => {

	let lMode = state.pageView === 2
	let lsf = state.leftSideFocus
	let rsf = state.rightSideFocus
	let content = state.content

	let _dstIndex = action.dstPageIndex > action.srcPageIndex
		? action.dstPageIndex
		: action.dstPageIndex + 1

	let moveOpposite = (cur) => {
		return action.srcPageIndex < cur && action.dstPageIndex >= cur
			? cur - 1
			: action.srcPageIndex > cur && action.dstPageIndex < cur
				? cur + 1
				: cur
	}

	let _lsf
	let _rsf

	_lsf = action.side === 'left'
		? _dstIndex
		: moveOpposite(lsf)

	_rsf = lMode
		? rsf
		: action.side === 'right'
			? _dstIndex
			: moveOpposite(rsf)

	// Synchronize the focus when the target elements match on both sides.
	if(!lMode ) {
		if(action.side === 'left') {
			if(action.srcPageIndex === rsf) {
				_rsf = _lsf
			}
		} else {
			if(action.srcPageIndex === lsf) {
				_lsf = _rsf
			}
		}
	} else {
		// Reset the localization index.
		_rsf = 1
	}

	return {
		...state,
		timestamp: getTimestamp(),
		leftSideFocus: _lsf,
		rightSideFocus: _rsf,
		content: content.reduce((pages, page, pageIndex)=>{

			// Exclude page (source)
			if(pageIndex === action.srcPageIndex) {
				return pages
			}

			// Include page
			if(pageIndex === action.dstPageIndex) {
				let srcPage = content[action.srcPageIndex]
				return pages.concat(page,srcPage)
			}

			return pages.concat(page)

		},[])
	}
}