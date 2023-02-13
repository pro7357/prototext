
export default filePath => {

	let lastSlashPos = filePath.lastIndexOf('/')
	let base = filePath.slice(lastSlashPos+1)
	let lastDotPos = base && base.lastIndexOf('.')
	let ext
	let name
	if(base && lastDotPos > -1) {
		name = base.slice(0,lastDotPos)
		ext = base.slice(lastDotPos+1)
	}
	return {
		fullPath: filePath,
		dir: filePath.slice(0,lastSlashPos+1),
		base,
		name,
		ext,
	}

}