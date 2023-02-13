
import {
	activatePageDndMode,
	activateLocaleDndMode,
	deactivateDndMode,
} from 'editorActions'
import getClickPosition from 'globalUtils/getClickPosition'


/*
	The difference between DRAG & DROP functions for text blocks, localizations, and menu elements is minimal.This is a task for refactoring.
*/
export default props => {

	const {
		e,
		moment,
		srcIndex,
		isLocalizationView,
		localeCode
	} = props

	const node = e.target
	const {x,y} = getClickPosition(e)

	if(moment === 'hold') {

		if(isLocalizationView) {
			activateLocaleDndMode()
		} else {
			activatePageDndMode()
		}

		return

	}

	if(moment === 'unhold') {
		deactivateDndMode()
		return
	}


	if(moment === 'start') {

		window.targetDndEl = node

		let nodeBB = node.getBoundingClientRect()
		let nodeWidth = nodeBB && nodeBB.width

		let fakeGhost = node.cloneNode(true)

		if(isLocalizationView && fakeGhost) {
			let selectNode = fakeGhost.children[0].children[0]
			if(selectNode) {
				selectNode.value = localeCode
			}
		}

		fakeGhost.style.width = nodeWidth+'px';
		document.body.appendChild(fakeGhost);
		e.dataTransfer.setDragImage(fakeGhost,x,y)

		node.style.opacity = 0

		e.dataTransfer.setData('text/plain', srcIndex)

		return

	}

	if(moment === 'end') {

		node.style.opacity = 1
		deactivateDndMode()

	}

}