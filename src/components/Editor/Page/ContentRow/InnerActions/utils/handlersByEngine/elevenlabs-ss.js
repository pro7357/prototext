
import { textToSpeech } from 'globalUtils/ai/elevenlabs/elevenlabs'
import requestElectronApi from 'globalUtils/requestElectronApi'
import createBlock from 'editorUtils/createBlock'
import basicActionManager from '../basicActionManager'


export default async props => {

	basicActionManager({
		...props,
		processData: async props => {

			const {
				config,
				prompt,
				onError
			} = props

			const {
				elevenlabsSsApiKey,
				elevenlabsSsVoiceId,
				elevenlabsSsVoiceStability,
				elevenlabsSsVoiceSimilarityBoost,
			} = config

			if(!prompt) {
				return onError('No text.')
			}


			// Initiate a request to the Elevenlabs API.

			let speech
			try {

				speech = await textToSpeech({
					apiKey: elevenlabsSsApiKey,
					voiceId: elevenlabsSsVoiceId,
					voiceStability: elevenlabsSsVoiceStability,
					voiceSimilarityBoost: elevenlabsSsVoiceSimilarityBoost,
					text: prompt
				})

			} catch (error) {
				return onError(error.message)
			}

			if(!speech) {
				return onError('No response.')
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
				console.log(error.message)
			}

			if(!filePath) {
				return onError('Unable to save audio file.')
			}

			// Return a new card with the attached audio file.
			// With the initial prompt as a text description.
			return createBlock(
				prompt,
				{
					style: 8,
					link: { filePath }
				}
			)

		}
	})

}