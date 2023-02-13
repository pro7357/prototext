
const { translate } = require('bing-translate-api')


module.exports = async (props, targetWindow) => {

	const {
		text,
		srcLang,
		dstLang
	} = props

	let response

	try {
		response = await translate(text, srcLang, dstLang, true)
	} catch (err) {
		console.log(err.message)
		// console.log('text', text)
		console.log('srcLang',srcLang)
		console.log('dstLang',dstLang)
		targetWindow.webContents.send('translation', false)
	}

	return response && response.translation

}