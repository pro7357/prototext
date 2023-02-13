
import {
	switchUserFocus
} from 'editorActions'


export default props => {

	const {
		e,
		pageIndex,
		localeIndex,
		blockIndex,
		linkMode
	} = props

	if(linkMode) {
		return
	}

	switchUserFocus(pageIndex, localeIndex, blockIndex)

}