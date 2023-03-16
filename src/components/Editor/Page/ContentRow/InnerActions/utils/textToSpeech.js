
import { store } from 'store'
import { textToSpeech } from 'globalUtils/ai/elevenlabs/elevenlabs'
import requestElectronApi from 'globalUtils/requestElectronApi'
import createBlock from 'editorUtils/createBlock'
import { updBlock, addBlock, deleteBlock } from 'editorActions'


export default async props => {

	const {
		pageIndex,
		blockIndex
	} = props

	const state = store.getState()
	const documentFilePath = state.filePath

	if(isDesktopBuild && !documentFilePath) {
		alert(`Save this document before using the speech synthesis function. This is necessary for the program to attach the generated audio files near the saved document in the 'assets' folder.`)
		return
	}

	const appSettings = state.settings
	const localeIndex = 0
	const block = state.editor.content[pageIndex].content[localeIndex].content[blockIndex]

	const apiKey = appSettings.elevenlabsApiKey
	const voiceId = appSettings.elevenlabsVoiceId
	const voiceStability = appSettings.elevenlabsVoiceStability
	const voiceSimilarityBoost = appSettings.elevenlabsVoiceSimilarityBoost
	let text = (block.content?block.content.trim():'') || 'Hello'


	// Create a new block for the future response.
	const aiResponseBlockIndex = blockIndex + 1
	const aiResponseBlock = createBlock(
		'Loading. Please wait...',
		{
			style: 5,
			isLoading: true
		}
	)

	addBlock(
		aiResponseBlock,
		aiResponseBlockIndex
	)

	const onError = (message) => {
		// deleteBlock(aiResponseBlockIndex)
		updBlock(
			{
				...aiResponseBlock,
				isLoading: undefined,
				content: message || 'Something went wrong. Try again, please.',
			},
			true, // with refresh
			pageIndex,
			localeIndex,
			aiResponseBlockIndex
		)
		console.error(message)
	}


	// Initiate a request to Elevenlabs service.
	let speech
	try {
		speech = await textToSpeech({
			apiKey,
			voiceId,
			voiceStability,
			voiceSimilarityBoost,
			text
		})
	} catch (error) {
		return onError(error.message)
	}

	if(!speech) {
		return onError('No response')
	}


	// Save generated MP3 asset.

	let filePath
	try {
		filePath = await requestElectronApi(
			'saveGeneratedAsset',
			{
				data: speech,
				ext: 'mp3'
			}
		)
	} catch (error) {
		console.error(error)
	}

	if(!filePath) {
		return onError('Unable to save audio file.')
	}


	// Update the generated Asset block.
	updBlock(
		{
			...aiResponseBlock,
			isLoading: undefined,
			content: text,
			style: 8,
			link: {
				filePath: filePath
			}
		},
		true, // with refresh
		pageIndex,
		localeIndex,
		aiResponseBlockIndex
	)

}