
import { Configuration, OpenAIApi } from 'openai'

let apiInstance

const getApiInstance = props => {

	if(apiInstance) {
		return apiInstance
	}

	const {
		apiKey,
	} = props

	const configuration = new Configuration({
		apiKey
	})

	apiInstance = apiKey && new OpenAIApi(configuration)

	return apiInstance

}

export {
	getApiInstance,
}