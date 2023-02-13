
const fsPromises = require('fs').promises

// Create a directory if it does not exist.
module.exports = async (path) => {
	await fsPromises.access(path)
		.catch(async e => {
			if (e.code === 'ENOENT') {
				await fsPromises.mkdir(path, {recursive: true})
			}
		})
}