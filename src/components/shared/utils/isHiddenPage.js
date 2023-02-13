
import isContentRowHidden from 'sharedUtils/isContentRowHidden'

export default props => {

	const {
		search,
		page
	} = props

	if(!search) return false

	const {
		isTagsMode,
		tags,
	} = search

	for (const locale of page.content) {
		for (const block of locale.content) {

			if(isTagsMode && tags) {

				// Filter pages by tags.

				if(block.style === 8 && !block.link && block.content) {
					let contentAsTags = block.content.split(',')
					for (const contentTag of contentAsTags) {
						if(tags.includes(contentTag.trim().toLowerCase())) {
							return false
						}
					}
				}

			} else {

				// Filter pages by text content.

				let isBlockHidden = isContentRowHidden({
					search,
					block
				})

				if(isBlockHidden === false) return false

			}
		}
	}

	return true
}
