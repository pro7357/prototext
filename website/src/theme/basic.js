
import palette from './palette'

export default (i,desktop) => ({

	ambient: [
		'rgba(23, 22, 26, 0.7)',
		'rgba(113, 22, 171, 0.33)'
	][i],

	desktopLineBreaks: {
		'& span': {
			margin: [0, 4],
			'&:first-child': {
				marginLeft: 0
			},
			'&:last-child': {
				marginRight: 0
			},
			[desktop]: {
				margin: 0,
				display: 'block'
			}
		},

	}

})