
import Link from 'sharedComponents/Link'
import { listVoices } from 'globalUtils/ai/elevenlabs/elevenlabs'

export default {
	byId: {

		isOpenAIEnabled: {
			type: 'select',
			dataType: 'text',
			label: 'Status',
			keepInLS: true,
			defValue: 'yes',
			options: [
				{label: 'Disabled', value: 'no'},
				{label: 'Enabled', value: 'yes'},
			]
		},

		openAIApiKey: {
			type: 'input',
			dataType: 'password',
			label: 'API Key',
			defValue: '',
			keepInLS: true,
			hint: (
				<Link isExternal url='https://platform.openai.com/account/api-keys'>
					Get the key
				</Link>
			)
		},

		chatGPTTemperature: {
			type: 'input',
			dataType: 'number',
			label: 'ChatGPT Temperature',
			defValue: 0.6,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Higher values means the model will take more risks. Try 0.9 for more creative applications, and 0 for ones with a well-defined answer.'
		},

		chatGPTMaxTokens: {
			type: 'input',
			dataType: 'number',
			label: 'ChatGPT Max Tokens',
			defValue: 1024,
			max: 4096,
			min: 1,
			step: 1,
			keepInLS: true,
			hint: 'The maximum number of tokens to generate in the completion (1-4096). A helpful rule of thumb is that one token generally corresponds to ~4 characters of text for common English text. This translates to roughly ¾ of a word (so 100 tokens ~= 75 words).'
		},

		isElevenlabsEnabled: {
			type: 'select',
			dataType: 'text',
			label: 'Status',
			keepInLS: true,
			defValue: 'no',
			options: [
				{label: 'Disabled', value: 'no'},
				{label: 'Enabled', value: 'yes'},
			]
		},

		elevenlabsApiKey: {
			type: 'input',
			dataType: 'password',
			label: 'API Key',
			defValue: '',
			keepInLS: true,
			hint: (
				<Link isExternal url='https://beta.elevenlabs.io/subscription'>
					Get the key
				</Link>
			)
		},

		elevenlabsVoiceId: {
			label: 'Voice',
			keepInLS: true,
			type: 'select',
			dataType: 'text',
			defValue: '21m00Tcm4TlvDq8ikWAM',
			getOptions: async () => {
				let premadeVoices = await listVoices({ premadeOptionsMode: true })
				return premadeVoices.map(voice => {
					return {
						label: voice.name,
						value: voice.voice_id,
						preview: voice.preview_url
					}
				})
			}
		},

		elevenlabsVoiceStability: {
			type: 'input',
			dataType: 'number',
			label: 'Voice Stability',
			defValue: 0.75,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Increasing the value will make the voice more stable and consistent. Decreasing the value will make the voice more expressive and varied.'
		},

		elevenlabsVoiceSimilarityBoost: {
			type: 'input',
			dataType: 'number',
			label: 'Voice Clarity + Similarity Enhancement',
			defValue: 0.75,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Adjust this parameter if you notice background artifacts in generated speech.'
		},

	},
	allIds: [
		'isOpenAIEnabled',
		'openAIApiKey',
		'chatGPTTemperature',
		'chatGPTMaxTokens',
		'isElevenlabsEnabled',
		'elevenlabsApiKey',
		'elevenlabsVoiceId',
		'elevenlabsVoiceStability',
		'elevenlabsVoiceSimilarityBoost'
	],
	byGroups: [
		{
			label: 'Integration of ChatGPT by OpenAI',
			content: [
				'isOpenAIEnabled',
				'openAIApiKey',
				'chatGPTTemperature',
				'chatGPTMaxTokens',
			]
		},
		{
			label: 'Integration of Speech Synthesis by ElevenLabs',
			content: [
				'isElevenlabsEnabled',
				'elevenlabsApiKey',
				'elevenlabsVoiceId',
				'elevenlabsVoiceStability',
				'elevenlabsVoiceSimilarityBoost'
			]
		},
		// {
		// 	label: 'Design preferences',
		// 	content: [

		// 	]
		// },
	]
}