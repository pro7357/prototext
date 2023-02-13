
import basic from './basic'

export default (i) => ({

	'blockBorderRootStyle': {
		position: 'absolute',
		left: 0,
		width: 5,
		height: '100%',
		display: 'flex',
		alignItems: 'center'
	},

	'blockBorderStyle': {
		width: '100%',
		height: '100%',
		borderRadius: 4,
	},

	// important
	'blockBorderStyle-1': {
		backgroundColor: basic(i).styledBlock.alert,
	},

	// question
	'blockBorderStyle-2': {
		backgroundColor: basic(i).styledBlock.quest
	},

	// positive
	'blockBorderStyle-3': {
		backgroundColor: basic(i).styledBlock.positive
	},

	// negative
	'blockBorderStyle-4': {
		backgroundColor: basic(i).styledBlock.negative
	},

	// AI
	'blockBorderStyle-9': {
		background: 'linear-gradient(to bottom, #06a3dd, #b7d904, #ffb200, #df6c75)',
		// background: 'linear-gradient(45deg, #fc5c7d, #6a82fb)'
	},

})