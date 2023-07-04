
import normalizeFilePath from 'globalUtils/normalizeFilePath'
import { speechToText } from 'globalUtils/ai/openai/whisper'
import createBlock from 'editorUtils/createBlock'
import basicActionManager from '../basicActionManager'


export default async props => {

	basicActionManager({
		...props,
		processData: async props => {

			const {
				sharedEditorProps,
				config,
				prompt,
				block,
				onError
			} = props

			const {
				openaiWhisperApiKey
			} = config


			// STEP 1
			// Get full path of the attached audio file.

			let filePath = block.link && block.link.filePath

			if(!filePath) {
				return onError('No audio file.')
			}

			if(filePath[0] === '.') {
				filePath = normalizeFilePath(filePath, sharedEditorProps.currentDoc)
			}

			console.log('filePath',filePath)


			// STEP 2
			// Read the file data.

			let speech

			try {

				let mediaBlob = await fetch(filePath)
    				.then(response => response.blob())

				speech = new File(
					[mediaBlob],
					'speech.mp3',
					{ type: 'audio/mpeg' },
				)

			} catch (error) {
				return onError(error.message)
			}

			if(!speech) {
				return onError('No response.')
			}


			// STEP 3
			// Pass audio data to OpenAI service to transcript.
			let text
			try {
				text = await speechToText({
					file: speech,
					apiKey: openaiWhisperApiKey
				})
			} catch (error) {
				return onError(error.message)
			}

			if(!text) {
				return onError('No transcription.')
			}

			// STEP 4
			// Update the response card with recognized text.
			return createBlock(
				text,
				{
					style: 9,
				}
			)

		}
	})

}