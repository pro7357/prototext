
import { askChatGPT } from 'globalUtils/ai/openai/chatGPT'
import sanitizeLLMResponse from 'globalUtils/ai/sanitizeLLMResponse'
import translationActionManager from '../translationActionManager'


export default async props => {

	const {
		config,
		handleMissingApiKey,
		block: originalBlock,
	} = props

	const {
		openaiTranslatorApiKey,
		openaiTranslatorModel,
		openaiTranslatorPrompt
	} = config

	if(!openaiTranslatorApiKey) {
		return handleMissingApiKey()
	}

	if(!openaiTranslatorPrompt) {
		return
	}

	translationActionManager({
		...props,
		translate: async props => {

			const {
				originalText,
				dstLangName
			} = props

			let prompt = openaiTranslatorPrompt

			prompt = prompt.replaceAll(`LANGUAGE_ID`, dstLangName)
			prompt = prompt.replaceAll(`ORIGINAL_TEXT`, originalText)

			let translation = await askChatGPT({
				prompt,
				apiKey: openaiTranslatorApiKey,
				modelId: openaiTranslatorModel,
			})

			translation = translation && translation.text

			return sanitizeLLMResponse(translation)

		}
	})

}