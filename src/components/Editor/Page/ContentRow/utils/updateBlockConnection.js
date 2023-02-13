
import { updBlock } from 'editorActions'
import { store } from 'store'

/*
	The function is not involved. The reason is that there are too many situations when the connection on the indices between the Link and Backlink blocks is lost, for example: moving any blocks or pages, removing blocks or pages, adding blocks.
*/
export default props => {

	const {
		srcPageIndex,
		srcBlockIndex,
		dstPageIndex,
		dstBlockIndex,
		isBlockRemoving
	} = props


	const content = store.getState().editor.content
	const block = content[srcPageIndex].content[0].content[srcBlockIndex]

	let dstPage = content[dstPageIndex]

	const link = block && block.link
	const backLinks = block && block.backLinks

	if(link) {

		// It is a link.
		// Update the block to which it refers.

		let linkIds = link.ids
		let linkIndices = link.indices

		let linkedPage = content[linkIndices[0]]
		let linkedBlock = linkedPage && linkedPage.content[0].content[linkIndices[1]]

		if(!linkedBlock || linkedBlock.id !== linkIds[1]) {
			console.log('The block to which the link refers to transferred or removed.', block)
			return
		}

		// Update the coordinates in the back link.

		let newBackLinks = []

		for (let backLink of linkedBlock.backLinks) {
			if(backLink.ids[1] === block.id) {
				if(isBlockRemoving) {
					continue
				}
				backLink.ids = [dstPage.id, block.id]
				backLink.indices = [dstPageIndex, dstBlockIndex]
			}
			newBackLinks.push(backLink)
		}

		updBlock(
			{
				...linkedBlock,
				backLinks: newBackLinks.length ? newBackLinks : undefined
			},
			false,
			linkIndices[0],
			0,
			linkIndices[1],
		)

	} else if(backLinks){

		// Blok contains back links. Update all initial links.

		for (const backLink of backLinks) {

			let backLinkIds = backLink.ids
			let backLinkIndices = backLink.indices

			let linkPage = content[backLinkIndices[0]]
			let linkBlock = linkPage && linkPage.content[0].content[backLinkIndices[1]]

			if(!linkBlock || linkBlock.id !== backLinkIds[1]) {
				console.log('The link-block is transferred or deleted.', block)
				continue
			}

			// Update the coordinates in the link-block.
			updBlock(
				{
					...linkBlock,
					link: {
						...linkBlock.link,
						ids: [dstPage.id, block.id],
						indices:[dstPageIndex, dstBlockIndex],
					}
				},
				false,
				backLinkIndices[0],
				0,
				backLinkIndices[1],
			)

		}

	} else {
		return
	}

}