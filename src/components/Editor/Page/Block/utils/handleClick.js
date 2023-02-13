
import getClickPosition from 'globalUtils/getClickPosition'

export default props => {

	const {
		e,
		dblMode,
	} = props

	let node = e.target
	let value = node.innerText
	let withAlt = e.altKey
	let withShift = e.shiftKey
	const {x,y} = getClickPosition(e)

	if(dblMode && withShift) {

		// Copy the contents of the block

		e.preventDefault()
		document.getSelection().removeAllRanges()

		navigator.clipboard.writeText(value).then(() => {
			node.style.backgroundColor = '#ead3b6'
			node.style.color = '#000'
		}, err => {
			console.error('Async: Could not copy text: ', err)
		})

		setTimeout(() => {
			node.style.backgroundColor = ''
			node.style.color = ''
		}, 300)

	}

}