
import getTimestamp from 'globalUtils/getTimestamp'
import { isTextBlock } from 'sharedUtils/blockTypes'

export default (initialState, state, action) => {

	let content = state.content

	return {
		...state,
		timestamp: getTimestamp(),
		localeOptions: state.localeOptions.reduce((ls,l,i) => {

			// Exclude localization option (source).
			if(i === action.srcLocaleIndex) {
				return ls
			}

			// Include localization option.
			if(i === action.dstLocaleIndex) {
				let srcLocaleOption = state.localeOptions[action.srcLocaleIndex]
				return ls.concat(l,srcLocaleOption)
			}

			return ls.concat(l)

		},[]),
		rightSideFocus: action.dstLocaleIndex > action.srcLocaleIndex
			? action.dstLocaleIndex
			: action.dstLocaleIndex + 1,
		content: content.reduce((pages, page, pageIndex)=>{

			return pages.concat({
				...page,
				content: page.content.reduce((locales, locale, localeIndex)=>{

					// Exclude localization (source).
					if(localeIndex === action.srcLocaleIndex) {
						return locales
					}

					if(action.newOriginalMode && localeIndex === 1) {

						// The case when it is necessary to move the original localization.
						// So the focus in the stack shifts to the next element, with index 1.
						// Delegate it the stylization of content.

						const originalLocale = page.content[0]

						locale.content = locale.content.reduce((blocks, block, blockIndex) => {

							let originalBlock = originalLocale.content[blockIndex]
							let originalBlockStyle = originalBlock && originalBlock.style
							let isText = isTextBlock(originalBlockStyle)

							return blocks.concat({
								...block,
								style: isText
									? originalBlockStyle
									: undefined
							})

						},[])
					}

					// Include localization.
					if(localeIndex === action.dstLocaleIndex) {

						let srcLocale = content[pageIndex].content[action.srcLocaleIndex]

						if(action.newOriginalMode) {

							// Complete the movement of original localization.
							// Clean stylization.

							srcLocale.content = srcLocale.content.reduce((blocks, block, blockIndex) => {

								let curBlockStyle = block && block.style
								let isText = isTextBlock(curBlockStyle)

								return blocks.concat({
									...block,
									style: isText
										? undefined
										: curBlockStyle
								})

							},[])
						}

						return locales.concat(locale,srcLocale)
					}

					return locales.concat(locale)

				},[])
			})

		},[])
	}

}