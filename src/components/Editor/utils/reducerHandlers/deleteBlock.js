
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'


export default (initialState, state, action) => {

	let tpi = state.targetPageIndex
	let tbi = state.targetBlockIndex
	let content = state.content
	let actionPosition = action.position
	let selRange = state.selRange

	return {
		...state,
		timestamp: getTimestamp(),
		selRange: null,
		content: iteratePageBlocks({
			content,
			targetPageIndex: tpi,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {

				// Remove rage of blocks.
				if(selRange && selRange.includes(blockIndex)) {
					return blocks
				}

				// Remove a block.

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