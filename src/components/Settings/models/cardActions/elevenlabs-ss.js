
import Link from 'sharedComponents/Link'
import { listVoices } from 'globalUtils/ai/elevenlabs/elevenlabs'

const displayCondition = {
	fieldId: 'engine',
	fieldValues: ['elevenlabs-ss']
}

export default {
	byId: {

		elevenlabsSsApiKey: {
			type: 'input',
			dataType: 'text',
			label: 'API Key',
			defValue: '',
			keepInLS: true,
			isRequired: true,
			hint: (
				<Link isExternal url='https://beta.elevenlabs.io/subscription'>
					Get the key
				</Link>
			),
			displayCondition
		},

		elevenlabsSsVoiceId: {
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
			},
			displayCondition
		},

		elevenlabsSsVoiceStability: {
			type: 'input',
			dataType: 'number',
			label: 'Voice Stability',
			defValue: 0.75,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Increasing the value will make the voice more stable and consistent. Decreasing the value will make the voice more expressive and varied.',
			displayCondition
		},

		elevenlabsSsVoiceSimilarityBoost: {
			type: 'input',
			dataType: 'number',
			label: 'Voice Clarity + Similarity Enhancement',
			defValue: 0.75,
			max: 1,
			min: 0,
			step: 0.1,
			keepInLS: true,
			hint: 'Adjust this parameter if you notice background artifacts in generated speech.',
			displayCondition
		},

	},
	allIds: [
		'elevenlabsSsApiKey',
		'elevenlabsSsVoiceId',
		'elevenlabsSsVoiceStability',
		'elevenlabsSsVoiceSimilarityBoost',
	]
}