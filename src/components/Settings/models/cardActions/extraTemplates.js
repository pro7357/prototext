
export default [

	{
		label: 'Elevenlabs. Custom demo',
		status: 'disabled',
		engine: 'custom-api',
		button: '11.ai-custom',
		promptMode: 'single',
		customApiUrl: 'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL',
		customApiMethod: 'post',
		customApiRequestHeaders: `{\n  "accept":"audio/*",\n  "xi-api-key":"REPLACE_ME"\n}`,
		customApiRequestBody: `{\n  "text": "PROMPT",\n  "voice_settings": {\n    "stability": 0.75,\n    "similarity_boost": 0.75\n  }\n}`,
		customApiResponseBodyHandler: `[{\n  TEXT: PROMPT,\n  FILE: RESPONSE_BODY,\n  FILE_EXT: 'mp3'\n}]`,
	},

	{
		label: 'HF. AnimeGAN',
		status: 'disabled',
		engine: 'custom-api',
		button: 'AnimeGAN',
		promptMode: 'single',
		customApiUrl: 'https://gradio-animeganv2.hf.space/run/predict',
		customApiMethod: 'post',
		customApiRequestBody: `{"data":["FILE_BASE64","version 2 (🔺 robustness,🔻 stylization)"]}`,
		customApiResponseBodyHandler: `[{\n  TEXT: 'AnimeGAN result',\n  FILE: RESPONSE_BODY.data[0],\n  FILE_EXT: 'png'\n}]`,
	},

	{
		label: 'HG. Neon TTS',
		status: 'disabled',
		engine: 'custom-api',
		button: 'Neon-TTS',
		promptMode: 'single',
		customApiUrl: 'https://gradio-neon-tts-plugin-coqui.hf.space/run/predict',
		customApiMethod: 'post',
		customApiRequestBody: `{"data":["PROMPT","en"]}`,
		customApiResponseBodyHandler: `[{TEXT: PROMPT, FILE_URL: 'https://gradio-neon-tts-plugin-coqui.hf.space/file='+RESPONSE_BODY.data[0].name, FILE_EXT: 'wav', NEED_TO_DOWNLOAD: true}]`,
	},

	{
		label: 'Normalize card text',
		status: 'disabled',
		engine: 'custom-script',
		button: 'Normalize',
		customScript: `TEXT = TEXT.split('. ').map(s => s.trim().charAt(0).toUpperCase() + s.slice(1)).join('. ') + '.';\nSTYLE = 0;`
	},

	{
		label: 'Whisper. Custom',
		status: 'disabled',
		engine: 'custom-api',
		button: 'Whisper-Custom',
		promptMode: 'single',
		customApiUrl: 'https://api.openai.com/v1/audio/transcriptions',
		customApiMethod: 'post',
		customApiRequestHeaders: `{"Authorization":"Bearer REPLACE_ME"}`,
		customApiRequestBody: `file=FILE,model=whisper-1`,
		customApiResponseBodyHandler: `[{\n  TEXT: RESPONSE_BODY.text,\n  STYLE: 9\n}]`,
	},

	{
		label: 'HF. Image classification',
		status: 'disabled',
		engine: 'custom-api',
		button: 'ImgClass',
		promptMode: 'single',
		sourceLink: 'https://huggingface.co/spaces/gradio/image_classification',
		customApiUrl: 'https://gradio-image-classification.hf.space/run/predict',
		customApiMethod: 'post',
		customApiRequestBody: `{"data":["FILE_BASE64"]}`,
		customApiResponseBodyHandler: `[{TEXT: RESPONSE_BODY.data[0].confidences.reduce((done,cur)=>{ return done += cur.label + '\\n' },'')}]`,
	},


]