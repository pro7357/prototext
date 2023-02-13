
import { store } from 'store'

import findBlockOnPageById from './findBlockOnPageById'

export default props => {

	const content = props.content || store.getState().editor.content
	const blockId  = props.blockId
	const localeIndex  = props.localeIndex || 0

	let targetPage
	let targetPageIndex
	let targetBlock
	let targetBlockIndex

	let _fr

	for (let i = 0; i < content.length; i++) {

		const page = content[i]
		const pageBlocks = page.content[localeIndex].content

		_fr = findBlockOnPageById({
			content: pageBlocks,
			blockId
		})

		if(_fr.block) {
			targetPage = page
			targetPageIndex = i
			targetBlock = _fr.block
			targetBlockIndex = _fr.blockIndex
			break
		}

	}

	return {
		page: targetPage,
		pageIndex: targetPageIndex,
		block: targetBlock,
		blockIndex: targetBlockIndex
	}

}