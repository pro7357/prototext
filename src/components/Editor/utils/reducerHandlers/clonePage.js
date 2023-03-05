
import getTimestamp from 'globalUtils/getTimestamp'
import getUID from 'globalUtils/getUID'
import createBlock from '../createBlock'


export default (initialState, state, action) => {

	let content = state.content
	let targetPageIndex = action.targetPageIndex

	return {
		...state,
		timestamp: getTimestamp(),
		content: content.reduce((pages, page, pageIndex)=>{

			if(pageIndex === targetPageIndex) {
				return pages.concat(
					page,
					{
						...page,
						id: getUID(),
						content: page.content.reduce((locales, locale, localeIndex) => {
							return locales.concat(
								{
									...locale,
									id: getUID(),
									content: locale.content.reduce((blocks, block, blockIndex) => {

										if(!block) {
											block = createBlock()
										}

										return blocks.concat({
											...block,
											content: blockIndex === 0
												? `Copy: ${block.content||`Untitled`}`
												: block.content,
											id: getUID() // Change block ids for the clone.
										})

									}, [])
								}
							)
						}, [])
					}
				)
			}

			return pages.concat(page)

		},[])

	}

}