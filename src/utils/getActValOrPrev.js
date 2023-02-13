
export default (propId, state, action) => typeof action[propId] !== 'undefined'
	? action[propId]
	: state[propId]