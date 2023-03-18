
const http = require('http')
const https = require('https')
const fs = require('fs')
const parseUrl = require('url').parse


module.exports = async (url, dest) => {

	return new Promise((resolve, reject) => {

		if(!url) {
			reject(`No URL`)
		}

		if(typeof url === 'string') {
			url = parseUrl(url)
		}

		const {
			protocol,
			hostname,
			pathname
		} = url

		const isHttps = protocol === 'https:'

		let normalizedUrl = `${protocol}//${hostname}${pathname}`

		const file = fs.createWriteStream(dest, { flags: 'wx' })

		const request = (isHttps ? https : http).get(normalizedUrl, (response) => {
			if (response.statusCode === 200) {
				response.pipe(file)
			} else {
				file.close()
				fs.unlink(dest, () => {}) // Delete temp file
				reject(`Server responded with ${response.statusCode}: ${response.statusMessage}`)
			}
		})

		request.on('error', (err) => {
			file.close()
			fs.unlink(dest, () => {}) // Delete temp file
			reject(err.message)
		})

		file.on('finish', () => {
			resolve()
		})

		file.on('error', (err) => {

			file.close()

			if (err.code === 'EEXIST') {
				reject('File already exists')
			} else {
				fs.unlink(dest, () => {}) // Delete temp file
				reject(err.message)
			}

		})

	})

}