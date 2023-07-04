
const repo = 'https://bitbucket.org/svgsprite/prototext/src/master'

export default [

	{
		label: 'Text Generation',
		status: 'enabled',
		engine: 'openai-gpt',
		button: 'AI',
	},

	{
		label: 'Text Translation',
		status: 'enabled',
		engine: 'openai-translator',
		button: 'Translate'
	},

	{
		label: 'Speech Recognition',
		status: 'disabled',
		engine: 'openai-whisper',
		button: 'Speech-to-text',
	},

	{
		label: 'Speech Synthesis',
		status: 'disabled',
		engine: 'elevenlabs-ss',
		button: 'Text-to-speech'
	},

	{
		label: 'Custom API demo',
		status: 'disabled',
		engine: 'custom-api',
		button: '🤗',
		promptMode: 'single',
		customApiUrl: 'https://gradio-hello-world.hf.space/api/predict',
		customApiMethod: 'post',
		customApiRequestBody: `{"data": ["PROMPT"]}`,
		customApiResponseBodyHandler: `[{\n  TEXT: RESPONSE_BODY.data[0],\n  STYLE: 9\n}]`,
	},

	{
		label: 'Custom script demo',
		status: 'disabled',
		engine: 'custom-script',
		button: '📅',
		customScript: `TEXT += (TEXT ? '\\n' : '') +\nnew Date().toDateString();\nSTYLE = 5;`
	},

	{
		label: 'Conqui TTS. Local server',
		status: 'disabled',
		engine: 'custom-api',
		button: '🐸',
		promptMode: 'single',
		customApiUrl: 'http://localhost:5002/api/tts?text=PROMPT',
		customApiMethod: 'get',
		customApiResponseBodyHandler: `[{\n  TEXT: PROMPT,\n  FILE: RESPONSE_BODY,\n  FILE_EXT: 'wav'\n}]`,
		docs: repo+'/extras/coqui-tts/readme.md'
	},

	{
		label: 'LLaMA-cpp. Local server',
		status: 'disabled',
		engine: 'custom-api',
		button: '🦙',
		promptMode: 'single',
		customApiUrl: 'http://localhost:8000/v1/completions',
		customApiMethod: 'post',
		customApiRequestBody: `{"prompt":"###Instructions:PROMPT###Response:","stop": ["\\n","###"]}`,
		customApiResponseBodyHandler: `[{TEXT: RESPONSE_BODY.choices[0].text, STYLE: 9}]`,
		docs: repo+'/extras/llama-cpp/readme.md'
	}

]