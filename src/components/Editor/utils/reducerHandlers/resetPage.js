
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'
import createBlock from '../createBlock'

export default (initialState, state, action) => {

	let content = state.content

	return {
		...state,
		timestamp: getTimestamp(),
		content: iteratePageBlocks({
			content,
			targetPageIndex: action.targetPageIndex,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {

				if(blockIndex === 0) {
					return blocks.concat(
						createBlock()
					)
				}

				return blocks

			}
		})
	}

}