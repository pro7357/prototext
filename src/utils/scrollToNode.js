
export default props => {

	const {
		node,
		containerNode,
		offset = 0,
		isSmooth
	} = props

	const ny = node.getBoundingClientRect().top
	const cs = containerNode.scrollTop || 0
	const y = ny + cs + offset

	containerNode.scroll({
		top: y,
		behavior: isSmooth ? 'smooth' : 'auto'
	})

}