
export default value => {

	let displayedValue = value ? value : ''

	// if(displayedValue && typeof displayedValue.replaceAll === 'function') {
	// 	displayedValue = displayedValue.replaceAll(/\n+/g,'\n')
	// } else {
	// 	return displayedValue
	// }

	if(typeof displayedValue.split === 'function') {
		return displayedValue.split('\n').join('<br/>')
	} else {
		console.error('Incorrect displayedValue')
		return displayedValue
	}


}