
import { rearrangePages, rearrangeLocales } from 'editorActions'

/*
	The difference between DRAG & DROP functions for text blocks, localizations, and menu elements is minimal.This is a task for refactoring.
*/
export default props => {

	const {
		e,
		moment,
		itemIndex,
		isLocalizationView,
		side
	} = props


	e.preventDefault()

	let node = e.target
	let id = node.id

	// console.log('drop  node',node)

	if(!id) {
		node = node.nodeName === 'SELECT'
			? node.parentNode.parentNode
			: node.parentNode
	}

	let isSeft = id && window.targetDndEl && window.targetDndEl.id === id

	if(isSeft) {
		return
	}

	let mdaNode = node.children && node.children[1]

	if(mdaNode && mdaNode.className.indexOf('mda') === -1) {
		return
	}


	if(moment === 'over') {

		if(mdaNode && mdaNode.style) {
			mdaNode.style.opacity = 1
		}

	} else if(moment === 'leave') {

		if(mdaNode && mdaNode.style) {
			mdaNode.style.opacity = 0
		}

	} else if(moment === 'drop') {

		node.style.backgroundColor = ''

		let srcData = e.dataTransfer.getData('text').split('-').map(item => Number(item))

		let srcItemIndex = srcData[0]

		if(mdaNode && mdaNode.style) {
			mdaNode.style.opacity = 0
		}

		let dstItemIndex = itemIndex

		if(dstItemIndex === srcItemIndex) {
			return
		}

		// console.log('onDrop')
		// console.log('srcItemIndex', srcItemIndex)
		// console.log('dstItemIndex', dstItemIndex)


		if(isLocalizationView) {
			rearrangeLocales(
				srcItemIndex, // srcLocaleIndex
				dstItemIndex, // dstLocaleIndex
				srcItemIndex === 0
			)
		} else {
			rearrangePages(
				srcItemIndex, // srcPageIndex
				dstItemIndex, // dstPageIndex
				side
			)
		}


	}

}