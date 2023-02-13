
import { store } from 'store'
import { updBlock } from 'editorActions'

export default props => {

	const {
		linkedPageIndex,
		linkedBlockIndex,
	} = props

	const maxTextLen = 40

	const state = store.getState()

	const {
		targetPageIndex,
		targetBlockIndex,
		content
	} = state.editor

	const targetLocaleIndex = 0
	const targetPage = content[targetPageIndex]
	const targetBlock = targetPage.content[targetLocaleIndex].content[targetBlockIndex]

	const linkedPage = content[linkedPageIndex]

	if(!linkedPage) {
		return
	}

	const linkedLocaleIndex = 0
	const linkedLocale = linkedPage.content[linkedLocaleIndex]

	const linkedPageBlocks = linkedLocale.content
	const linkedBlock = linkedPageBlocks[linkedBlockIndex]

	let linkedPageHeadline = linkedPageBlocks[0].content || ''
	let shortLinkedPageHeadline = linkedPageHeadline

	if(shortLinkedPageHeadline.length > maxTextLen) {
		shortLinkedPageHeadline = shortLinkedPageHeadline.slice(0,maxTextLen) + '...'
	}

	let linkedBlockText = linkedBlock.content || ''
	let shortLinkedBlockText = linkedBlockText

	if(shortLinkedBlockText.length > maxTextLen) {
		shortLinkedBlockText = shortLinkedBlockText.slice(0,maxTextLen) + '...'
	}


	// NOTE. The backlinks feature is currently disabled. There seems to be no need for it.
	// Update the connected block, inject a back link into it if it does not exist.

	let newBackLink = {
		ids: [targetPage.id, targetBlock.id],
		indices: [targetPageIndex, targetBlockIndex]
	}

	// let backLinks = linkedBlock.backLinks

	// if(backLinks) {
	// 	let isExists
	// 	for (const backLink of linkedBlock.backLinks) {
	// 		if(
	// 			backLink.ids &&
	// 			backLink.ids[1] === targetBlock.id
	// 		) {
	// 			isExists = true
	// 			break
	// 		}
	// 	}
	// 	if(!isExists) {
	// 		backLinks = backLinks.concat(newBackLink)
	// 	}
	// } else {
	// 	backLinks = [newBackLink]
	// }

	// updBlock(
	// 	{
	// 		...linkedBlock,
	// 		backLinks: backLinks
	// 	},
	// 	false,
	// 	linkedPageIndex,
	// 	linkedLocaleIndex,
	// 	linkedBlockIndex
	// )


	// Update the current block, inject a link, initiate rendering.

	updBlock(
		{
			...targetBlock,
			style: 8,
			content: `Page: ${shortLinkedPageHeadline}.` +
				(linkedBlockIndex > 0 && linkedBlockText ?
					`\nBlock: ${shortLinkedBlockText}`
					:``),
			link: {
				ids: [linkedPage.id, linkedBlock.id],
				indices: [linkedPageIndex, linkedBlockIndex]
			}
		},
		true,
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex
	)

}