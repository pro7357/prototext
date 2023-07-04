
import { addBlock, updBlock } from 'editorActions'
import getActualBlock from 'editorUtils/getActualBlock'
import findBlockById from 'sharedUtils/findBlockById'

export default props => {

	const {
		responseBlock,
		responsePageIndex,
		responseBlockIndex,
		newCards,
		errorMessage
	} = props

	let actualResponseBlock = getActualBlock({
		pageIndex: responsePageIndex,
		localeIndex: 0,
		blockIndex: responseBlockIndex
	})

	let actualResponsePageIndex = responsePageIndex
	let actualResponseBlockIndex = responseBlockIndex

	if(responseBlock && responseBlock.id !== actualResponseBlock.id) {

		// The response card has been moved. Try to find it globally.
		let searchingResult = findBlockById({
			blockId: responseBlock.id
		})

		if(!searchingResult) {
			// The card not found. Do nothing.
			console.log(`Card ${responseBlock.id} not found`)
			return
		}

		actualResponsePageIndex = searchingResult.pageIndex
		actualResponseBlockIndex = searchingResult.blockIndex
		actualResponseBlock = searchingResult.block

	}


	// Complete the response with an error.
	if(errorMessage) {

		let defaultErrorMessage = `Something went wrong. Try again, please.`

		updBlock(
			{
				isLoading: undefined,
				content: errorMessage || defaultErrorMessage,
				style: 1,
			},
			true, // with refresh
			actualResponsePageIndex,
			0,
			actualResponseBlockIndex
		)

		return

	}

	// Complete the response without error.
	// Replace the response card and create new cards if need.
	addBlock(
		newCards,
		actualResponsePageIndex,
		actualResponseBlockIndex,
		true // replace the target card
	)

}