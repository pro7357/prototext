
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'

export default (initialState, state, action) => {

	let tpi = state.targetPageIndex
	let tbi = state.targetBlockIndex
	let content = state.content

	return {
		...state,
		timestamp: getTimestamp(),
		content: iteratePageBlocks({
			content,
			targetPageIndex: tpi,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {
				return blocks.concat(blockIndex === tbi ? [block,block]: block)
			}
		})
	}
}