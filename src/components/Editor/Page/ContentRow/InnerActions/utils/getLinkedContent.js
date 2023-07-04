
import { store } from 'store'
import { recognizeAll, isTextBlock, isMuted } from 'sharedUtils/blockTypes'
import findPageById from 'sharedUtils/findPageById'


export default block => {

	const localeIndex = 0
	const allEditorContent = store.getState().editor.content

	const blockType = recognizeAll(
		block.style,
		block.link,
		block.content
	)

	if(!blockType.isInternalLink) {
		return
	}

	const linkedPage = findPageById(
		{
			pageId: block.link.ids[0],
			content: allEditorContent
		}
	).page

	if(!linkedPage) {
		alert('Linked page not found.')
		return
	}

	return linkedPage.content[localeIndex].content.reduce((fullContent, block) => {

		const style = block.style

		if(isTextBlock(style) && !isMuted(style)) {
			fullContent += ' '+(block.content || '').replaceAll(/\n/g,' ')
		}

		return fullContent

	}, '').trim()

}