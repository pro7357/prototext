
import Link from 'sharedComponents/Link'
import { listVoices } from 'globalUtils/ai/elevenlabs/elevenlabs'
import { models as chatGPTModels } from 'globalUtils/ai/openai/chatGPT'

export default {
	byId: {

		autoSaveMode: {
			type: 'switch',
			dataType: 'boolean',
			keepInLS: true,
			defValue: false,
		},

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

		chatGPTModelId: {
			label: 'Model',
			keepInLS: true,
			type: 'select',
			dataType: 'text',
			defValue: chatGPTModels.allIds[0],
			getOptions: async () => {
				return chatGPTModels.allIds.map(modelId => {
					const model = chatGPTModels.byId[modelId]
					return {
						label: model.title,
						value: modelId
					}
				})
			},
			hint: 'Note that GPT-4 is only accessible to those who have been granted access.'
		},

		chatGPTLimitTokens: {
			type: 'input',
			dataType: 'number',
			label: 'Limit Tokens',
			defValue: 0,
			max: 32768,
			min: 0,
			step: 1,
			keepInLS: true,
			hint: 'Enter a number if you want to limit the length of requests to ChatGPT. Or keep "0" to use the maximum capabilities of the model.'
		},

		chatGPTTemperature: {
			type: 'input',
			dataType: 'number',
			label: 'Temperature',
			defValue: 0.6,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Try "0.9" for creative applications, "0" for ones with a well-defined answer.'
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

		localizationEngine: {
			type: 'select',
			dataType: 'text',
			label: 'Engine',
			keepInLS: true,
			defValue: 'mst',
			options: [
				{label: 'Microsoft Translator', value: 'mst'},
				{label: 'ChatGPT', value: 'cgpt'},
			]
		},

		localizationExtraContext: {
			type: 'textarea',
			dataType: 'text',
			displayCondition: {
				fieldId: 'localizationEngine',
				fieldValues: ['cgpt']
			},
			label: 'Extra Context',
			keepInLS: true,
			defValue: '',
			hint: 'Expand the standard translation prompt with any relevant contextual information. For example, "The topic is politics in the 21st century. You are a satirical writer, use British sarcasm."',
		}

	},
	allIds: [
		'autoSaveMode',
		'isOpenAIEnabled',
		'openAIApiKey',
		'chatGPTModelId',
		'chatGPTLimitTokens',
		'chatGPTTemperature',
		'isElevenlabsEnabled',
		'elevenlabsApiKey',
		'elevenlabsVoiceId',
		'elevenlabsVoiceStability',
		'elevenlabsVoiceSimilarityBoost',
		'localizationEngine',
		'localizationExtraContext',
	],
	byGroups: [
		{
			label: 'Integration of ChatGPT by OpenAI',
			content: [
				'isOpenAIEnabled',
				'openAIApiKey',
				'chatGPTModelId',
				'chatGPTLimitTokens',
				'chatGPTTemperature',
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
		{
			label: 'Content Localization',
			content: [
				'localizationEngine',
				'localizationExtraContext'
			]
		},
		// {
		// 	label: 'Design preferences',
		// 	content: [

		// 	]
		// },
	]
}