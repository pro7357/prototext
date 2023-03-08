
import { store } from 'store'
import { askChatGPT } from 'globalUtils/ai/openai/chatGPT'
import createBlock from 'editorUtils/createBlock'
import getLinkedContent from './getLinkedContent'


import {
	updBlock,
	addBlock,
	deleteBlock,
	activateAiPromptMode,
	deactivateAiPromptMode
} from 'editorActions'

import { showSettings } from 'layoutActions'


// This mode means imitation of a request with delay and
// imitation of an answer – "./src/utils/ai/openai/demo/chatGPTResponse.js"
const chatGPTImitationMode = isDesktopBuild ? false : !true

// Determine the request method - stream or full answer with delay.
const stream = true



export default async props => {

	const {
		taskPageIndex,
		taskBlockIndex
	} = props

	const state = store.getState()
	const appSettings = state.settings

	const openAIApiKey = appSettings.openAIApiKey
	const chatGPTTemperature = appSettings.chatGPTTemperature
	const chatGPTMaxTokens = appSettings.chatGPTMaxTokens

	if(typeof taskBlockIndex === 'undefined') {
		/*
			STAGE 1
			The user initiates a request to AI by pressing the "AI" button inside a block.
			Such a block plays the role of "Payload".
		*/

		if(!openAIApiKey) {
			alert(
				'OpenAI API key not configured. The app will now open the settings window.'
			)
			showSettings()
			return
		}

		activateAiPromptMode()
		return

	}


	/*
		STAGE 2
		The user completes the formation of your request, chose the second block.
		Such a block plays the role of "Task".
		"Payload" and "Task" can be the same block.
	*/


	// Turn off the block selection mode.
	deactivateAiPromptMode()


	/*
	 	Collect the final prompt for AI from two choosed blocks.
	*/

	const {
		targetPageIndex: initialPageIndex,
		targetBlockIndex: initialBlockIndex,
		content,
		leftSideFocus,
		pageView
	} = state.editor

	const isSame = taskPageIndex === initialPageIndex &&
		taskBlockIndex === initialBlockIndex

	const localeIndex = 0

	const initialPage = content[initialPageIndex]
	const initialBlock = initialPage.content[localeIndex].content[initialBlockIndex]

	const taskPage = isSame
		? initialPage
		: content[taskPageIndex]

	const taskBlock = isSame
		? initialBlock
		: taskPage.content[localeIndex].content[taskBlockIndex]

	let task = taskBlock.content
	let payload = !isSame ? initialBlock.content : ''

	if(!task && !payload) {
		alert('Empty request')
		return
	}


	// Case when task-block is an internal link.
	// Try to find a page that this block refers to
	// and use all its text content for the final prompt.
	if(taskBlock.link && taskBlock.link.ids) {

		task = getLinkedContent({
			allEditorContent: content,
			localeIndex,
			block: taskBlock,
		})

	}



	// Case when payload-block is an internal link.
	// Try to find a page that this block refers to
	// and use all its text content for the final prompt.
	if(!isSame && initialBlock.link && initialBlock.link.ids) {

		payload = getLinkedContent({
			allEditorContent: content,
			localeIndex,
			block: initialBlock,
		})

	}


	if(!isSame && payload) {
		payload = `: "${payload.replace(/"/g,'\'')}"`
		if(task && (task.slice(-1) || '').match(/\w/) === null) {
			task = task.slice(0,-1)
		}
	}

	let finalPrompt = `${task}${payload}`
	// console.log('Final prompt', finalPrompt)


	// Create a new block for the future response of AI.
	const aiResponseBlockIndex = initialBlockIndex + 1
	let aiResponseBlockNode
	const aiResponseBlock = createBlock(
		'...',
		{
			style: 9,
			isLoading: true
		}
	)

	addBlock(
		aiResponseBlock,
		aiResponseBlockIndex
	)


	const onError = () => {
		deleteBlock(aiResponseBlockIndex)
	}


	// Update the AI response block.

	let finalStreamResultText = ''
	let finalStreamResultId

	const updateResponseBlock = (result, streamIsDone) => {

		if(stream && !streamIsDone && !chatGPTImitationMode) {

			// In stream mode, update the AI response using native html methods, and only at the end call react rendering via Redux state update.

			if(result && result.text) {

				if(!aiResponseBlockNode) {

					let side = pageView === 0
						? `center-`
						: pageView === 1
							? `${leftSideFocus === initialPageIndex ? `left` : `right`}-`
							: ``

					aiResponseBlockNode = document.getElementById(
						`${side}be-${initialPageIndex}-0-${aiResponseBlockIndex}`
					)

				}

				if(aiResponseBlockNode) {
					aiResponseBlockNode.innerText = result.text
					finalStreamResultText = result.text
					finalStreamResultId = result.id
					if(finalStreamResultText[0]==='"') {
						finalStreamResultText
					}
				} else {
					alert('Unable to get a response block node')
				}

			}

			return

		}

		if(stream && streamIsDone) {
			finalStreamResultText = finalStreamResultText.trim()
			if(finalStreamResultText[0] === '"') {
				finalStreamResultText = finalStreamResultText.slice(1)
			}
			if(finalStreamResultText.slice(-1) === '"') {
				finalStreamResultText = finalStreamResultText.slice(0,-1)
			}
		}

		updBlock(
			{
				...aiResponseBlock,
				isLoading: stream && !streamIsDone && !chatGPTImitationMode
					? true
					: undefined,
				id: stream && !chatGPTImitationMode
					? finalStreamResultId
					: result
						? result.id
						: aiResponseBlock.id,
				content: stream && !chatGPTImitationMode
					? finalStreamResultText
					: result
						? result.text
						: aiResponseBlock.content,
			},
			true, // with refresh
			initialPageIndex,
			localeIndex,
			aiResponseBlockIndex
		)

	}


	// Initiate a request to AI.

	let aiResponse

	try {
		aiResponse = await askChatGPT({
			imitationMode: chatGPTImitationMode,
			prompt: finalPrompt,
			conversationId: initialBlock,
			apiKey: openAIApiKey,
			temperature: chatGPTTemperature,
			maxTokens: chatGPTMaxTokens,
			stream,
			onProgress: (result) => {
				updateResponseBlock(result, false)
			},
			onDone: () => {
				updateResponseBlock(false, true)
			}
		})
	} catch (error) {
		alert(error.message)
		onError()
	}

	if(chatGPTImitationMode || !stream) {
		updateResponseBlock(aiResponse)
	}

}