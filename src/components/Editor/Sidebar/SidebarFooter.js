
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		side
	} = props

	const classes = useStyles()

	// console.log('Render SidebarFooter')

	return (
		<div className={clsx(classes.root, classes[side+'Side'])}>
			{props.children}
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		gap: 10,
		padding: [24],
		fontSize: 16,
	},

	leftSide: {
		alignItems: 'flex-start',
	},

	rightSide: {
		// alignItems: 'flex-end',
		// textAlign: 'right'
	},

}),{name: 'sidebar-footer'})
