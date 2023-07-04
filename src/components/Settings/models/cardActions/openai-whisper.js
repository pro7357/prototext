
import openaiGpt from './openai-gpt'

const displayCondition = {
	fieldId: 'engine',
	fieldValues: ['openai-whisper']
}

export default {
	byId: {

		openaiWhisperApiKey: {
			...openaiGpt.byId.openaiGptApiKey,
			displayCondition
		},

	},
	allIds: [
		'openaiWhisperApiKey',
	]
}