
import getTimestamp from 'globalUtils/getTimestamp'
import createFilledArray from 'globalUtils/createFilledArray'
import iteratePageBlocks from '../iteratePageBlocks'
import createBlock from '../createBlock'


/*
	payload
		undefined - will create an empty block using the "createBlock" function
		{block}   - will be wrapped into an array
		[{block},{block},...] - normal payload format

	position
		undefined or integer - the target position in the list of blocks, where one or group of new blocks will be added

	replaceTargetBlock
		undefined or boolean - it works almost like "updBlock" function

	The creation of new blocks is allowed and possibly only for original localization.

*/
export default (initialState, state, action) => {

	let tpi = state.targetPageIndex
	let tbi = state.targetBlockIndex
	let content = state.content
	let payload = action.payload
	let replaceTargetBlock = action.replaceTargetBlock
	let isEmpty = !payload

	if(payload && !Array.isArray(payload)) {
		payload = [payload]
	}

	let actionPosition = action.position

	const blocksAmount = content[tpi].content[0].content.length

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

				let insertAtEnd = position === blocksAmount &&
					position - 1 === blockIndex

				if(blockIndex === position || insertAtEnd) {

					// Create empty blocks for all secondary localizations.
					if(localeIndex > 0 || !payload) {
						payload = createFilledArray(
							payload ? payload.length : 1,
							() => createBlock()
						)
						if(replaceTargetBlock) {
							// Exception!
							// In the case of replacing the target block, the contents of localizations - to leave unchanged.
							payload[0] = block
						}
					}

					return blocks.concat(
						insertAtEnd || isEmpty
							? [].concat(block,payload)
							: replaceTargetBlock
								? payload
								: [].concat(payload,block)
					)

				}

				return blocks.concat(block)

			}
		})
	}

}