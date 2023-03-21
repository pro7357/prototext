
import sleep from 'globalUtils/sleep'

import { getApiInstance } from './openai'

const askChatGPT = async (props) => {

	const {
		imitationMode,
		prompt,
		apiKey,
		conversationId = null, // Unrecognized request argument yet
		temperature = 0.6,
		maxTokens = 30,
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

			let streamOptions = (stream && onProgress) && {
				responseType: 'stream',
				onDownloadProgress: function (progressEvent) {
					let resultPart = extractTextFromChank(
						progressEvent.currentTarget.response,
						true
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

			completion = await apiInstance.createCompletion(
				{
					model: 'text-davinci-003',
					prompt,
					temperature,
					max_tokens: maxTokens,
					stream: Boolean(stream),
				},
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

		console.error(error)

		if (error.response) {
			throw new Error('ChatGPT. '+(error.message || (error.response.data && error.response.data.error && error.response.data.error.message)))
		} else {
			throw new Error(`ChatGPT. Error with OpenAI API request: ${error.message}`)
		}

	}

	return result

}


const extractTextFromChank = (data, stream) => {

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
			const completion = JSON.parse(message)
			text += (completion.choices[0].text || '')
			id = completion.id
		} catch (error) {
			console.log(error)
			throw new Error('ChatGPT. Could not parse stream message')
		}

	}

	return {
		id,
		text: text.trim(),
		isDone
	}

}


export { askChatGPT }