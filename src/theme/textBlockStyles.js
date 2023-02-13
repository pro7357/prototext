
import basic from './basic'

export default (i) => ({

	// important
	'blockStyle-1': {

	},

	// question
	'blockStyle-2': {

	},

	// positive
	'blockStyle-3': {

	},

	// negative
	'blockStyle-4': {

	},

	// muted
	'blockStyle-5': {
		color: basic(i).text.muted,
		fontStyle: 'italic'
	},

	// bold
	'blockStyle-6': {
		fontWeight: 'bold',
	},

	// heading
	'blockStyle-7': {
		fontWeight: 'bold',
		fontSize: 24,
		lineHeight: 1,
	},

})