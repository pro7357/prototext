
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'

export default (initialState, state, action) => {

	let lsf = state.leftSideFocus
	let rsf = state.rightSideFocus
	let content = state.content

	return {
		...state,

		// Activate rendering or not.
		timestamp: action.refresh ? getTimestamp() : state.timestamp,

		// Switch the workspace in Two Pages view mode.
		pageView: 1,

		// Switch focus to the page by link. Take into account the side on which a click was made to open the link to the opposite side.
		leftSideFocus: action.side === 'left' ? lsf : action.targetPageIndex,
		rightSideFocus: action.side === 'right' ? rsf : action.targetPageIndex,

		targetPageIndex: action.targetPageIndex,
		targetBlockIndex: action.targetBlockIndex,
		targetLocaleIndex: 0,

		// Highlight the connected block or page heading if the block does not exist.
		content: iteratePageBlocks({
			content,
			targetPageIndex: action.targetPageIndex,
			handler: (locale, localeIndex, blocks, block, blockIndex) => {

				if(
					localeIndex === action.targetLocaleIndex &&
					blockIndex === action.targetBlockIndex
				) {
					if(action.turnOn) {
						block.isHighlighted = true
					} else {
						delete block.isHighlighted
					}
				}

				return blocks.concat(block)

			}
		})
	}

}