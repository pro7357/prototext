
const apiRootUrl = `https://api.elevenlabs.io/v1`


const requestApi = async props => {

	const {
		apiKey,
		endpoint,
	} = props

	let body = props.body || null

	if(!apiKey) {
		throw new Error('Elevenlabs API key not configured.')
	}

	let options = {}
	let method = 'get'
	let headers = {
		'Accept': 'application/json',
		'xi-api-key': apiKey
	}

	if(body) {
		method = 'post'
		body = JSON.stringify(body)
		headers['Accept'] = 'audio/mpeg'
		headers['Content-Type'] = 'application/json'
	}

	options.headers = headers
	options.method = method
	options.body = body

	let response = await fetch(
		`${apiRootUrl}/${endpoint}`,
		options
	)

	return response

}


const listVoices = async props => {

	const {
		apiKey,
		premadeOptionsMode
	} = props

	if(premadeOptionsMode) {
		return require('./premadeVoices').default
	}

	let voices = await requestApi({
		endpoint: 'voices',
		apiKey
	})

	return voices

}


const textToSpeech = async props => {

	const {
		apiKey,
		voiceId,
		voiceStability,
		voiceSimilarityBoost,
		text,
	} = props

	let response = await requestApi({
		endpoint: `text-to-speech/${voiceId}`,
		apiKey,
		body: {
			text,
			voice_settings: {
				stability: voiceStability,
				similarity_boost: voiceSimilarityBoost
			}
		}
	})

	if(!response || response.status !== 200) {
		throw new Error('Unable to get response from the service')
	}

	let speechBuffer = await response.arrayBuffer()

	return speechBuffer

}


export {
	listVoices,
	textToSpeech
}