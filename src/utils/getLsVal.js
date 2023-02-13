
export default (key, defVal) => {
	let val
	if(localStorage) {
		try {
			val = localStorage.getItem(key)
			if(val && val !== 'null' && typeof val !== 'undefined' && val !== 'undefined') {
				val = JSON.parse(val)
			}
		} catch (error) {
			console.log('Incorrect LS value for key: '+key, error && error.message)
		}
	}
	return typeof val === 'undefined' || val === null
		? defVal
		: val
}