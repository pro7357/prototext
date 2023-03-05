
import { getStyleKeys } from 'sharedUtils/blockStyling'
const styleKeys = getStyleKeys(true)

export default props => {

	const {
		blocks
	} = props

	if(!blocks || !blocks.length) {
		return
	}

	let data = blocks.reduce((done, block, index) => {

		return done += block && block.content
			? (index?'\n':'') + `${block.style?styleKeys[block.style]:``}${block.content}`
			: ``

	},'')

	navigator.clipboard.writeText(data)

}