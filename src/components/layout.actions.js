
import { store } from 'store'


export const switchLayout = (payload) => {
	store.dispatch({
		type: 'switchLayout',
		payload
	})
}

export const showExporter = (payload) => {
	switchLayout(1)
}

export const showEditor = (payload) => {
	switchLayout(0)
}

export const showHelper = (payload) => {
	switchLayout(2)
}

export const showProtector = (payload) => {
	switchLayout(3)
}

export const showSettings = (payload) => {
	switchLayout(5)
}

export const togglePresenter = () => {
	store.dispatch({
		type: 'togglePresenter'
	})
}