
import { askChatGPT } from 'globalUtils/ai/openai/chatGPT'
import basicActionManager from '../basicActionManager'
import updateResponseCardsInStreamMode from '../updateResponseCardsInStreamMode'
import sleep from 'globalUtils/sleep'


export default async props => {

	basicActionManager({
		...props,
		stream: true,
		processData: async props => {

			const {
				config, // action config
				prompt, // final prompt,
				block,
				responseBlock,
				responsePageIndex,
				responseBlockIndex,
				sharedEditorProps,
				onError
			} = props

			const {
				openaiGptApiKey,
				openaiGptModel,
				openaiGptTokensLimit,
				openaiGptTemperature,
				openaiGptSplitResponse
			} = config

			// A timeout for debugging.
			// await sleep(2000)

			await askChatGPT({
				prompt,
				apiKey: openaiGptApiKey,
				modelId: openaiGptModel,
				limitTokens: openaiGptTokensLimit,
				temperature: openaiGptTemperature,
				stream: true,
				onProgress: result => {
					if(result) {
						updateResponseCardsInStreamMode({
							sharedEditorProps,
							responsePageIndex,
							responseBlockIndex,
							streamIsDone: false,
							result,
						})
					}
				},
				onDone: result => {
					if(result) {
						// Add the last stream message.
						updateResponseCardsInStreamMode({
							streamIsDone: false,
							result,
						})
					}
					// Save result in the redux state.
					updateResponseCardsInStreamMode({
						streamIsDone: true,
						responsePageIndex,
						responseBlockIndex,
						responseBlock,
						splitResponse: openaiGptSplitResponse
					})
				},
				onError
			})

		}
	})

}