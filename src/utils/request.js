
export default async props => {

	let {
		apiEndpoint,
		url,
		method,
		body = null,
		isFormData
	} = props

	let response
	let options = {}
	let headers = {}

	if(!url) {
		url = `/api/${apiEndpoint}`
	}

	if(method !== 'get') {
		options.body = isFormData ? body : JSON.stringify(body)
		options.method = method
	}

	if (body) {
		headers = {
			'Accept': 'application/json',
		}
		if(!isFormData){
			headers['Content-Type'] = 'application/json'
		}
	}

	options.headers = headers

	try {
		response = await fetch(url, options)
		response = await response.json()
	} catch (err) {
		console.log(err.message)
	}

	return response

}