
import { store } from 'store'

import getPageName from 'sharedUtils/getPageName'
import getStyledTextBlock from './getStyledTextBlock'
import { css } from 'sharedUtils/blockStyling'
import formats from 'sharedUtils/fileFormats'
import { recognizeAll } from 'sharedUtils/blockTypes'

import {
	defOutputFilename
} from 'globalConstants'

const toJsonString = (content) => {
	return JSON.stringify(content)
}

const toJsString = (content, textareaMode) => {
	return `export default ` + JSON.stringify(
		content,
		null,
		textareaMode ? 3 : null
	)//.replaceAll(/'/g,`\\'`).replace(/"/g,`'`)
}

const toPlainString = (content) => {
	return content.flat().join('\n\n')
}


const toFile = (name, ext, data) => {
	return {
		name,
		ext,
		data
	}
}

/*

	Save in one file.

	JSON
	{
		name: 'file',
		ext: 'json',
		data: `[[page 1], [page 2]]`
	}

	JS
	{
		name: `file`,
		ext: `js`,
		data: `export default [[page 1],[page 2]]`
	}


	Save separate files for each page.

	JSON
	[

		{
			name: `file-1`,
			ext: 'json',
			markup: `[page 1]`
		},

		{
			name: `file-2`,
			ext: 'json',
			markup: `[page 2]`
		}

	]

	JS
	[
		{
			name: `file-1`,
			ext: `js`,
			data: `export default [page 1]`
		},

		{
			name: `file-2`,
			ext: `js`
			data: `export default [page 2]`
		}
	]

*/
export default (textareaMode) => {

	const globalState = store.getState()
	const editorState = globalState.editor
	const exporterState = globalState.exporter
	const outputDirectory = exporterState.outputDirectory

	const {
		selectedPages,
		format,
		allowLocales,
		allowBlockStyles,
		allowMergePages,
		outputFilename,
	} = exporterState

	const pages = editorState.content

	if(!pages || !pages.length || !selectedPages.length) {
		return ''
	}

	let result

	let isJson = format === 0
	let isJs   = format === 1
	let isMd   = format === 2
	let isTxt  = format === 3

	let isCodingFormats = isJson || isJs
	let isTextFormats   = isMd   || isTxt

	let ext = formats[format]


	const getBlock = (item) => {

		let {
			content,
			style,
			link
		} = item

		if(!allowBlockStyles) {
			return content
		}

		const type = recognizeAll(style, link, content)

		const {
			isInternalLink,
			isTags,
		} = type

		if(isInternalLink) {
			return 'Internal link: '+content
		}

		if(isTags) {
			return 'Tags: '+content
		}

		let linkedFile = link && link.filePath

		if(isCodingFormats) {

			let block = {
				v: content
			}

			if(style) {
				block.s = style
			}

			if(linkedFile) {
				block.f = linkedFile
			}

			return block

		}

		return getStyledTextBlock({
			visual: false,
			styleIndex: item.style - 1,
			content: item.content,
			linkedFile,
			ext
		})

	}

	result = selectedPages.reduce((done, selPageIndex) => {

		let page = pages[selPageIndex]

		// fl - first level (pages), sl - second level (locales or paragraphs)
		// Empty elements are not ignored.
		let targetContent = allowLocales ? page.content : page.content[0].content
		let pageMarkup = targetContent.reduce((fl, flItem, flItemIndex) => {
			return fl.concat([
				allowLocales
					? flItem.content.reduce((sl, slItem, slItemIndex) => {
						return sl.concat([
							getBlock(slItem)
						])
					},[])
					: getBlock(flItem)
			])
		},[])

		if(isTextFormats) {
			pageMarkup = toPlainString(pageMarkup)
		}

		if(!allowMergePages && !textareaMode) {
			if(isJson) {
				pageMarkup = toJsonString(pageMarkup)
			} else if(isJs) {
				pageMarkup = toJsString(pageMarkup)
			} else if(isMd) {
				if(allowBlockStyles) {
					pageMarkup = css(false) + '\n\n' + pageMarkup
				}
			}

			let filename = outputFilename
				? outputFilename +'-'+(selPageIndex+1)
				: getPageName(page)

			pageMarkup = toFile(filename, ext, pageMarkup)
		}

		return done.concat([pageMarkup])

	},[])

	// console.log('result',result)

	if(allowMergePages && !textareaMode) {
		if(isJson) {
			result = toJsonString(result)
		} else if(isJs) {
			result = toJsString(result)
		} else {
			result = toPlainString(result)
			if(allowBlockStyles && isMd) {
				result = css(false) + '\n\n' + result
			}
		}

		result = [toFile(outputFilename||defOutputFilename, ext, result)]
	}

	if(textareaMode) {

		// Transform an array of pages to a line suitable for the preview.
		if(isCodingFormats) {
			if(isJs) {
				result = allowMergePages
					? toJsString(result, true)
					: result.map((page,pageIndex) => toJsString(page, true)).join('\n\n')
			} else {
				result = JSON.stringify(result)
			}

		} else if(isTextFormats) {
			result = toPlainString(result)
		}
	}


	return textareaMode
		? result
		: {
			dst:  outputDirectory,
			files: result
		}

}