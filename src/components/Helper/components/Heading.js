
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

export default props => {
	const classes = useStyles()
	return (
		<div
			className={clsx(
				classes.root,
				props.offsetTop && classes.offsetTop
			)}
		>
			{props.children}
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		// color: theme.text.active,
		fontSize: 18,
		fontWeight: 'bold'
	},

	offsetTop: {
		marginTop: 16
	}

}),{name: 'helper-text-part-heading'})