
import { createUseStyles } from 'react-jss'

export default props => {

	const classes = useStyles()

	return (
		<div className={classes.root}/>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: -10,
		width: '100% !important',
		height: 5,
		borderRadius: 5,
		backgroundColor: theme.mda,
		opacity: 0,
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			zIndex: 1,
			top: -6,
			left: 0,
			right: 0,
			bottom: -6
		},
	},


}),{name: 'mda'})