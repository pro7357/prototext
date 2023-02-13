
import {
	addBlock,
	updBlock,
	duplicateBlock,
	mergeBlocks,
	deleteBlock,
} from 'editorActions'


import getUID from 'globalUtils/getUID'
import { getStyleKeys } from 'sharedUtils/blockStyling'
const styleKeys = getStyleKeys(true)


let isSpecialCharAlertShown = false

export default props => {

	const {
		e,
		block,
		pageIndex: targetPageIndex,
		localeIndex: targetLocaleIndex,
		blockIndex: targetBlockIndex,
		fbbMode,
		linkMode,
		isAlone,
	} = props

	let value = e.target.innerText
	let key = e.key
	let keyCode = e.keyCode
	let withAlt = e.altKey
	let withShift = e.shiftKey
	let withComand = e.metaKey
	let spaceKey = e.code === 'Space'
	let node = e.target
	let caretPos = getCaret(node)
	let endPos = getEndPos(node)
	let isEnd = caretPos === endPos
	let isBackspace = key === 'Backspace'
	let isEmptyValue = !value || !value.trim().length

	// console.log('e',e)

	if(keyCode === 68 && withComand) {

		// CMD + D Duplicate the block.

		e.preventDefault()
		duplicateBlock()

	} else if(isBackspace && targetLocaleIndex === 0 && !isAlone) {

		if(isEmptyValue || (caretPos === 0 && targetBlockIndex > 0)){

			// Focus on the previous block
			shiftFocus(
				node,
				targetLocaleIndex,
				-1
			)

			if(isEmptyValue) {
				// Delete an empty block and related localization
				deleteBlock()
				return
			} else {
				// Combine the target block with the previous one and so for all localizations
				mergeBlocks(targetBlockIndex, targetBlockIndex-1)
				return
			}

		}


	} else if(key === 'Enter') {

		if(targetLocaleIndex === 0 && ((fbbMode && !withShift) || (!fbbMode && withShift))) {

			e.preventDefault()

			if(isEnd) {

				// Create a new text block and focus on it
				addBlock()
				shiftFocus(node, targetLocaleIndex, 1, false)

			} else {

				// Divide the block into two in the place of the cursor

				let firstValue = value.slice(0,caretPos).trim()
				let secondValue = value.slice(caretPos).trim()

				addBlock(
					[
						{
							...block,
							content: firstValue
						},
						{
							id: getUID(),
							style: block.style !== 8 ? block.style : undefined,
							content: secondValue
						}
					],
					targetBlockIndex,
					true // replaceTargetBlock
				)

				shiftFocus(node, targetLocaleIndex, 1, false)

				return

			}

		}

	} else if(
		(
			caretPos === 0 &&
			(
				spaceKey ||
				styleKeys.includes(key) ||
				(withShift && (keyCode === 50 || keyCode === 51))
			)
		) ||
		(
			withComand && (keyCode === 66 || keyCode === 73)
		)
	) {

		// Update content when entering a special symbol for styling a text block.

		e.preventDefault()

		if(targetLocaleIndex === 0) {

			// Replace symbols in foreign layouts.
			if(keyCode === 50) {
				// "
				key = '@'
			} else if(keyCode === 51) {
				// №
				key = '#'
			}

			if(keyCode === 66) {
				// CMD + B
				// Switch the bold text.
				key = block.style === 6 ? ' ' : '*'
			}

			if(keyCode === 73) {
				// CMD + I
				// Switch the muted text.
				key = block.style === 5 ? ' ' : '/'
			}

			let style = !spaceKey && styleKeys.indexOf(key) || undefined

			// Delete the link.
			if(style !== 8 && block.link) {
				delete block.link
			}

			updBlock({
				...block,
				style,
				content: value
			}, true) // refresh

			// setCaret(node, 'start')
			setCaret(node, caretPos)


		} else {
			if(!isSpecialCharAlertShown) {
				alert(`You have entered one of the special characters [ ${styleKeys.join(' ')} ]\nat the beginning of the text line to style a localized block.\n\nThis action was ignored because the style of localized blocks is inherited from the original blocks (page on the left). Please open and read the help section.`)
				isSpecialCharAlertShown = true
			}
		}

		return

	}

}


const setCaret = (node, position) => {

	setTimeout(() => {

		let range = new Range()
		let sel = document.getSelection()
		let firstChild = node.firstChild || node
		let lastChild = node.lastChild || node

		if(position === 'start') {

			range.setStart(firstChild, 0)
			range.collapse(true)

		} else if(position === 'end') {

			let endPos = getEndPos(node)

			range.setStart(lastChild, endPos)
			range.collapse(true)

		} else {
			range.setStart(lastChild, position)
		}

		sel.removeAllRanges()
		sel.addRange(range)

	}, 0)

}


const shiftFocus = (node, targetLocaleIndex, vShift, callback) => {

	if(!node) {
		return
	}

	setTimeout(() => {

		let newTargetNode = node.parentNode.parentNode

		newTargetNode = newTargetNode[
			vShift > 0
				? 'nextSibling'
				: 'previousSibling'
		]

		if(newTargetNode) {
			newTargetNode = newTargetNode.children[0].children[1+targetLocaleIndex]
		}

		if(newTargetNode) {
			newTargetNode.focus()
		}

		if(callback) {
			callback(newTargetNode)
		}

	}, 0)

}


function getCaret(el) {

	let caretPos = 0
	const sel = window.getSelection()

	if (sel.rangeCount == 0) return caretPos

	const range = sel.getRangeAt(0)
	const preRange = range.cloneRange()
	preRange.selectNodeContents(el)
	preRange.setEnd(range.endContainer, range.endOffset)
	caretPos = preRange.toString().length

	return caretPos

}


function getEndPos(node) {

	let children = node.childNodes
	let size = 0

	for (let i = 0; i < children.length; i++) {
		const child = children[i]
		size += (
			child.innerText
				? child.innerText === '\n' ? 0 : child.innerText.length
				: child.length
			) || 0
	}

	return size

}