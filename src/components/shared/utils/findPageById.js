
import { store } from 'store'

export default props => {

	const content = props.content || store.getState().editor.content
	const pageId  = props.pageId

	let targetPage
	let targetPageIndex

	for (let i = 0; i < content.length; i++) {
		const page = content[i]
		if(page.id === pageId) {
			targetPage = page
			targetPageIndex = i
			break
		}
	}

	return {
		page: targetPage,
		pageIndex: targetPageIndex
	}

}