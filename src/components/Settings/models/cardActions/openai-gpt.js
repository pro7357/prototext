
import Link from 'sharedComponents/Link'
import { models as GPTModels } from 'globalUtils/ai/openai/chatGPT'

const displayCondition = {
	fieldId: 'engine',
	fieldValues: ['openai-gpt']
}

export default {
	byId: {

		openaiGptApiKey: {
			type: 'input',
			dataType: 'text',
			label: 'API Key',
			defValue: '',
			keepInLS: true,
			isRequired: true,
			hint: (
				<Link isExternal url='https://platform.openai.com/account/api-keys'>
					Get the key
				</Link>
			),
			displayCondition
		},

		openaiGptModel: {
			label: 'Model',
			keepInLS: true,
			type: 'select',
			dataType: 'text',
			defValue: GPTModels.defId,
			getOptions: async () => {
				return GPTModels.allIds.map(modelId => {
					const model = GPTModels.byId[modelId]
					return {
						label: model.title,
						value: modelId
					}
				})
			},
			hint: 'Note that GPT-4 is only accessible to those who have been granted access.',
			displayCondition
		},

		openaiGptTokensLimit: {
			type: 'input',
			dataType: 'number',
			label: 'Limit Tokens',
			defValue: 0,
			max: 32768,
			min: 0,
			step: 1,
			keepInLS: true,
			hint: 'Enter a number if you want to limit the length of requests to ChatGPT. Or keep "0" to use the maximum capabilities of the model.',
			displayCondition
		},

		openaiGptTemperature: {
			type: 'input',
			dataType: 'number',
			label: 'Temperature',
			defValue: 0.6,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Try "0.9" for creative applications, "0" for ones with a well-defined answer.',
			displayCondition
		},

		openaiGptSplitResponse: {
			label: 'Split the response by new lines?',
			type: 'select',
			dataType: 'text',
			keepInLS: true,
			defValue: 'no',
			options: [
				{label: 'No. Keep response in one card', value: 'no'},
				{label: 'Yes. Create set of new cards', value: 'yes'},
			],
			displayCondition
		},

	},
	allIds: [
		'openaiGptApiKey',
		'openaiGptModel',
		'openaiGptTokensLimit',
		'openaiGptTemperature',
		'openaiGptSplitResponse',
	]
}