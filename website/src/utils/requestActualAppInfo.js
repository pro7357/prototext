
export default async props => {

	if(!isBuild) {
		// Demo data for the development mode.
		return {
			"versions": {
				"actual": "1.7.0",
				"archived": []
			}
		}
	}

	let url = `https://prototext.app/app-info.json`

	let options = {
		method: 'get'
	}

	let response

	try {
		response = await fetch(url, options)
		response = await response.json()
	} catch (err) {
		console.log(err.message)
		return
	}

	if(!response) {
		console.log('No response')
		return
	}

	return response

}