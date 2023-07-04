
/*

	User script to add the current date and system info to the card content
	and make the card important by style.

	This will be run in a NodeJS environment so you can use any of its capabilities.

*/

const os = require('os')

module.exports = async props => {

	const {
		appState,
		targetCard,
	} = props

	const {
		id,
		style,
		content,
		link
	} = targetCard

	let currentDate = new Date().toDateString()
	let platform = os.platform()

	// First option.
	// To update the current card.
	// To add the current date and system info to the target card content and make it important by style.

	return {
		content: content + '\n' + currentDate + '\n' + platform,
		style: 1
	}

	// To create set of new cards below the target one.
	return [
		{
			content: 'New card #1 created by using the custom script.'
		},
		{
			content: 'New card #2 created by using the custom script.'
		},
		{
			content: 'New card #3 created by using the custom script.'
		}
	]

}