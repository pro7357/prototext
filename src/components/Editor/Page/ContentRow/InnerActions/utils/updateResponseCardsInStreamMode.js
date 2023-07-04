
import createBlock from 'editorUtils/createBlock'
import sanitizeLLMResponse from 'globalUtils/ai/sanitizeLLMResponse'
import completeResponseCards from './completeResponseCards'

let finalStreamResultText = ''
let responseNode


export default props => {

	const {
		sharedEditorProps,
		responsePageIndex,
		responseBlock,
		responseBlockIndex,
		streamIsDone,
		splitResponse,
		result,
	} = props


	if(!streamIsDone) {

		// In stream mode, update the AI response using native html methods, and only at the end call react rendering via Redux state update.

		if(!responseNode) {

			const {
				pageView,
				leftSideFocus
			} = sharedEditorProps

			let side = pageView === 0
				? `center-`
				: pageView === 1
					? `${leftSideFocus === responsePageIndex ? `left` : `right`}-`
					: ``

			responseNode = document.getElementById(
				`${side}be-${responsePageIndex}-0-${responseBlockIndex}`
			)

		}

		if(result && result.text) {

			responseNode.innerText = result.text
			finalStreamResultText = result.text
			if(finalStreamResultText[0]==='"') {
				finalStreamResultText
			}

		}

		return

	}

	if(streamIsDone) {
		finalStreamResultText = sanitizeLLMResponse(finalStreamResultText)
	}

	const createBlankAIBlock = text => createBlock( text, { style: 9 })

	let newCards = splitResponse === 'yes'
		? finalStreamResultText.split('\n').reduce((done, cur, index)=>{
			return done.concat(
				createBlankAIBlock(
					cur.trim()
				)
			)
		}, [])
		: [createBlankAIBlock(finalStreamResultText)]

	completeResponseCards({
		responseBlock,
		responsePageIndex,
		responseBlockIndex,
		newCards: newCards
	})

	finalStreamResultText = ''
	responseNode = null

}