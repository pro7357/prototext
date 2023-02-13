
import requestElectronApi from 'globalUtils/requestElectronApi'
import { updBlock } from 'editorActions'

export default async props => {

	const {
		e,
		localizedBlock,
		srcLang,
		dstLang,
		pageIndex,
		localeIndex,
		blockIndex
	} = props

	const btnNode = e.target
	const originalBlockNode = btnNode.parentNode.parentNode.children[0]
	const localizedBlockNode = btnNode.parentNode.parentNode.children[1]

	if(!originalBlockNode || !localizedBlockNode) {
		return
	}

	updBlock(
		{
			...localizedBlock,
			isLoading: true,
		},
		true, // with refresh
		pageIndex,
		localeIndex,
		blockIndex
	)

	let prevLocalizedContent = localizedBlockNode.innerText

	const onError = () => {
		updBlock(
			{
				...localizedBlock,
				content: prevLocalizedContent,
				isLoading: undefined
			},
			true, // with refresh
			pageIndex,
			localeIndex,
			blockIndex
		)
		alert('Translation service is not available.')
	}

	let originalText = originalBlockNode.innerText

	if(!originalText) {
		onError()
		return
	}

	let translation = await requestElectronApi('translate', {
		text: originalText,
		srcLang,
		dstLang
	})

	if(translation) {
		delete localizedBlock.isLoading
		updBlock(
			{
				...localizedBlock,
				content: translation
			},
			true, // with refresh
			pageIndex,
			localeIndex,
			blockIndex
		)
	} else {
		onError()
	}

}