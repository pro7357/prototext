
export default (initialState, state, action) => {

	let lMode = state.pageView === 2
	let lsf = state.leftSideFocus
	let rsf = state.rightSideFocus
	let content = state.content

	return {
		...state,
		localeOptions: lMode && action.targetLocaleIndex
			? state.localeOptions.filter(
				(option, optionIndex) => optionIndex !== action.targetLocaleIndex
			)
			: state.localeOptions,

		content: content.reduce((pages, page, pageIndex)=> {

			// Delete targeted localization for all pages.
			if(action.targetLocaleIndex) {
				return pages.concat({
					...page,
					content: page.content.filter(
						(locale, localeIndex) => localeIndex !== action.targetLocaleIndex
					)
				})
			}

			// Or, delete the target page.
			return pageIndex === action.targetPageIndex
				? pages
				: pages.concat(page)

		},[]),
		targetLocaleIndex: 0,
		targetBlockIndex: 0,
		leftSideFocus: action.targetLocaleIndex
			? lsf // Localization deleting, target page does not change.
			: lsf && lsf >= action.targetPageIndex ? lsf - 1 : lsf,
		rightSideFocus: lMode
			? 1
			: rsf && rsf >= action.targetPageIndex ? rsf - 1 : rsf,
	}

}