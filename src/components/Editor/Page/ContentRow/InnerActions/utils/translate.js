
import { store } from 'store'
import requestElectronApi from 'globalUtils/requestElectronApi'
import { askChatGPT } from 'globalUtils/ai/openai/chatGPT'
import { localesDict } from 'globalUtils/allLocaleOptions'
import { showSettings } from 'layoutActions'
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

	const state = store.getState()
	const appSettings = state.settings

	const isCGPTEngine = appSettings.localizationEngine == 'cgpt'
	const openAIApiKey = appSettings.openAIApiKey
	let promptInjection = appSettings.localizationExtraContext

	if(isCGPTEngine) {
		if(!openAIApiKey) {
			alert(
				'OpenAI API key not configured. The app will now open the settings window.'
			)
			showSettings()
			return
		}
	}

	const btnNode = e.target
	const originalBlockNode = btnNode.parentNode.parentNode.parentNode.children[0].children[1]
	const localizedBlockNode = btnNode.parentNode.parentNode.parentNode.children[1].children[1]

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
		// alert('Translation service is not available.')
	}

	let originalText = originalBlockNode.innerText

	if(!originalText) {
		onError()
		return
	}

	let translation

	if(isCGPTEngine) {

		// OpenAI ChatGPT

		let prompt = `Translate this into`

		if(promptInjection) {
			prompt = promptInjection + ` ` + prompt
		} else {
			prompt += ` standard`
		}

		prompt += ` ` + localesDict[dstLang].name

		prompt += `: ` + originalText

		translation = await askChatGPT({
			prompt,
			apiKey: openAIApiKey,
			modelId: appSettings.chatGPTModelId,
			temperature: appSettings.chatGPTTemperature,
			limitTokens: appSettings.chatGPTLimitTokens,
		})

	} else {

		// Microsoft Traslator

		translation = await requestElectronApi('translate', {
			text: originalText,
			srcLang,
			dstLang
		})

	}

	let newLocalizedContent = translation &&
		(isCGPTEngine
			? translation.text
			: translation
		)

	if(newLocalizedContent) {
		updBlock(
			{
				...localizedBlock,
				isLoading: undefined,
				content: newLocalizedContent
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