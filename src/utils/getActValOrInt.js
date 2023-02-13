
export default (propId, initialState, action) => typeof action[propId] !== 'undefined'
	? action[propId]
	: initialState[propId]