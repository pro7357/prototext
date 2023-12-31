
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		children,
		isCentred,
		className
	} = props

	const classes = useStyles()

	return (
		<h2
			className={clsx(
				classes.root,
				isCentred && classes.centred,
				className
			)}
		>
			{children}
		</h2>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		...theme.desktopLineBreaks,
		display: 'block',
		margin: 0,
		padding: 0,
		fontSize: '1.4em',
		[theme.desktop]: {
			fontSize: '1.8em',
		}
	},

	centred: {
		textAlign: 'center'
	}


}),{name: 'subheading'})