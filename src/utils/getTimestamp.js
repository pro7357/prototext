
export default (forUsers) => {

	let d = new Date

	if(forUsers) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' }
  		let fPart = d.toLocaleTimeString()
  		let sPart = d.toLocaleDateString(undefined, options)
		return `${fPart} ${sPart}`
	}

	return d.toISOString()
}