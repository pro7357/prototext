
import presentationModels from '../Presenter/models/presentation'

/*

	text: {
		heading: {
			align: 'center',
			size: 40,
		},
		normal: {
			align: 'left',
			size: 18,
		},
	}
*/

let initialState = {
	sidebarMode: true,
	// targetSlideIndex: 0,
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


		case 'switchPresenterMode': {
			return {
				...state,
				[action.key]: action.value
			}
		}


		case 'togglePresenterMode': {
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


		// case 'setPresenterSlideIndex':
		// 	return {
		// 		...state,
		// 		targetSlideIndex: action.payload
		// 	}


		default:
			return state

	}
}