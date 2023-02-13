
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import IconDel from './Icons/IconDel'

export default props => {

	const {
		onClick,
		className
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(classes.root, className)}
			onClick={onClick}
		>
			<IconDel />
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		cursor: 'pointer',
		'&:hover': {
			'& svg': {
				fill: theme.button.dangerous.background
			}
		}
	},


}),{name: 'reset-button'})
