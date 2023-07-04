
import { addBlock, updBlock } from 'editorActions'
import createBlock from 'editorUtils/createBlock'
import { getStyleKeys } from 'sharedUtils/blockStyling'
const styleKeys = getStyleKeys(true)
import { setCaret } from './handleKeyDown'

// The "typewriter" animation mode for screencasing purposes.
const typewriterMode = !true


export default props => {

	const {e,localeIndex, block} = props

	e.preventDefault()

	let value = e.target.innerText
	let node = e.target
	let clipboardData = e.clipboardData.getData('Text') || ''

	if(typewriterMode) {
		node.setAttribute('contenteditable', 'false')
		typewriter(
			clipboardData,
			node,
			() => {
				updBlock(
					{
						...block,
						content: clipboardData,
					},
				)
			}
		)
		return
	}


	clipboardData = clipboardData.replaceAll(/\t/gi,'').trim()

	let newBlocksSeparator = '\n' // '\n\n'

	if(
		(!value || value === ' ' || value === '\n') &&
		localeIndex === 0 &&
		clipboardData.indexOf(newBlocksSeparator) > -1
	) {

		let newBlocks

		try {
			newBlocks = clipboardData.split(newBlocksSeparator).reduce((done, item, index)=>{
				if(item) {

					let content = item.trim()
					let style
					let firstChar = content && content[0]

					if(firstChar) {
						let styleIndex = styleKeys.indexOf(firstChar)
						if(styleIndex > -1) {
							style = styleIndex
							content = content.slice(1).trim()
						}
					}

					return done.concat(
						createBlock(
							content,
							style ? {style} : null
						)
					)

				}

				return done

			},[])
		} catch (error) {
			alert('Error', error.message)
		}

		if(newBlocks) {
			if(newBlocks.length > 1) {
				// Create a series of blocks from the contents of the clipboard.
				addBlock(
					newBlocks,
					undefined,
					undefined,
					true // replaceTargetBlock
				)
				return
			}
		}

	}

	// Insert the text without design.Update the target block.
	document.execCommand('insertText', false, clipboardData)

}


function typewriter(value, node, callback) {
	if(value.length) {

		node.innerHTML = node.innerHTML + value[0]

		setTimeout(() => {
			typewriter(value.slice(1), node, callback)
		}, 50)

	} else {
		node.setAttribute('contenteditable', 'true')
		setCaret(node, 'end')
		callback()
	}
}