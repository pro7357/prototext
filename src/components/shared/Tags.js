
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


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
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		gap: 8
	},

}),{name: 'tags'})
