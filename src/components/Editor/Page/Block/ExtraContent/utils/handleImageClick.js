
import { switchUserFocus } from 'editorActions'
import { togglePresenter } from 'layoutActions'
import { setPresenterProperty } from 'presenterActions'


export default props => {

	const {
		pageIndex,
		localeIndex,
		blockIndex,
	} = props

	switchUserFocus(pageIndex, localeIndex, blockIndex)
	togglePresenter()
	setPresenterProperty('sidebarMode', false)
	setPresenterProperty('slideMode', true)
	setPresenterProperty('allPagesMode', false)

}