
const { decrypt} = require('./crpyto')
const prepareFileContentForCrypto = require('./prepareFileContentForCrypto')


module.exports = (state, secretKey) => {

	if(!state.encryption || !state.encryption.controlHash) {
		return
	}

	const controlHash = state.encryption.controlHash
	const iv = controlHash.slice(32)

	let newState = prepareFileContentForCrypto(state, (data) => {
		return data ? decrypt(data, secretKey, iv) : data
	})

	return newState

}