
import { store } from 'store'

export const switchLayout = (payload) => {
	store.dispatch({
		type: 'switchLayout',
		payload
	})
}

export const showWelcome = () => {
	switchLayout(0)
}

export const showEditor = () => {
	switchLayout(1)
}

export const showExporter = () => {
	switchLayout(2)
}

export const showHelper = () => {
	switchLayout(3)
}

export const showProtector = () => {
	switchLayout(4)
}

export const togglePresenter = () => {
	switchLayout(5)
}

export const showSettings = () => {
	switchLayout(6)
}