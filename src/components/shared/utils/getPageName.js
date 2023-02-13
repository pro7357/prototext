
export default (page) => {

	let originalLocale = page.content[0]

	let firstBlock = originalLocale.content[0]

	return firstBlock.content || 'Untitled'

}
