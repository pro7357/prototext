
// import { store } from 'store'

export default props => {

	const content = props.content
	const blockId  = props.blockId

	let targetBlock
	let targetBlockIndex

	for (let i = 0; i < content.length; i++) {
		const block = content[i]
		if(block && block.id === blockId) {
			targetBlock = block
			targetBlockIndex = i
			break
		}
	}

	if(!targetBlock) {
		return
	}

	return {
		block: targetBlock,
		blockIndex: targetBlockIndex
	}

}