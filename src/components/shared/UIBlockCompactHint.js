
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		children,
		className
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(
			classes.root,
			className
		)}>
			<div className={classes.icon}>
				?
			</div>
			<div className={classes.content}>
				{children}
			</div>
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'&:hover': {
			'& $content': {
				display: 'block'
			},
			'&:after': {
				content: '" "',
				position: 'absolute',
				zIndex: 2,
				width: '100%',
				height: 12,
				top: '100%',
				left: 0,
			}
		}
	},

	icon: {
		fontSize: 18,
		color: theme.text.muted
	},

	content: {
		position: 'absolute',
		left: 0,
		bottom: '100%',
		display: 'none',
		whiteSpace: 'break-spaces',
		wordWrap: 'break-word',
		backgroundColor: theme.background.top,
		borderRadius: theme.rounded,
		padding: 10,
		fontSize: 16,
		width: '100%',
		overflowY: 'auto',
		maxHeight: '60vh',
		...theme.scrollbar,
		'& b': {
			padding: [6,0,3,0],
			display: 'inline-block'
		},
		'& span': {
			color: theme.text.active,
			fontWeight: 'normal'
		},

	}

}),{name: 'ui-block-compact-hint'})
