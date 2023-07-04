
import initResponseCards from './initResponseCards'
import completeResponseCards from './completeResponseCards'
import { activateAiPromptMode, deactivateAiPromptMode } from 'editorActions'
import getLinkedContent from './getLinkedContent'

let config
let duoPromptContentBlock
let duoPromptContentBlockIndex
let duoPromptContentBlockPageIndex


export default async props => {

	const {
		sharedEditorProps,
		isDuoPromptMode,
		isSecondDuoPromptingStage,
		pageIndex,
		blockIndex,
		block,
		processData,
		stream,
	} = props


	// STEP 1
	// Keep the target action config locally.
	config = props.config || config


	// STEP 2
	// Manage the duo prompting stages.

	const isFirstDuoPromptingStage = !isSecondDuoPromptingStage

	if(isDuoPromptMode) {

		if(isFirstDuoPromptingStage) {
			/*
				Duo prompting stage #1.
				This card plays the role of "Content".
			*/
			duoPromptContentBlock = block
			duoPromptContentBlockPageIndex = pageIndex
			duoPromptContentBlockIndex = blockIndex
			return activateAiPromptMode()
		} else {
			/*
				Duo prompting stage #2.
				User completes the formation of your prompt, chose the second card.
				This card plays the role of "Task".
				"Content" and "Task" can be the same card.
			*/
			deactivateAiPromptMode()
		}
	}


	// STEP 3
	// Create a new blank card for the future API response.

	const responseBlockIndex = isSecondDuoPromptingStage
			? duoPromptContentBlockIndex + 1
			: blockIndex + 1

	const responsePageIndex = isDuoPromptMode
		? duoPromptContentBlockPageIndex
		: pageIndex

	const responseBlock = initResponseCards({
		responsePageIndex,
		responseBlockIndex,
	})


	// STEP 4
	// Collect and normalize the final prompt and linked data.

	let prompt = block.content

	if(block.link && block.link.ids) {
		prompt = getLinkedContent(block)
	}

	if(isDuoPromptMode) {
		let sameBlocks = block.id === duoPromptContentBlock.id
		if(!sameBlocks) {
			let promptContentPart = duoPromptContentBlock.link &&
				duoPromptContentBlock.link.ids
					? getLinkedContent(duoPromptContentBlock)
					: duoPromptContentBlock.content
			prompt = `${prompt}: \`\`\`${promptContentPart}\`\`\``
		}
	}

	if(prompt) {
		prompt = prompt.replaceAll('\n',' ')
	}



	// STEP 5
	// Process the data to execute the engine request method
	// and receive new normalized cards as a response.

	let newCards = await processData({
		sharedEditorProps,
		config,
		prompt,
		block,
		responseBlock,
		responsePageIndex,
		responseBlockIndex,
		onError: errorMessage => {
			completeResponseCards({
				responseBlock,
				responsePageIndex,
				responseBlockIndex,
				errorMessage
			})
			console.error(errorMessage)
		}
	})


	// STEP 6
	// Update all response cards.
	if(newCards && !stream) {
		console.log('Final response', newCards)
		completeResponseCards({
			responseBlock,
			responsePageIndex,
			responseBlockIndex,
			newCards: newCards
		})
	}


}