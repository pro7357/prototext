
import { store } from 'store'
import {
	updBlock,
	switchBlockHighlight
} from 'editorActions'

import findPageById from 'sharedUtils/findPageById'
import findBlockOnPageById from 'sharedUtils/findBlockOnPageById'
import findBlockById from 'sharedUtils/findBlockById'


export default props => {

	const {
		e,
		internalLink,
		block,
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex,
	} = props

	e.preventDefault()

	const state = store.getState()

	const {
		content
	} = state.editor

	let side = props.side

	if(side !== 'right') {
		// Exclude the value of "center" and empty.
		side = 'left'
	}

	let initialLinkedPageIndex   = internalLink.indices[0]
	let initialLinkedPageId      = internalLink.ids[0]
	let initialLinkedLocaleIndex = 0
	let initialLinkedBlockIndex  = internalLink.indices[1]
	let initialLinkedBlockId     = internalLink.ids[1]

	let linkedPageIndex   = initialLinkedPageIndex
	let linkedPageId      = initialLinkedPageId
	let linkedLocaleIndex = initialLinkedLocaleIndex
	let linkedBlockIndex  = initialLinkedBlockIndex
	let linkedBlockId     = initialLinkedBlockId

	let linkedPage = content[linkedPageIndex]

	let _fr

	if(!linkedPage || linkedPage.id !== linkedPageId) {

		// There is no page (not exists or moved)

		linkedPage = null

		// Try to find the target page by the identifier in link.
		_fr = findPageById({content, pageId: linkedPageId})
		linkedPage = _fr.page
		linkedPageIndex = _fr.pageIndex

		if(!linkedPage) {
			alert('Linked page not found.')
			return
		}
	}

	let linkedLocale = linkedPage.content[linkedLocaleIndex]

	let linkedPageBlocks = linkedLocale.content
	let linkedBlock = linkedPageBlocks[linkedBlockIndex]


	if(!linkedBlock || linkedBlock.id !== linkedBlockId) {

		// There is no block (not exists or moved)
		linkedBlock = null

		// Try to find the block  by the identifier in link.
		_fr = findBlockOnPageById({blockId: linkedBlockId, content: linkedPageBlocks})
		linkedBlock = _fr?.block
		linkedBlockIndex = _fr?.blockIndex

		if(!linkedBlock) {

			// Try to find the block on other pages.
			_fr = findBlockById({
				content,
				blockId: linkedBlockId
			})

			linkedPage = _fr?.page
			linkedPageIndex = _fr?.pageIndex
			linkedBlock = _fr?.block
			linkedBlockIndex = _fr?.blockIndex

			// If the block is not found, then redirect the link to the first block of the page where it was previously.
			if(!linkedBlock) {
				alert('Linked card not found.')
			}

		}
	}

	let isLinkWorking = linkedPage && linkedBlock

	// Update the coordinates in the block-link if they were incorrect.
	// Or remove the link if the blocked linked was not found.
	if(
		initialLinkedPageIndex !== linkedPageIndex ||
		initialLinkedBlockIndex !== linkedBlockIndex
	) {
		updBlock(
			{
				...block,
				style: isLinkWorking ? block.style : 5,
				link: isLinkWorking
					? {
						...block.link,
						indices:[linkedPageIndex,linkedBlockIndex],
						ids: [linkedPage.id, linkedBlock.id],
					}
					: undefined
			},
			!isLinkWorking,
			targetPageIndex,
			targetLocaleIndex,
			targetBlockIndex,
		)
	}

	if(!isLinkWorking) {
		return
	}


	// Switch the editor view to Two Pages mode.
	// Highlighte the connected block.
	switchBlockHighlight(
		true,
		true,
		linkedPageIndex,
		linkedLocaleIndex,
		linkedBlockIndex,
		side
	)

	setTimeout(() => {
		switchBlockHighlight(
			false,
			false,
			linkedPageIndex,
			linkedLocaleIndex,
			linkedBlockIndex,
			side
		)
	}, 0)


}