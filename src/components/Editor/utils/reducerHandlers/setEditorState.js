
import getTimestamp from 'globalUtils/getTimestamp'
import getActValOrInt from 'globalUtils/getActValOrInt'

export default (initialState, state, action) => ({
	...state,
	timestamp: getTimestamp(),
	leftSideFocus: getActValOrInt('leftSideFocus', initialState, action),
	rightSideFocus: getActValOrInt('rightSideFocus', initialState, action),
	pageWidth: getActValOrInt('pageWidth', initialState, action),
	content: getActValOrInt('content', initialState, action),
	localeOptions: getActValOrInt('localeOptions', initialState, action),
	compactMenuMode: getActValOrInt('compactMenuMode', initialState, action)
})