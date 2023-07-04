
import { localesDict } from 'globalUtils/allLocaleOptions'
import { updBlock } from 'editorActions'


export default async props => {

	const {
		pageIndex,
		localeIndex,
		blockIndex,
		block: originalBlock,
		localizedBlock,
		sharedEditorProps,
		translate,
	} = props

	const localeOptions = sharedEditorProps.localeOptions

	// Activate the loading mode.
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

	let prevLocalizedContent = localizedBlock.content

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
		// alert('Translation service is not available.')
	}

	let originalText = originalBlock.content

	if(!originalText) {
		onError()
		return
	}

	const srcLang = localeOptions[0]
	const dstLang = localeOptions[localeIndex]
	const srcLangName = localesDict[srcLang].name
	const dstLangName = localesDict[dstLang].name

	// Translate the original text by using a translation engine.
	// For example, Microsoft Translator API or OpenAI GPT API.
	let translation = await translate({
		originalText,
		srcLang,
		dstLang,
		srcLangName,
		dstLangName,
	})

	// Update the target card content.
	if(translation) {
		updBlock(
			{
				...localizedBlock,
				isLoading: undefined,
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