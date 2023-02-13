
import { store } from 'store'

export default props => {

	const {
		pageIndex,
		localeIndex = 0,
		blockIndex
	} = props

	const state = store.getState()

	return state.editor.content[pageIndex].content[localeIndex].content[blockIndex]

}