
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'

export default (initialState, state, action) => {

	let tpi = state.targetPageIndex
	let content = state.content

	return {
		...state,
		timestamp: getTimestamp(),
		content: iteratePageBlocks({
			content,
			targetPageIndex: tpi,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {

				// Combine the contents of the target block with another block specified by the user, and so on all localizations.
				if(blockIndex === action.dstBlockIndex) {

					let srcBlock = locale.content[action.srcBlockIndex]
					let srcBlockValue = srcBlock && srcBlock.content

					let newDstBlock

					// Combine the content of two neighboring original blocks and keep the style for newDstBlock.
					newDstBlock = {
						...block,
						content: block.content + (block.content ? ' ' : '') + srcBlockValue
					}

					return blocks.concat(newDstBlock)

				}

				// Delete the target block and all its localization.
				if(blockIndex === action.srcBlockIndex) {
					return blocks
				}

				return blocks.concat(block)

			}
		})
	}
}