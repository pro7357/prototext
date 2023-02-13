
const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const ivLength = 16

const getHash32 = (text) => {
	return crypto.createHash('sha256').update(String(text)).digest('hex').slice(0, 32)
}

const getIv16 = () => {
	return crypto.randomBytes(ivLength)
}

const encrypt = (text, secretKey, externalIv) => {

	const iv = externalIv || getIv16()

	const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

	const encrypted = Buffer.concat([
		cipher.update(text),
		cipher.final()
	])

	const content = encrypted.toString('hex')

	 return externalIv
	 	? content // plain mode
		: {
			iv: iv.toString('hex'),
			content
		}

}


const decrypt = (hash, secretKey, iv) => {

	const isPlainHash = typeof hash === 'string'

	const hashContent = isPlainHash ? hash : hash.content
	const hashIv = isPlainHash ? iv : hash.iv

   const decipher = crypto.createDecipheriv(
		algorithm,
		secretKey,
		Buffer.from(hashIv, 'hex')
	)

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hashContent, 'hex')),
		decipher.final()
	])

	return decrpyted.toString()

}

const getUUID = () => (new Date).getTime() + crypto.randomBytes(5).toString('hex')

module.exports = {
	getHash32,
	getIv16,
	encrypt,
	decrypt,
	getUUID,
}