
import getTimestamp from 'globalUtils/getTimestamp'

export default (initialState, state, action) => ({
	...state,
	timestamp: getTimestamp()
})