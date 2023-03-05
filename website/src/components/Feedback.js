
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import Link from './Link'


export default props => {

	const classes = useStyles()

	return (
		<div onClick={e => e.target.outerHTML = ''}>
		<Link
			className={classes.root}
			url='https://forms.gle/vAkaCzPxA3muGXJv7'
			isExternal
			isNotable
		>
			Your thoughts, please ✍️
		</Link>
		</div>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		position: 'fixed',
		zIndex: 10,
		bottom: 20,
		right: 20,
		padding: 10,
		boxShadow: `0 2px 24px ${theme.shadow.default}`,
		backgroundColor: theme.background.default,
		borderRadius: theme.rounded,
		fontSize: 12,
		[theme.desktop]: {
			fontSize: 14
		}
	},


}),{name: 'feedback'})