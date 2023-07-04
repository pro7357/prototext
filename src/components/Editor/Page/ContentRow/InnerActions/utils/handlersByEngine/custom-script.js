
import completeResponseCards from '../completeResponseCards'

export default async props => {

	const {
		config,
		pageIndex,
		blockIndex,
		block,
	} = props

	const {
		customScript
	} = config

	let TEXT = block.content
	let STYLE = block.style

	let errorMessage

	try {

		eval(customScript)

	} catch (error) {
		errorMessage = error.message
	}

	TEXT  = String(TEXT)
	STYLE = Number(STYLE)

	let newCards = [{
		...block,
		content: TEXT,
		style: isNaN(STYLE) || STYLE === 0 ? undefined : STYLE
	}]

	completeResponseCards({
		responsePageIndex: pageIndex,
		responseBlockIndex: blockIndex,
		newCards,
		errorMessage
	})

}