
import presentationModels from '../Presenter/models/presentation'


let initialState = {
	sidebarMode: true,
}

presentationModels.allIds.forEach((id) => {
	const model = presentationModels.byId[id]
	initialState[id] = model.defValue
})


export default (state = initialState, action) => {

	switch (action.type) {

		case 'setPresenterState':
			return {
				...initialState,
				...action.payload,
			}


		case 'setPresenterProperty': {
			return {
				...state,
				[action.key]: action.value
			}
		}


		case 'togglePresenterProperty': {
			return {
				...state,
				[action.key]: !state[action.key]
			}
		}


		case 'setPresenterLocale':
			return {
				...state,
				locale: action.payload
			}

		default:
			return state

	}
}