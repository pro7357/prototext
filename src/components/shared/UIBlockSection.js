
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import UIBlockLabel from './UIBlockLabel'


export default props => {

	const {
		children,
		className
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				className
			)}
		>
			{children}
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		textAlign: 'left',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 8,
		position: 'relative'
	},


}),{name: 'ui-block-section'})