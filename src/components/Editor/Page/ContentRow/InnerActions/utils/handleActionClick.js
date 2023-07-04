
import allActionFieldModels from 'settingsModels/cardActions/cardAction'
import getActualBlock from 'editorUtils/getActualBlock'
import { showSettings } from 'layoutActions'
import { setLastActionIndex } from 'editorActions'


export default props => {

	const {
		sharedEditorProps,
		cardActionIndex,
		engine,
		currentDoc,
		pageIndex,
		localeIndex,
		blockIndex,
		cardAction,
		promptMode,
	 } = props

	// Keep the current card action index in the Editor state
	// and switch user focus on the current card.
	setLastActionIndex(
		cardActionIndex,
		pageIndex,
		localeIndex,
		blockIndex,
	)


	let handler
	let engineFieldModels
	let outputContentType

	try {

		handler = require(`./handlersByEngine/${engine}`).default

		engineFieldModels = require(
			`settingsModels/cardActions/${engine}`
		).default

		for (const option of allActionFieldModels.byId.engine.options) {
			if(option.value === engine) {
				outputContentType = option.outputContentType
				break
			}
		}

	} catch (error) {
		console.log('An undefined action handler or model', engine, error.message)
		return
	}

	if(outputContentType !== 'text' && !currentDoc && isDesktopBuild) {
		alert(
			`💾 Please save the document before using this function. It 's necessary. The app will attach the generated files near the saved document in the 'assets' folder.`
		)
		return
	}

	const actualBlock = getActualBlock({
		pageIndex,
		localeIndex: 0,
		blockIndex
	})

	const actualLocalizedBlock = getActualBlock({
		pageIndex,
		localeIndex,
		blockIndex
	})

	let missingReqFields = []

	let config = engineFieldModels.allIds.reduce((config, fieldId) => {

		const model = engineFieldModels.byId[fieldId]

		const {
			label,
			isRequired,
			defValue,
		} = model

		let value = cardAction[fieldId] === undefined
			? defValue
			: cardAction[fieldId]

		if(
			isRequired &&
			(
				value === '' ||
				value === null ||
				value === undefined
			)
		) {
			missingReqFields.push(label)
		}

		config[fieldId] = value

		return config

	},{})

	const isDuoPromptMode = promptMode === 'duo'

	// Check all required fields before running. Display the notification and settings screen if necessary.

	if(missingReqFields.length) {
		alert(
			`Please fill in the following required field(s) "${missingReqFields.join(', ')}" in the current action settings.`
		)
		showSettings()
		return
	}

	// Run.
	handler({
		config,
		isDuoPromptMode,
		block: actualBlock,
		localizedBlock: actualLocalizedBlock,
		pageIndex,
		localeIndex,
		blockIndex,
		sharedEditorProps
	})

}