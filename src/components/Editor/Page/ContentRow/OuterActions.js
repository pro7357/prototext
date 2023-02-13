
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import IconDnd from 'sharedComponents/Icons/IconDnd'
import IconDel from 'sharedComponents/Icons/IconDel'

export default props => {

	const {
		className
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, className)}>
			<IconDnd/>
			<IconDel/>
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex', // delegated from parent
		position: 'absolute',
		zIndex: -1,
		alignItems: 'center',
		justifyContent: 'space-between',
		top: 0,
		left: -20,
		right: -20,
		bottom: 0,
		padding: [0, 5],
		'& svg':{
			fill: theme.icon
		}
	}

}),{name: 'outer-row-actions'})