
import sleep from 'globalUtils/sleep'
import requestElectronApi from 'globalUtils/requestElectronApi'

import { getApiInstance } from './openai'

const models = {
	byId: {
		'text-davinci-003': {
			title: 'Text Davinci',
			maxTokens: 4000
		},
		'gpt-3.5-turbo': {
			title: 'GPT-3.5 Turbo - Default',
			maxTokens: 4000,
			isChatFormat: true
		},
		'gpt-3.5-turbo-16k': {
			title: 'GPT-3.5 Turbo 16K',
			maxTokens: 16000,
			isChatFormat: true
		},
		'gpt-4': {
			title: 'GPT-4',
			maxTokens: 8000,
			isChatFormat: true
		},
		'gpt-4-32k': {
			title: 'GPT-4 32K',
			maxTokens: 32000,
			isChatFormat: true
		},
	},
	allIds: [
		'text-davinci-003',
		'gpt-3.5-turbo',
		'gpt-3.5-turbo-16k',
		'gpt-4',
		'gpt-4-32k',
	],
	defId: 'gpt-3.5-turbo'
}


const askChatGPT = async (props) => {

	const defModelId = models.defId

	const {
		imitationMode,
		prompt,
		apiKey,
		// conversationId = null, // Unrecognized request argument yet
		modelId = defModelId,
		temperature = 0.6,
		limitTokens = 0,
		stream,
		onProgress,
		onDone,
		onError
	} = props

	if (!apiKey) {
		throw new Error('ChatGPT. OpenAI API key not configured.')
	}

	const apiInstance = getApiInstance({
		apiKey,
		imitationMode,
	})

	if (!imitationMode && !apiInstance) {
		throw new Error('ChatGPT. Unable to get OpenAI API instance.')
	}

	let result

	try {

		let completion
		const model = models.byId[modelId]
		const isChatFormat = model.isChatFormat

		if (imitationMode) {
			await sleep(2000)
			completion = require('./demo/chatGPTResponse').default
		} else {

			const modelMaxTokes = model.maxTokens

			let allowedTokenNumber = limitTokens || modelMaxTokes

			let promptTokensNumber = isDesktopBuild
				? await requestElectronApi(
					'calculateGPTTokens',
					prompt
				)
				: Math.floor(prompt.length / 4) || 1

			console.log('promptTokensNumber',promptTokensNumber)

			if((allowedTokenNumber + promptTokensNumber) > modelMaxTokes) {
				allowedTokenNumber = Math.floor(modelMaxTokes - promptTokensNumber)
			}

			if(isChatFormat) {
				// Exclude technical tokens in the message.
				// This is a rough temporary solution!
				allowedTokenNumber -= 10
			}

			// console.log('allowedTokenNumber',allowedTokenNumber)

			let streamOptions = (stream && onProgress) && {
				responseType: 'stream',
				onDownloadProgress: function (progressEvent) {
					let resultPart = extractTextFromChank(
						progressEvent.currentTarget.response,
						isChatFormat
					)
					if(resultPart.isDone) {
						onDone(resultPart)
					} else {
						onProgress(
							resultPart
						)
					}
				}
			}

			let completionOptions = {
				model: modelId,
				temperature,
				max_tokens: allowedTokenNumber,
				stream: Boolean(stream),
			}

			if(isChatFormat) {
				completionOptions.messages = [{role: 'user', content: prompt}]
			} else {
				completionOptions.prompt = prompt
			}

			completion = await apiInstance[
				isChatFormat ? 'createChatCompletion' : 'createCompletion'
			](
				completionOptions,
				streamOptions
			)

		}

		if(imitationMode || !stream) {
			result = {
				id: completion.data.id,
				text: isChatFormat
					? (completion.data.choices[0].message.content || '').trim()
					: (completion.data.choices[0].text || '').trim()
			}
		}

	} catch (error) {

		if (error.response) {

			let reqErrorMessage = error.message || ``
			let serviceErrorMessage = error.response.data &&
				error.response.data.error &&
				error.response.data.error.message || ``

			onError(
				`${reqErrorMessage}. ${serviceErrorMessage}`
			)

		} else {
			onError(error.message)
		}

	}

	return result

}


const extractTextFromChank = (data, isChatFormat) => {

	const lines = data
		.toString()
		.split('\n')
		.filter((line) => line.trim() !== '')

	let text = ''
	let id
	let isDone

	for (const line of lines) {

		let message = line.replace(/^data: /, '')

		if (message === '[DONE]') {
			isDone = true
			break
		}

		try {
			message = message.replaceAll(/\n/g,'\\n')
			if(message && message[0] === '{' && message.slice(-1) === '}') {
				let completion = JSON.parse(message)
				text += (
					isChatFormat
						? completion.choices[0].delta.content || ''
						: completion.choices[0].text || ''
				)
				id = completion.id
			}
		} catch (error) {
			throw new Error('Could not parse stream message.')
		}

	}

	return {
		id,
		text: text ? text.trim() : '',
		isDone
	}

}


export {
	models,
	askChatGPT
}