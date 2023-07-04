
import openaiGpt from './openai-gpt'

const displayCondition = {
	fieldId: 'engine',
	fieldValues: ['openai-translator']
}

export default {
	byId: {

		openaiTranslatorApiKey: {
			...openaiGpt.byId.openaiGptApiKey,
			displayCondition
		},

		openaiTranslatorModel: {
			...openaiGpt.byId.openaiGptModel,
			displayCondition
		},

		openaiTranslatorPrompt: {
			type: 'textarea',
			dataType: 'text',
			label: 'Translation prompt',
			keepInLS: true,
			defValue: 'Translate the following text into standard LANGUAGE_ID:\nORIGINAL_TEXT',
			hint: 'For example, ',
			hint: <div>
					Change or expand the standard translation prompt with any relevant contextual information.
				<div>
					<b>Format:</b> any text prompt and optionally included special variables within it.
				</div>
				<div>
					<b>Variables:</b>
				</div>
				<div>
					<div><span>LANGUAGE_ID</span> - target locale.</div>
					<div><span>ORIGINAL_TEXT</span> - text of the current card that needs to be translated.</div>
				</div>
				<div>
					<b>Example:</b>
				</div>
				<div>
					<div>
						{`The topic is politics in the 21st century. You are a satirical writer, use British sarcasm. Translate the following text into LANGUAGE_ID:\nORIGINAL_TEXT`}
					</div>
				</div>
				<div>
					<b>Note:</b> This action is only available in content localization mode. [CMD+3]
				</div>
			</div>,
			displayCondition
		},

	},
	allIds: [
		'openaiTranslatorApiKey',
		'openaiTranslatorModel',
		'openaiTranslatorPrompt',
	]
}