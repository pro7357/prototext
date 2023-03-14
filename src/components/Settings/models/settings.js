
import Link from 'sharedComponents/Link'

export default {
	byId: {

		openAIApiKey: {
			type: 'input',
			dataType: 'password',
			label: 'OpenAI API Key',
			defValue: '',
			keepInLS: true,
			hint: (
				<Link isExternal url='https://platform.openai.com/account/api-keys'>
					Create a new key
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

	},
	allIds: [
		'openAIApiKey',
		'chatGPTTemperature',
		'chatGPTMaxTokens',
	],
	byGroups: [
		{
			label: 'Integrations',
			content: [
				'openAIApiKey',
				'chatGPTTemperature',
				'chatGPTMaxTokens',
			]
		},
		// {
		// 	label: 'Design preferences',
		// 	content: [

		// 	]
		// },
	]
}