
const fsPromises = require('fs').promises

// Copy a file if it exists.
module.exports = async (src, dst) => {
	await fsPromises.access(src)
		.then(async e => {
			await fsPromises.copyFile(
				src,
				dst
			)
		})
		.catch(error => {
			throw new Error('Unable to copy the file:', src)
		})
}