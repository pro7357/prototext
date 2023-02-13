
import {
	deleteBlock,
	switchUserFocus,
	deactivateLinkMode,
	deactivateAiPromptMode
} from 'editorActions'
import getClickPosition from 'globalUtils/getClickPosition'
import connectBlocks from './connectBlocks'
import askAi from '../InnerActions/utils/askAi'
import { isFileLink, isAssetLink } from 'sharedUtils/blockTypes'
import requestElectronApi from 'globalUtils/requestElectronApi'
import normalizeFilePath from 'globalUtils/normalizeFilePath'


export default props => {

	const {
		e,
		block,
		pageIndex,
		localeIndex,
		blockIndex,
		linkMode,
		aiPromptMode,
		currentDoc
	} = props

	let node = e.target
	let value = node.innerText
	let withAlt = e.altKey
	let withShift = e.shiftKey
	const {x,y} = getClickPosition(e)

	if(linkMode) {
		e.preventDefault()
		e.stopPropagation()
		connectBlocks({
			linkedPageIndex: pageIndex,
			linkedBlockIndex: blockIndex,
		})
		deactivateLinkMode()
		return
	}

	if(aiPromptMode) {
		e.preventDefault()
		e.stopPropagation()
		askAi({
			taskPageIndex: pageIndex,
			taskBlockIndex: blockIndex,
		})
		return
	}


	// Delete a content row and nested blocks

	let isContentRow = node.className && node.className.indexOf('content-row') > -1

	if(isContentRow) {

		let nodeBB = node.getBoundingClientRect()
		let contentRowWidth = nodeBB && nodeBB.width

		let activateDeletion = x >= contentRowWidth - 1 && x < contentRowWidth + 25

		if(activateDeletion) {

			let link = block.link

			if(isAssetLink(isFileLink(link),link)) {
				if(withAlt || window.confirm('Delete the linked asset file or not?')) {
					requestElectronApi(
						'deleteAsset',
						normalizeFilePath(link.filePath, currentDoc)
					)
				}
			}

			switchUserFocus(pageIndex, localeIndex, blockIndex)
			deleteBlock()

		}

	}


}