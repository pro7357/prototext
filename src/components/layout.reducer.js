
const layoutIds = [
	'welcome',   // 0
	'editor',    // 1
	'exporter',  // 2
	'helper',    // 3
	'protector', // 4
	'presenter', // 5
	'settings',  // 6
]

const initialState = isDesktopBuild ? 0 : 0

export default (state = initialState, action) => {

	const type = action.type

	if(type === 'switchLayout') {
		return action.payload
	}

	return state

}