
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		onClick,
		isActive,
		isStatic,
		children,
		className
	} = props


	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				isActive && classes.active,
				isStatic && classes.static,
				className
			)}
			onClick={onClick}
		>
			{children}
		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		'-webkit-user-select': 'none',
		backgroundColor: theme.tag.background,
		padding: [6, 16],
		marginBottom: 2,
		borderRadius: theme.round,
		cursor: 'pointer',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		maxWidth: '100%',
		'&:hover':{
			backgroundColor: theme.tag.focused.background,
			color: theme.text.active,
		}
	},

	active: {
		backgroundColor: theme.tag.active.background,
		color: theme.text.active,
		'&:hover':{
			backgroundColor: theme.tag.active.background,
		}
	},

	static: {
		cursor: 'default',
		'-webkit-user-select': 'auto',
		'&:hover':{
			backgroundColor: theme.tag.background,
			color: 'inherit'
		}
	}

}),{name: 'tag'})
