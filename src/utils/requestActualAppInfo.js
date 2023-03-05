
import getUID from './getUID'

export default async props => {

	if(!isDesktopBuild) {
		// Demo data for the development mode.
		return {
			"versions": {
				"actual": "1.7.14",
				"archived": []
			}
		}
	}

	let refId = localStorage.getItem('instanceId')

	if(!refId) {
		refId = getUID()
		localStorage.setItem('instanceId',refId)
	}

	let url = `https://prototext.app/app-info.json?refVersion=${APP_VERSION}&refId=${refId}`

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