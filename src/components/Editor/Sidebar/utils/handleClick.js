
import { switchSideFocus, deletePageOrLocale } from 'editorActions'

import getClickPosition from 'globalUtils/getClickPosition'


export default props => {

	const {
		e,
		side,
		isAlone,
		targetPageIndex,
		isLocalizationView,
		itemIndex
	} = props

	let node = e.target

	let isDraggableSelect = node.className &&
		node.className.indexOf('draggableSelect') > -1


	if(isDraggableSelect && !isAlone && isLocalizationView) {

		// Delete localization.

		const {x,y} = getClickPosition(e)

		let nodeBB = node.getBoundingClientRect()
		let nodeWidth = nodeBB && nodeBB.width

		let activateDeletion = x >= nodeWidth - 17 && x < nodeWidth + 10

		if(activateDeletion) {
			deletePageOrLocale(targetPageIndex, itemIndex)
		}

	} else {
		switchSideFocus(side,itemIndex)
	}


}