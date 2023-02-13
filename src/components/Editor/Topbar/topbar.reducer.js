
const initialState = {
	isActive: isDesktopBuild ? false : !true,
	searchText: null,
	searchTags: null,
	allSearchTags: null,
	searchByTags: false,
	searchMatchCase: false,
	searchInAllPages: false,
}

const searchText2Tags = text => text && text.split(',').reduce((done,cur) => {
	let tag = cur.trim().toLowerCase()
	return tag && !done.includes(tag) ? done.concat(tag) : done
},[])

export default (state = initialState, action) => {

	switch (action.type) {

		case 'toogleTopbar':
			return {
				...state,
				isActive: action.payload,
				//searchText: action.payload === false ? null : state.searchText
			}

		case 'setSearchText':
			return {
				...state,
				searchText: action.payload,
				searchTags: searchText2Tags(action.payload)
			}

		case 'activateSearchByTags':
				return {
					...state,
					isActive: true,
					searchByTags: true,
					searchText: action.payload,
					searchTags: searchText2Tags(action.payload)
				}

		case 'toogleSearchByTags':
			return {
				...state,
				searchByTags: !state.searchByTags,
			}

		case 'toggleSearchMatchCase':
			return {
				...state,
				searchMatchCase: !state.searchMatchCase
			}

		case 'toggleGlobalSearch':
			return {
				...state,
				searchInAllPages: !state.searchInAllPages
			}

		default:
			return state

	}

}