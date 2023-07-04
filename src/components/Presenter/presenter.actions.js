
import { store } from 'store'


export const setPresenterState = payload => {
	store.dispatch({
		type: 'setPresenterState',
		payload
	})
}

export const setPresenterProperty = (key,value) => {
	store.dispatch({
		type: 'setPresenterProperty',
		key,
		value
	})
}

export const togglePresenterProperty = key => {
	store.dispatch({
		type: 'togglePresenterProperty',
		key
	})
}


export const setPresenterLocale = payload => {
	store.dispatch({
		type: 'setPresenterLocale',
		payload
	})
}

// export const setPresenterSlideIndex = payload => {
// 	store.dispatch({
// 		type: 'setPresenterSlideIndex',
// 		payload
// 	})
// }