
const layoutIds = [
	'editor',    // 0
	'exporter',  // 1
	'helper',    // 2
	'protector', // 3
	'presenter', // 4
	'settings',  // 5
]

const initialState = isDesktopBuild ? 0 : 0

export default (state = initialState, action) => {

	const type = action.type

	if(type === 'switchLayout') {
		return action.payload
	}

	if(type === 'togglePresenter') {
		return state === 4 ? 0 : 4
	}

	return state

}