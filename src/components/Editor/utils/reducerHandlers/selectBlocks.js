
import getTimestamp from 'globalUtils/getTimestamp'

export default (initialState, state, action) => {

	let range = action.range

	return {
		...state,
		timestamp: getTimestamp(),
		selRange: range ? range.sort() : null
	}

}