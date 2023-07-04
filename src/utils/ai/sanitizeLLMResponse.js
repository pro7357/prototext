
// Trim and remove outer quotes.
export default text => {

	if(!text) {
		return ''
	}

	text = text.trim()

	let qts = [`'`,`"`]
	let isQt = (char) => qts.includes(char)

	if(isQt(text.slice(0,1))) {
		text = text.slice(1)
	}

	if(isQt(text.slice(-1))) {
		text = text.slice(0,-1)
	}

	return text

}