
const { getHash32, getIv16, encrypt } = require('./crpyto')

const {
	defOutputDirectory,
	defOutputFilename
} = require('../constants/index')

const prepareFileContentForCrypto = require('./prepareFileContentForCrypto')


module.exports = (state) => {

	const secretKey = state.encryption.secretKey
	const iv = getIv16()

	let newState = prepareFileContentForCrypto(state, (data) => {
		return data ? encrypt(data, secretKey, iv) : data
	})

	newState.encryption = {
		controlHash: getHash32(secretKey) + iv.toString('hex'),
	}

	return newState

}