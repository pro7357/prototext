
import { lsGet, lsSet, lsDel } from 'globalUtils/ls'


export default initialState => {

	const migrations = [
		before_1_9_0,
		// from_1_9_0_to_2_0_0
	]

	try {

		migrations.forEach(migrate => {
			initialState = migrate(initialState) || initialState
		})

	} catch (error) {
		console.log('Settings migration error', error.message)
	}

	lsSet('appVersion', APP_VERSION)

	return initialState

}


const before_1_9_0 = state => {

	let openAIApiKey = lsGet('openAIApiKey', true)
	let elevenlabsApiKey = lsGet('elevenlabsApiKey', true)

	if(!openAIApiKey && !elevenlabsApiKey) {
		return
	}

	const intialCardActionsState = require(
		'../components/Settings/models/cardActions/intialState'
	).default

	let chatGPTModelId = lsGet('chatGPTModelId', true)
	let chatGPTTemperature = lsGet('chatGPTTemperature', true)
	let chatGPTLimitTokens = lsGet('chatGPTLimitTokens', true)

	let isElevenlabsEnabled = lsGet('isElevenlabsEnabled', true)
	let elevenlabsVoiceId = lsGet('elevenlabsVoiceId', true)

	state.settings = state.settings || {}

	state.settings.cardActions = intialCardActionsState.reduce((done,cur,index) => {

		if(cur.engine === 'openai-gpt') {
			cur.openaiGptApiKey = openAIApiKey
			cur.openaiGptModel = chatGPTModelId
			cur.openaiGptTemperature = chatGPTTemperature
			cur.openaiGptTokensLimit = chatGPTLimitTokens
		} else if(cur.engine === 'openai-translator') {
			cur.openaiTranslatorApiKey = openAIApiKey
			cur.openaiTranslatorModel = chatGPTModelId
		} else if(cur.engine === 'openai-whisper') {
			cur.openaiWhisperApiKey = openAIApiKey
		} else if(cur.engine === 'elevenlabs-ss') {
			cur.status = isElevenlabsEnabled === 'yes' ? 'enabled' : 'disabled'
			cur.elevenlabsSsApiKey = elevenlabsApiKey
			cur.elevenlabsSsVoiceId = elevenlabsVoiceId
		}

		return done.concat(cur)

	}, [])

	lsSet(
		'cardActions',
		state.settings.cardActions,
		true
	)

	lsDel('isOpenAIEnabled')
	lsDel('openAIApiKey')
	lsDel('chatGPTModelId')
	lsDel('chatGPTTemperature')
	lsDel('chatGPTLimitTokens')
	lsDel('chatGPTMaxTokens')

	lsDel('localizationEngine')

	lsDel('isElevenlabsEnabled')
	lsDel('elevenlabsApiKey')
	lsDel('elevenlabsVoiceId')

	return state

}


// const from_1_9_0_to_2_0_0 = state => state