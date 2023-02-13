
const saveFiles = require('./saveFiles')
const path = require('path')

// Save the app state as an external JSON file
module.exports = async (filePath, currentState) => {

	filePath = path.parse(filePath)

	let ext = 'ptxt'
	let name = filePath.name
	let dst = filePath.dir

	let isOk = await saveFiles(
		[
			{
				name,
				ext,
				data: currentState,
			}
		],
		dst
	)

	return isOk

}