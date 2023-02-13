
// import { store } from 'store'

export default props => {

	const content = props.content
	const blockId  = props.blockId

	let targetBlock
	let targetBlockIndex

	for (let i = 0; i < content.length; i++) {
		const block = content[i]
		if(block.id === blockId) {
			targetBlock = block
			targetBlockIndex = i
			break
		}
	}

	return {
		block: targetBlock,
		blockIndex: targetBlockIndex
	}

}