
import Link from 'sharedComponents/Link'

const displayCondition = {
	fieldId: 'engine',
	fieldValues: ['custom-api']
}

const PROMPT = () => (
	<div>
		<span>PROMPT</span> - text of the current card or combo of two target cards.
	</div>
)

const ID = () => <div><span>ID</span> - id of the current card.</div>
const STYLE = () => <div><span>STYLE</span> - style of the current card.</div>

export default {
	byId: {

		customApiUrl: {
			type: 'input',
			dataType: 'text',
			label: 'Request URL (API\'s endpoint)',
			defValue: '',
			keepInLS: true,
			isRequired: true,
			hint: <div>
				<div>
					Define the target API endpoint and optionally embed data from the current card using special variables.
				</div>
				<div>
					<b>Format:</b> <span>URL.</span>
				</div>
				<div>
					<b>Variables:</b>
				</div>
				<div>
					<PROMPT/>
					<ID/>
					<STYLE/>
				</div>
				<div>
					<b>Examples:</b>
				</div>
				<div>
					<div>{`http://localhost:5002/api/tts?text=PROMPT`}</div>
					<Link isExternal url='https://huggingface.co/spaces/gradio/hello_world'>
						https://gradio-hello-world.hf.space/run/predict
					</Link>
				</div>

			</div>,
			displayCondition
		},

		customApiMethod: {
			label: 'Request method',
			type: 'select',
			dataType: 'text',
			keepInLS: true,
			defValue: 'get',
			options: [
				{label: 'GET', value: 'get'},
				{label: 'POST', value: 'post'},
			],
			displayCondition
		},

		customApiRequestHeaders: {
			label: 'Request headers',
			type: 'textarea',
			dataType: 'text',
			keepInLS: true,
			defValue: ``,
			displayCondition: {
				fieldId: 'method',
				fieldValues: ['post']
			},
			hint: <div>
				<div>
					<b>Format:</b>
				</div>
				<div>
					<span>JSON</span>: {`{ "key":"val", "key":"val" }`}
				</div>
				<div>
					<b>Example:</b>
				</div>
				<div>
					{`{"Authorization": "Bearer your-api-token-here"}`}
				</div>
			</div>,
			displayCondition
		},

		customApiRequestBody: {
			label: 'Request body',
			type: 'textarea',
			dataType: 'text',
			keepInLS: true,
			// defValue: `{ "data": "PROMPT" }`,
			defValue: '',
			displayCondition: {
				fieldId: 'method',
				fieldValues: ['post']
			},
			hint: <div>
				<div>
					Describe how to pass data from the target card(s) to the request body.
				</div>
				<div>
					<b>Formats:</b>
				</div>
				<div>
					1. <span>JSON</span>: {`{ "key":"val", "key":"val" }`}
				</div>
				<div>
					2. <span>Form data</span>: key=val,key=val
				</div>
				<div>
					<b>Variables:</b>
				</div>
				<div>
					<PROMPT/>
					<ID/>
					<STYLE/>
					<div><span>FILE</span> or <span>FILE_BASE64</span> - data of the current card file as a standard File API object or base64 string.</div>
				</div>
				<div>
					<b>Examples:</b>
				</div>
				<div>
					<div>{`{ "data": "PROMPT" }`}</div>
					<div>{`{ "data": "FILE_BASE64" }`}</div>
					<div>{`file=FILE, model=your-model-id`}</div>
				</div>
				</div>,
			displayCondition
		},

		customApiResponseBodyHandler: {
			label: 'Response body handler',
			type: 'textarea',
			dataType: 'text',
			keepInLS: true,
			isRequired: true,
			defValue: `[{\n  TEXT: PROMPT,\n  FILE: RESPONSE_BODY,\n  FILE_EXT: 'jpg'\n}]`,
			hint: <div>
				<div>
					Describe how to extract data from the server response to create new card(s)
				</div>
				<div>
					<b>Format:</b>
				</div>
				<div>
					<span>
						JS array of new card objects or a function that returns such an array
					</span>:
					<div>
						{`[{\n  TEXT: RESPONSE_BODY.text,\n  STYLE: RESPONSE_BODY.style\n}]`}
					</div>
				</div>
				<div>
					<b>Variables:</b>
				</div>
				<div>
					<div><span>RESPONSE_BODY</span> - this is the output variable that can be a JSON object or an ArrayBuffer, depending on the response content type.</div>
					<div><span>PROMPT</span> - initial text prompt.</div>
					<div><span>TEXT</span> - new card text content.</div>
					<div><span>STYLE</span> - new card style.</div>
					<div><span>FILE</span> - response file data that will be saved automatically as a new local asset.</div>
					<div><span>FILE_URL</span> - response file URL. It is an alternative way when the response does not contain file data.</div>
					<div><span>NEED_TO_DOWNLOAD</span> - boolean variable to download the file via FILE_URL.</div>
					<div><span>FILE_EXT</span> - final asset extension.</div>
				</div>
				<div>
					<b>Examples:</b>
				</div>
				<div>
					<div>
						{`[{\nTEXT: PROMPT, FILE: RESPONSE_BODY, FILE_EXT: 'mp3'\n}]`}
					</div>
					<div>
						{`[{\nTEXT: PROMPT, FILE_URL: 'https://gradio-neon-tts-plugin-coqui.hf.space/file='+RESPONSE_BODY.data[0].name, FILE_EXT: 'wav', NEED_TO_DOWNLOAD: true\n}]`}
					</div>
				</div>
			</div>,
			displayCondition
		},

	},
	allIds: [
		'customApiUrl',
		'customApiMethod',
		'customApiRequestHeaders',
		'customApiRequestBody',
		'customApiResponseBodyHandler'
	]
}