
import { store } from 'store'


export const toogleTopbar = payload => {
	store.dispatch({
		type: 'toogleTopbar',
		payload
	})
}


export const setSearchText = payload => {
	store.dispatch({
		type: 'setSearchText',
		payload
	})
}


export const resetSearchText = () => {
	setSearchText('')
}


export const activateSearchByTags = payload => {
	store.dispatch({
		type: 'activateSearchByTags',
		payload
	})
}


export const toogleSearchByTags = () => {
	store.dispatch({
		type: 'toogleSearchByTags'
	})
}


export const toggleSearchMatchCase = () => {
	store.dispatch({
		type: 'toggleSearchMatchCase',
	})
}


export const toggleGlobalSearch = () => {
	store.dispatch({
		type: 'toggleGlobalSearch',
	})
}