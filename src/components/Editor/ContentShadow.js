
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

export default props => {

	const classes = useStyles()

	return <div className={clsx(
		classes.root,
		classes[props.side],
		props.withScrollbarOffset && classes.withScrollbarOffset
	)}/>

}


const useStyles = createUseStyles(theme => ({

	root: {
		pointerEvents: 'none',
		position: 'absolute',
		zIndex: 2,
		left: 0,
		right: 0,
		height: 48,
		overflow: 'hidden',
		'&:before': {
			content: '""',
			display: 'block',
			boxShadow: `0 0 32px 16px ${theme.background.default}`,
			width: '100%',
			height: 1,
			position: 'absolute',
			left: 0,
			right: 0,
		},
	},

	top: {
		top: -1,
		'&:before': {
			top: 0
		},
	},

	bottom: {
		bottom: -1,
		'&:before': {
			bottom: 0
		},
	},

	withScrollbarOffset: {
		left: 16,
		right: 16,
	},

}),{name: 'content-shadow'})
