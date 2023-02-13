
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'

export default props => {

	const {
		children,
		isInline
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, isInline && classes.isInline)}>
			{children}
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		color: theme.text.muted,
		fontFamily: 'monospace',
		fontSize: 14
	},

	isInline: {
		display: 'inline'
	}


}),{name: 'helper-shortcut'})