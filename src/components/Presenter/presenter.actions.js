
import { store } from 'store'


export const setPresenterState = payload => {
	store.dispatch({
		type: 'setPresenterState',
		payload
	})
}

export const switchPresenterMode = (key,value) => {
	store.dispatch({
		type: 'switchPresenterMode',
		key,
		value
	})
}

export const togglePresenterMode = key => {
	store.dispatch({
		type: 'togglePresenterMode',
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