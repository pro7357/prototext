
import {
	activateTextBlockDndMode,
	deactivateDndMode,
	resetBlockSelection,
	switchUserFocus
} from 'editorActions'
import getClickPosition from 'globalUtils/getClickPosition'

export const isDndIconPos = x => x < 8
let tempDiv

/*
	The difference between DRAG & DROP functions for text blocks, localizations, and menu elements is minimal.This is a task for refactoring.
*/
export default props => {

	const {
		e,
		moment,
		selMode,
		selRange,
		srcPageIndex,
		srcLocaleIndex,
		srcBlockIndex,
		twoColsMode,
		pageWidth
	} = props

	if(!tempDiv) {
		tempDiv = document.getElementById('temp')
	}

	const node = e.target
	let role = node && node.dataset && node.dataset.role
	const isContentRow = role === 'content-row'
	const isImage = role === 'image'

	if(isImage) {
		return
	}

	const {x,y} = getClickPosition(e)


	// The user unhold the left mouse key. Deactivate the D&D mode.
	if(moment === 'unhold') {
		deactivateDndMode()
		return
	}


	// Start moving the selected Content Row or Rows.
	if(moment === 'start') {

		if(!isContentRow || ( !isDndIconPos(x) && !selMode )) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

		// Pass data.
		e.dataTransfer.setData('text/plain', srcPageIndex+'-'+srcBlockIndex)

		if(selMode) {

			let fakeGhost = document.createElement('div')
			let len = selRange.length
			fakeGhost.innerText = `${len} card${len>1?`s`:``}`
			tempDiv.appendChild(fakeGhost)
			e.dataTransfer.setDragImage(fakeGhost,10,25)

		} else {

			window.targetDndEl = node

			let nodeBB = node.getBoundingClientRect()
			let nodeWidth = nodeBB && nodeBB.width

			if(twoColsMode && nodeWidth) {
				nodeWidth /= 2
			}


			// Create a custom clone of dragged Content Row.
			let fakeGhost = node.cloneNode(true)
			fakeGhost.style.width = ((nodeWidth || pageWidth) * (twoColsMode?2:1))+'px'
			tempDiv.appendChild(fakeGhost)
			e.dataTransfer.setDragImage(fakeGhost,x,y)

			// Hide the original Content Row.
			node.style.opacity = 0

			// Switch the focus in Redux Store.
			switchUserFocus(srcPageIndex, srcLocaleIndex, srcBlockIndex)

		}

		return

	}


	// End the dragging of the selected Content Row.
	if(moment === 'end') {

		// Reset the transparency of the original Content Row.
		node.style.opacity = 1
		deactivateDndMode()
		resetBlockSelection()

		if(tempDiv) {
			tempDiv.innerHTML = ''
		}

	}

}