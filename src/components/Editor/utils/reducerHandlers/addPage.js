
import getTimestamp from 'globalUtils/getTimestamp'
import getUID from 'globalUtils/getUID'
import createFilledArray from 'globalUtils/createFilledArray'
import createBlock from '../createBlock'

export default (initialState, state, action) => {

	let lMode = state.pageView === 2
	let lsf = state.leftSideFocus
	let rsf = state.rightSideFocus
	let content = state.content
	let pgQt = content.length

	return {
		...state,
		timestamp: getTimestamp(),
		localeOptions: lMode && action.side === 'right'
			? [].concat(state.localeOptions,'')
			: state.localeOptions,
		content: lMode && action.side === 'right'
			? content.reduce((pages, page, pageIndex)=>{

				// Add new localization for all pages.
				page.content.push({
					id: getUID(),
					content: createFilledArray(
						page.content[0].content.length,
						() => createBlock()
					)
				})

				return pages.concat(page)

			},[])


			// Or add a new page with a full list of localizations.
			: [].concat(content, {
				id: getUID(),
				content: state.localeOptions.reduce((ls,l,i)=>{
					return ls.concat({
						id: getUID(),
						content: [createBlock()]
					})
				},[])
			}),

		leftSideFocus: action.side === 'left' || action.side === 'center' ? pgQt : lsf,
		rightSideFocus: action.side === 'right'
			? state.localeOptions.length > 1 ? rsf + 1 : 1
			: lMode
				? 1
				: rsf
	}

}