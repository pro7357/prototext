
const { getHash32, getIv16, encrypt } = require('./crpyto')

const {
	defOutputDirectory,
	defOutputFilename
} = require('../constants/index')


module.exports = (state, handler) => {

	const outputDirectory = state.exporter.outputDirectory
	const outputFilename = state.exporter.outputFilename

	return {
		...state,
		exporter: {
			...state.exporter,
			outputDirectory: !outputDirectory || outputDirectory === defOutputDirectory
				? outputDirectory
				: handler(outputDirectory),
			outputFilename: !outputFilename || outputFilename === defOutputFilename
				? outputFilename
				: handler(outputFilename),
		},
		editor: {
				...state.editor,
				content: state.editor.content.reduce((pages, page)=>{
					 return pages.concat({
						...page,
						content: page.content.reduce((locales, locale)=>{
								return locales.concat({
									 ...locale,
									 content: locale.content.reduce((blocks, block)=>{
										 let _block = {
												...block,
												content: handler(block.content)
										}
										if(block.link && block.link.filePath){
											block.link.filePath = handler(block.link.filePath)
										}
										return blocks.concat(_block)
									 },[])
								})
						},[])
					 })
				},[])
		}
	 }

}