
import { rearrangeTextBlocks } from 'editorActions'
import linkFile from '../../Block/ExtraContent/utils/linkFile'

/*
	The difference between DRAG & DROP functions for text blocks, localizations, and menu elements is minimal.This is a task for refactoring.
*/
export default props => {

	const {
		e,
		selMode,
		selRange,
		block,
		moment,
		pageIndex,
		localeIndex,
		blockIndex,
		twoColsMode,
		currentDoc
	} = props


	e.preventDefault()
	e.stopPropagation()

	let node = e.target
	let role = node && node.dataset && node.dataset.role
	let depth = node && node.dataset && parseInt(node.dataset.depth)

	const dndNode = window.targetDndEl
	const dndNodeRole = dndNode && dndNode.dataset.role
	const isDndNodeImage = dndNodeRole === 'image'

	if(!dndNode || isDndNodeImage) {
		return
	}

	if(role !== 'content-row') {
		if(depth) {
			for (let i = 0; i < depth; i++) {
				node = node.parentNode
			}
		} else {
			return false
		}
	}

	let contentRowNode = node
	let id = contentRowNode.id

	let isSeft = id && window.targetDndEl && window.targetDndEl.id === id


	if(isSeft) {
		return
	}

	let mdaNode = contentRowNode.children[twoColsMode?2:1]


	if(moment === 'over') {

		if(mdaNode && mdaNode.style) {
			mdaNode.style.opacity = 1
		}

	} else if(moment === 'leave') {

		if(mdaNode && mdaNode.style) {
			mdaNode.style.opacity = 0
		}

	} else if(moment === 'drop') {

		contentRowNode.style.backgroundColor = ''

		if(mdaNode && mdaNode.style) {
			mdaNode.style.opacity = 0
		}

		let srcData = e.dataTransfer.getData('text/plain').split('-').map(item => Number(item))

		let srcUriData = e.dataTransfer.getData('text/uri-list')
		let srcFilePaths = e.dataTransfer.files

		if(srcFilePaths) {
			if(srcFilePaths.length) {
				// Convert to an iterable array.
				let _srcFilePaths = []
				for (let i = 0; i < srcFilePaths.length; i++) {
					_srcFilePaths.push(srcFilePaths[i].path)
				}
				srcFilePaths = _srcFilePaths
			} else {
				srcFilePaths = null
			}
		}

		if(srcUriData || srcFilePaths) {
			linkFile({
				block,
				targetPageIndex: pageIndex,
				targetLocaleIndex: 0, // localeIndex
				targetBlockIndex: blockIndex + 1,
				currentDoc,
				assetMode: true,
				srcFilePaths,
				srcFileUrls: srcUriData ? [srcUriData] : null,
			})
			return
		}


		let srcPageIndex = srcData[0]
		let srcBlockIndex = srcData[1]


		if(pageIndex === srcPageIndex && srcBlockIndex === blockIndex + 1) {
			return
		}

		// console.log('onDrop')
		// console.log('srcPageIndex',srcPageIndex)
		// console.log('srcBlockIndex', srcBlockIndex)
		// console.log('dstPageIndex', pageIndex)
		// console.log('dstBlockIndex', blockIndex)

		let dstPageIndex = pageIndex
		let dstBlockIndex = blockIndex + 1

		// Ignore unsafe ranges.
		if(selRange) {
			if(
				srcPageIndex === dstPageIndex &&
				(dstBlockIndex >= selRange[0] && blockIndex <= selRange.slice(-1)[0])
			) {
				return
			}
		}

		rearrangeTextBlocks(
			srcPageIndex,
			srcBlockIndex,
			dstPageIndex,
			dstBlockIndex,
		)

	}

}