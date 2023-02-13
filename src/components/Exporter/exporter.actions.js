
import { store } from 'store'


export const setExporterState = payload => {
	store.dispatch({
		type: 'setExporterState',
		payload
	})
}


export const setSelectedPages = payload => {
	store.dispatch({
		type: 'setSelectedPages',
		payload
	})
}


export const togglePageSelection = (pages,targetPageIndex) => {
	store.dispatch({
		type: 'togglePageSelection',
		targetPageIndex,
		pages
	})
}


export const excludePage = targetPageIndex => {
	store.dispatch({
		type: 'excludePage',
		targetPageIndex,
	})
}


export const toggleAllPagesSelection = (pages, selectAll) => {
	store.dispatch({
		type: 'toggleAllPagesSelection',
		pages,
		selectAll
	})
}


export const setFormat = payload => {
	store.dispatch({
		lsKey: 'format',
		type: 'setFormat',
		payload
	})
}


export const setAllowLocales = payload => {
	store.dispatch({
		lsKey: 'allowLocales',
		type: 'setAllowLocales',
		payload
	})
}


export const setAllowBlockStyles = payload => {
	store.dispatch({
		lsKey: 'allowBlockStyles',
		type: 'setAllowBlockStyles',
		payload
	})
}


export const setAllowMergePages = payload => {
	store.dispatch({
		lsKey: 'allowMergePages',
		type: 'setAllowMergePages',
		payload
	})
}


export const setOutputDirectory = payload => {
	store.dispatch({
		lsKey: 'outputDirectory',
		type: 'setOutputDirectory',
		payload
	})
}


export const setOutputFilename = payload => {
	store.dispatch({
		lsKey: 'outputFilename',
		type: 'setOutputFilename',
		payload
	})
}


export const setPreview = payload => {
	store.dispatch({
		lsKey: 'isSchematicPreview',
		type: 'setPreview',
		payload
	})
}
