
import { getApiInstance } from './openai'

const models = {
	byId: {
		'whisper-1': {
			title: 'Whisper-1',
		},
	},
	allIds: [
		'whisper-1',
	]
}

const speechToText = async props => {

	const defModelId = models.allIds[0]

	const {
		prompt,
		file,
		apiKey,
		modelId = defModelId,
		temperature = 0,
		limitTokens = 0,
	} = props


	const apiInstance = getApiInstance({
		apiKey,
	})

	let result = await apiInstance.createTranscription(
		file,
		modelId
	)

	return result && result.data && result.data.text

}


export {
	models,
	speechToText
}