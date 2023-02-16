
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Search from './Search'


export default props => {

	// const {
	// } = props

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<Search/>

		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		...theme.draggableArea,
		position: 'absolute',
		zIndex: 3,
		top: 0,
		left: 24,
		right: 24,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		padding: [28,24,16,24],
		boxShadow: `0 0 45px 8px ${theme.shadow.default}`,
		backgroundColor: theme.background.default,
		animation: `$slideIn 500ms ease`,
		borderRadius: [0,0,theme.rounded,theme.rounded],
	},

	'@keyframes slideIn': {
		'0%': {
			opacity: 0,
			transform: 'translateY(-200%)'
		},
		'100%': {
			opacity: 1,
			transform: 'translateY(0)'
		}
	},


}),{name: 'topbar'})
