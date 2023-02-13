
import { updLocaleOption } from 'editorActions'

export default props => {

	const {
		value,
		itemIndex
	} = props

	updLocaleOption(itemIndex,value)

}