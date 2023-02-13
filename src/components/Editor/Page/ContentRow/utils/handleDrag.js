
import {
	activateTextBlockDndMode,
	deactivateDndMode,
	switchUserFocus
} from 'editorActions'
import getClickPosition from 'globalUtils/getClickPosition'

const isDndIconPos = x => x < 8
let tempDiv

/*
	The difference between DRAG & DROP functions for text blocks, localizations, and menu elements is minimal.This is a task for refactoring.
*/
export default props => {

	const {
		e,
		moment,
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

	const {x,y} = getClickPosition(e)

	// The user hold the left mouse key. The event before "Drag Start"
	if(moment === 'hold') {

		// Is it a click in the "⠇" dnd button area?

		let activateDnd = isDndIconPos(x)

		if(activateDnd) {
			activateTextBlockDndMode()
		}

		return

	}

	// The user unhold the left mouse key. Deactivate the D&D mode.
	if(moment === 'unhold') {
		deactivateDndMode()
		return
	}


	// Start moving the selected Content Row.
	if(moment === 'start') {

		if(!isContentRow || !isDndIconPos(x)) {
			e.preventDefault()
			e.stopPropagation()
			return
		}

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

		// Pass data and switch the focus in Redux Store.
		e.dataTransfer.setData('text/plain', srcPageIndex+'-'+srcBlockIndex)
		switchUserFocus(srcPageIndex, srcLocaleIndex, srcBlockIndex)

		return

	}


	// End the dragging of the selected Content Row.
	if(moment === 'end') {

		// Reset the transparency of the original Content Row.
		node.style.opacity = 1
		deactivateDndMode()

		tempDiv.innerHTML = ''

	}

}