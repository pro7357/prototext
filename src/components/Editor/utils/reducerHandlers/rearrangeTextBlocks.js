
import getTimestamp from 'globalUtils/getTimestamp'


export default (initialState, state, action) => {

	let content = state.content

	let selRange = state.selRange
	let selMode = Boolean(selRange)
	let selection

	if(selMode) {

		let tpi = state.targetPageIndex
		let tli = state.targetLocaleIndex
		let srcPageBlocks = state.content[tpi].content[tli].content

		selection = selRange.reduce((done, selectedBlockIndex) => {
			return done.concat(
				srcPageBlocks[selectedBlockIndex]
			)
		},[])

	}

	return {
		...state,
		timestamp: getTimestamp(),
		content: content.reduce((pages, page, pageIndex)=>{

			page = {
				...page,
				content: page.content.reduce((locales, locale, localeIndex)=>{

					let srcLocale = content[action.srcPageIndex].content[localeIndex]
					let dstLocale = content[action.dstPageIndex].content[localeIndex]
					let dstPQt    = dstLocale && dstLocale.content.length

					locale = {
						...locale,
						content: locale.content.reduce((blocks, block, i)=>{

							// Exclude text block[s] (source)
							if(pageIndex === action.srcPageIndex) {
								if(
									selMode
										? selRange.includes(i)
										: i === action.srcBlockIndex
								) {
									return blocks
								}
							}

							// Include text block
							if(pageIndex === action.dstPageIndex) {

								let srcBlock = srcLocale && srcLocale.content[action.srcBlockIndex]

								if(i === action.dstBlockIndex) {
									// Before
									return blocks.concat(
										selMode ? selection : srcBlock,
										block
									)
								} else if(
									action.dstBlockIndex === dstPQt &&
									i === dstPQt - 1
								) {
									// After
									return blocks.concat(
										block,
										selMode ? selection : srcBlock
									)
								}
							}

							return blocks.concat(block)

						},[])
					}

					return locales.concat(locale)

				},[])
			}

			return pages.concat(page)

		},[])
	}

}