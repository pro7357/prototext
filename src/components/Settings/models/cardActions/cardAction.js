
import openaiGpt from './openai-gpt'
import openaiTranslator from './openai-translator'
import microsoftTranslator from './microsoft-translator'
import openaiWhisper from './openai-whisper'
import elevenlabsSs from './elevenlabs-ss'
import customApi from './custom-api'
import customScript from './custom-script'

export default {
	byId: {

		label: {
			type: 'hidden',
			dataType: 'text',
			defValue: '',
			keepInLS: true,
		},

		status: {
			type: 'select',
			dataType: 'text',
			label: 'Status',
			keepInLS: true,
			defValue: 'disabled',
			options: [
				{label: 'Disabled', value: 'disabled'},
				{label: 'Enabled', value: 'enabled'},
			]
		},

		engine: {
			type: 'select',
			dataType: 'text',
			label: 'Engine',
			keepInLS: true,
			defValue: 'custom-api',
			options: [
				{
					label: 'Text generation by OpenAI',
					value: 'openai-gpt',
					outputContentType: 'text',
				},
				{
					label: 'Text translation by OpenAI',
					value: 'openai-translator',
					outputContentType: 'text',
				},
				{
					label: 'Text translation by Microsoft',
					value: 'microsoft-translator',
					outputContentType: 'text',
				},
				{
					label: 'Speech recognition by OpenAI',
					value: 'openai-whisper',
					outputContentType: 'audio',
				},
				{
					label: 'Speech synthesis by ElevenLabs',
					value: 'elevenlabs-ss',
					outputContentType: 'audio',
				},
				{
					label: 'Custom API endpoint',
					value: 'custom-api',
					outputContentType: 'any',
				},
				{
					label: 'Custom script',
					value: 'custom-script',
					outputContentType: 'any',
				},
			]
		},

		button: {
			label: 'Action button text or icon',
			type: 'input',
			dataType: 'text',
			defValue: '🧩',
			keepInLS: true,
		},

		promptMode: {
			type: 'select',
			dataType: 'text',
			label: 'Prompt mode',
			keepInLS: true,
			defValue: 'duo',
			options: [
				{label: 'Single mode. The current card only.', value: 'single'},
				{label: 'Duo mode. Two cards combination.', value: 'duo'},
			],
			displayCondition: {
				fieldId: 'engine',
				fieldValues: ['openai-gpt','custom-api'],
			},
		},

		docs: {
			label: 'Docs',
			type: 'input',
			dataType: 'text',
			displayAsLink: true,
			defValue: '',
			keepInLS: true,
			displayCondition: {
				fieldId: 'engine',
				fieldValues: ['custom-api','custom-script'],
			},
		},

		...openaiGpt.byId,
		...openaiWhisper.byId,
		...openaiTranslator.byId,
		...microsoftTranslator.byId,
		...elevenlabsSs.byId,
		...customApi.byId,
		...customScript.byId,

	},
	allIds: [
		'label',
		'engine',
		'status',
		'button',
		'promptMode',
		...openaiGpt.allIds,
		...openaiWhisper.allIds,
		...openaiTranslator.allIds,
		...microsoftTranslator.allIds,
		...elevenlabsSs.allIds,
		...customApi.allIds,
		...customScript.allIds,
		'docs',
	],
	blankIds: [
		'engine',
	]
}