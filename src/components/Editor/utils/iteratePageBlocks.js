

export default props => {

	const {
		content,
		targetPageIndex,
		handler
	} = props

	return content.reduce((pages, page, pageIndex)=>{
		return pages.concat(
			pageIndex === targetPageIndex
				? {
					...page,
					content: page.content.reduce((locales, locale, localeIndex)=>{
						return locales.concat({
							...locale,
							content: locale.content.reduce((blocks,block,blockIndex) => {

								// return updated blocks
								return handler(
									locale,
									localeIndex,
									blocks,
									block,
									blockIndex,
								)

							},[])
						})
					},[])
				}
				: page
			)
		},[])

}