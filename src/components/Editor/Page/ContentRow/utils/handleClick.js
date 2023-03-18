
import {
	deleteBlock,
	switchUserFocus,
	deactivateLinkMode,
	deactivateAiPromptMode,
	selectBlocks
} from 'editorActions'
import getClickPosition from 'globalUtils/getClickPosition'
import connectBlocks from './connectBlocks'
import askAi from '../InnerActions/utils/askAi'
import { isFileLink, isAssetLink } from 'sharedUtils/blockTypes'
import requestElectronApi from 'globalUtils/requestElectronApi'
import normalizeFilePath from 'globalUtils/normalizeFilePath'

import { isDndIconPos } from './handleDrag'


export default props => {

	const {
		e,
		lastMouseDownPos,
		dblMode,
		block,
		pageIndex,
		localeIndex,
		blockIndex,
		isTargetPage,
		linkMode,
		aiPromptMode,
		selRange,
		isTextBlockDndMode,
		currentDoc
	} = props

	let node = e.target
	let value = node.innerText
	let withAlt = e.altKey
	let withShift = e.shiftKey
	const {x,y} = getClickPosition(e)
	let isContentRow = node.className && node.className.indexOf('content-row') > -1
	let nodeBB
	let contentRowWidth
	let activateDeletion
	let activateDnd


	if(isContentRow && !linkMode && !aiPromptMode) {

		nodeBB = node.getBoundingClientRect()
		contentRowWidth = nodeBB && nodeBB.width

		activateDeletion = x >= contentRowWidth - 1
			&& x < contentRowWidth + 25
			&& lastMouseDownPos.x > contentRowWidth

		activateDnd = isDndIconPos(x) && lastMouseDownPos.x < 0

	}


	if(selRange || activateDnd) {

		if((selRange && !isTargetPage) || isTextBlockDndMode) {
			return
		}

		switchUserFocus(pageIndex, localeIndex, blockIndex)

		let newSelRange = []

		if(selRange) {
			if(selRange.includes(blockIndex)) {
				// Exclude a block from the selection range.
				newSelRange = selRange.filter(i => i !== blockIndex)
			} else {

				// Include blocks.

				let isMultiSel = withShift
				let multiSelRange = []

				if(isMultiSel) {

					let firstSel = selRange[0]
					let lastSel = selRange.slice(-1)[0]

					let isBackDirection = blockIndex < firstSel

					let start = isBackDirection ? blockIndex : lastSel + 1

					let end   = isBackDirection ? firstSel - 1 : blockIndex

					for (let i = start; i <= end; i++) {
						multiSelRange.push(i)
					}

				}

				newSelRange = [].concat(
					selRange,
					isMultiSel
						? multiSelRange
						: blockIndex
				)

			}
		} else {
			// Include a block.
			newSelRange = [blockIndex]
		}

		selectBlocks(
			!newSelRange || !newSelRange.length
				? null
				: newSelRange
		)

		return

	}

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
	if(isContentRow && activateDeletion) {

		let link = block && block.link

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