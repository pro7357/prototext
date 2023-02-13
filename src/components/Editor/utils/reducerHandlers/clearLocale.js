
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'

export default (initialState, state, action) => {

	let rsf = state.rightSideFocus
	let content = state.content

	return {
		...state,
		timestamp: getTimestamp(),
		content: iteratePageBlocks({
			content,
			targetPageIndex: action.targetPageIndex,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {
				return blocks.concat(
					localeIndex === rsf
						? {
							...block,
							content: ''
						}
						: block
				)

			}
		})
	}

}