
export default e => {

	let node  = e.target
	let rect = node.getBoundingClientRect()
	let x = e.clientX - rect.left
	let y = e.clientY - rect.top

	return {x,y}

}