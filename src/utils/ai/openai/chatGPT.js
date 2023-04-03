
import sleep from 'globalUtils/sleep'
import requestElectronApi from 'globalUtils/requestElectronApi'

import { getApiInstance } from './openai'

const models = {
	byId: {
		'text-davinci-003': {
			title: 'GPT-3.5 (text-davinci-003)',
			maxTokens: 4000
		},
		'gpt-3.5-turbo': {
			title: 'GPT-3.5 Turbo',
			maxTokens: 4000
		},
		'gpt-4': {
			title: 'GPT-4',
			maxTokens: 8000
		},
		'gpt-4-0314': {
			title: 'gpt-4-0314',
			maxTokens: 8000
		},
		'gpt-4-32k': {
			title: 'GPT-4 32K',
			maxTokens: 32000
		},
		'gpt-4-32k-0314': {
			title: 'gpt-4-32k-0314',
			maxTokens: 32000
		}
	},
	allIds: [
		'text-davinci-003',
		'gpt-3.5-turbo',
		'gpt-4',
		// 'gpt-4-0314',
		'gpt-4-32k',
		// 'gpt-4-32k-0314'
	]
}


const askChatGPT = async (props) => {

	const defModelId = models.allIds[0]

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
		onDone
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

		if (imitationMode) {
			await sleep(2000)
			completion = require('./demo/chatGPTResponse').default
		} else {

			const model = models.byId[modelId]
			const modelMaxTokes = model.maxTokens
			const isChatFormat = modelId !== defModelId

			let allowedTokenNumber = limitTokens || modelMaxTokes

			let promptTokensNumber = isDesktopBuild
				? await requestElectronApi(
					'calculateGPTTokens',
					prompt
				)
				: prompt / 4

			console.log('promptTokensNumber',promptTokensNumber)

			if((allowedTokenNumber + promptTokensNumber) > modelMaxTokes) {
				allowedTokenNumber = Math.floor(modelMaxTokes - promptTokensNumber)
			}

			if(isChatFormat) {
				// Exclude technical tokens in the message.
				// This is a rough temporary solution!
				allowedTokenNumber -= 10
			}

			console.log('allowedTokenNumber',allowedTokenNumber)

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
				text: (completion.data.choices[0].text || '').trim()
			}
		}

	} catch (error) {

		console.error(error.message)

		if (error.response) {

			let reqErrorMessage = error.message || ``
			let serviceErrorMessage = error.response.data &&
				error.response.data.error &&
				error.response.data.error.message || ``

			throw new Error(
				`${reqErrorMessage}. ${serviceErrorMessage}`
			)

		} else {
			throw new Error(error.message)
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
			console.error(error.message)
			console.log('Stream message',message)
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