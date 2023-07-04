
import { Configuration, OpenAIApi } from 'openai'

class CustomFormData extends FormData {
	getHeaders() {
		 return {}
	}
}

const getApiInstance = props => {

	const {
		apiKey,
	} = props

	const configuration = new Configuration({
		apiKey,
		formDataCtor: CustomFormData
	})

	return apiKey && new OpenAIApi(configuration)

}

export {
	getApiInstance,
}