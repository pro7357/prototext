
const { encode } = require('gpt-3-encoder')

module.exports = (text) => {
	const encoded = encode(text)
	return encoded && encoded.length
}