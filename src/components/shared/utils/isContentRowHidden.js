
import { getStyleKeys } from './blockStyling'
const styleKeys = getStyleKeys(true)

export default props => {

	const {
		search,
		block,
		localizedBlock
	} = props

	if(search) {

		const isTagsMode = search.isTagsMode

		if(isTagsMode) {
			return false
		}

		let blockTextValue = block.content
		let searchText = search.text
		let style = block.style

		if(searchText && styleKeys.includes(searchText)) {
			let key = styleKeys[style]
			return key !== searchText
		}

		// Combine the localized version with the original for full-text search.
		if(localizedBlock) {
			blockTextValue += localizedBlock.content
		}

		if(search.matchCase === false) {
			searchText = searchText.toLowerCase()
			blockTextValue = blockTextValue.toLowerCase()
		}

		return blockTextValue.indexOf(searchText) === -1

	}

	return false

}