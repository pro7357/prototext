
import { updBlock } from 'editorActions'

let prevBloclId
let prevSide
let prevBlockNode

export default props => {

	const {
		e,
		block,
		pageIndex,
		localeIndex,
		blockIndex,
		side
	} = props

	let targetNode = e.target
	let inputText = targetNode.innerText

	inputText = inputText.trim()

	updBlock(
		{
			...block,
			content: inputText,
		},
	)

	if(side && side !== 'center') {

		let oppositeSide = side === 'left' ? 'right' : 'left'

		let oppositeBlockNode = block.id === prevBloclId && side === prevSide
			? prevBlockNode
			: document.getElementById(
				`${oppositeSide}-be-${pageIndex}-${localeIndex}-${blockIndex}`
			)

			if(oppositeBlockNode) {
			oppositeBlockNode.innerText = inputText
			prevBloclId = block.id
			prevBlockNode = oppositeBlockNode
			prevSide = side
		}

	}

}