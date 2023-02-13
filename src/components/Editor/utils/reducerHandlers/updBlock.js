
import getTimestamp from 'globalUtils/getTimestamp'
import iteratePageBlocks from '../iteratePageBlocks'
import getActValOrPrev from 'globalUtils/getActValOrPrev'


export default (initialState, state, action) => {

	let content = state.content
	let payload = action.payload

	return {
		...state,
		timestamp: action.refresh ? getTimestamp() : state.timestamp,
		content: iteratePageBlocks({
			content,
			targetPageIndex: getActValOrPrev('targetPageIndex', state, action),
			handler: (locale, localeIndex, blocks, block, blockIndex) => {
				return blocks.concat(
					blockIndex === getActValOrPrev('targetBlockIndex', state, action) &&
					localeIndex === getActValOrPrev('targetLocaleIndex', state, action)
						? payload
						: block
				)
			}
		})
	}

}