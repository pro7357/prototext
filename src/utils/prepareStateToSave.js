
import { store } from 'store'
import deepClone from 'globalUtils/deepClone'


export default (props = {}) => {

	const currentState = props.state || deepClone(store.getState())

	let reducedState = {
		editor: {
			content: currentState.editor.content,
			localeOptions: currentState.editor.localeOptions,
			pageWidth: currentState.editor.pageWidth,
			compactMenuMode: currentState.editor.compactMenuMode
		},
		exporter: currentState.exporter,
		presenter: currentState.presenter,
		encryption: currentState.encryption,
	}

	delete reducedState.exporter.selectedPages
	delete reducedState.exporter.pageSelectionToggler

	return reducedState

}