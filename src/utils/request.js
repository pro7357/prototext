
export default async props => {

	let {
		url,
		method = 'get',
		body = null,
		headers = {},
		isFormData
	} = props

	let response
	let options = {}

	method = method.toLowerCase()

	if(method !== 'get') {

		options.body = isFormData || typeof body === 'string'
			? body
			: JSON.stringify(body)

		options.method = method

	}

	if (body) {
		if(!isFormData && !headers['Content-Type']) {
			headers['Content-Type'] = 'application/json'
		}
		if(!headers['Accept']) {
			headers['Accept'] = 'application/json'
		}
	}

	options.headers = headers

	try {

		response = await fetch(url, options)

		let contentType = response.headers.get('Content-Type')

		response = contentType === 'application/json'
			? await response.json()
			: await response.arrayBuffer()


	} catch (err) {
		console.log(err.message)
	}

	return response

}