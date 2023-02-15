
import { recognizeAll } from 'sharedUtils/blockTypes'
import isHiddenPage from 'sharedUtils/isHiddenPage'
import findPageById from 'sharedUtils/findPageById'


const collectContentRecursivelly = props => {

	const {
		allEditorContent,
		content,
		targetLocaleIndex,
		exposeLinkedContent,
		depthLimit,
		currentDepth = 0,
		involvedPageIds = [],
		allPagesMode,
		tagFilterMode,
		searchByTags,
		searchTags,
		focus,
	} = props

	let targetContentPart = content

	if(allPagesMode || tagFilterMode) {

		// Presentation of all pages using filtering on tags or without it.
		targetContentPart = tagFilterMode
			? searchByTags
				? content
				: null
			: content

	} else {

		// Presentation of the target page only.
		if(content[focus]) {
			targetContentPart = [
				content[focus]
			]
		}

	}

	if(!targetContentPart || !targetContentPart.length) {
		return null
	}

	return targetContentPart.reduce((done, page, pageIndex) => {

		const pageId = page.id
		const originalLocale = page.content[0]
		const targetLocale = page.content[targetLocaleIndex]

		// Hide the page in case of filtration by tags.
		if(tagFilterMode && searchByTags) {
			if(isHiddenPage({
				search: {tags: searchTags, isTagsMode: searchByTags},
				page
			})) {
				return done
			}
		}

		return done.concat(

			targetLocale.content.reduce((blocks, localizedBlock, blockIndex) => {

				const originalBlock = originalLocale.content[blockIndex]
				const normalizedBlock = {
					...originalBlock
				}

				const style = normalizedBlock.style
				const link = normalizedBlock.link
				const blockContent = localizedBlock.content
				const type = recognizeAll(style, link, blockContent)

				// Keep information about the type of link inside the block.
				normalizedBlock.type = type
				normalizedBlock.content = blockContent

				const {
					isInternalLink,
					isTags,
					isMuted
				} = type

				// Add the current block.
				if(!isInternalLink && !isTags && !isMuted) {
					blocks.push(
						normalizedBlock
					)
				}

				// Add blocks related to the link.
				if(exposeLinkedContent && isInternalLink && currentDepth < depthLimit) {

					let linkedPageIndex  = link.indices[0]
					let linkedPageId     = link.ids[0]
					let linkedPage       = allEditorContent[linkedPageIndex]
					let realLinkedPageId = linkedPage.id

					let linkedBlockIndex = link.indices[1]
					let isFirstPageBlock = linkedBlockIndex === 0

					let isSamePage = realLinkedPageId === pageId
					let isInvolvedPage = involvedPageIds.includes(realLinkedPageId)

					// Ignore links to secondary (not first) blocks of pages.
					// Ignore links from the current page to yourself.
					if(!isFirstPageBlock || isSamePage || isInvolvedPage) {
						return blocks
					}

					let isLinkedPageExists = linkedPage && linkedPageId === realLinkedPageId

					// try to find a lost page.
					if(!isLinkedPageExists) {
						linkedPage = findPageById(
							{
								pageId: linkedPageId,
								content: allEditorContent
							}
						).page
						isLinkedPageExists = linkedPage
					}

					// Include related content and report on broken links if they are.
					if(isLinkedPageExists) {

						const linkedBlocks = collectContentRecursivelly({
							...props,
							content: [linkedPage],
							currentDepth: currentDepth + 1,
							involvedPageIds: involvedPageIds.concat(pageId)
						})

						blocks = blocks.concat(
							linkedBlocks
						)

					} else {
						blocks.push(
							{
								content: <>
									<b>Broken Link: {link.indices.join('.')}</b>.
									<div>{normalizedBlock.content}</div>
								</>,
								type: {isBrokenLink: true}
							}
						)
					}

				}

				return blocks

			}, [])
		)
	}, [])

}


export default collectContentRecursivelly