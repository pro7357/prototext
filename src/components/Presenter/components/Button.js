
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

export default props => {

	const {
		children,
		contrastDarkMode,
		onClick,
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				contrastDarkMode && classes.darkMode
			)}
			onClick={onClick}
		>
			{children}
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		// width: 38,
		height: 27,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		color: theme.textButton.notable.color,
		// backgroundColor: theme.button.glass.background,
		// borderRadius: theme.rounded,
		'& rect': {
			fill: theme.textButton.notable.color
		}
	},

	darkMode: {
		backgroundColor: 'white',
		color: 'black',
		'& rect': {
			fill: 'black'
		}
	}


}),{name: 'p-s-b'})