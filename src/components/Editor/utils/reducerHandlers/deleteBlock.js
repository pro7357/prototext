
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'


export default (initialState, state, action) => {

	let tpi = state.targetPageIndex
	let tbi = state.targetBlockIndex
	let content = state.content
	let actionPosition = action.position

	return {
		...state,
		timestamp: getTimestamp(),
		content: iteratePageBlocks({
			content,
			targetPageIndex: tpi,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {

				let position = typeof actionPosition !== 'undefined'
					? actionPosition
					: tbi

				return blockIndex === position
					? blocks
					: blocks.concat(block)
			}
		})
	}
}