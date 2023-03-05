
import { store } from 'store'

import {
	deleteBlock,
	resetBlockSelection
} from 'editorActions'

import copyBlocksToClipboard from './copyBlocksToClipboard'


export default e => {

	let key = e.key
	let keyCode = e.keyCode
	let withAlt = e.altKey
	let withShift = e.shiftKey
	let withCtrl = e.ctrlKey
	let withComand = e.metaKey || withCtrl
	let node = e.target
	let isBackspace = key === 'Backspace'

	const state = store.getState()
	const isEditor = state.layout === 0
	const selRange = state.editor.selRange
	const editor = state.editor

	if(!isEditor) {
		return
	}

	if(selRange) {

		if(isBackspace) {
			deleteBlock()
		}

		if(withComand && key === 'c') {
			copyBlocksToClipboard({
				blocks: editor.content[editor.targetPageIndex].content[editor.targetLocaleIndex].content.filter((block, index) => selRange.includes(index))
			})
			setTimeout(() => {
				resetBlockSelection()
			}, 0)
		}

	}

}

