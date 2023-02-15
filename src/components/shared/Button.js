
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id,
		onClick,
		isDisabled,
		isNotable,   // blue
		isDangerous, // red
		isLarge,
		isCompact,
		children,
		url,
		className
	} = props


	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				isNotable && classes.notable,
				isDangerous && classes.dangerous,
				isLarge && classes.large,
				isCompact && classes.compact,
				className
			)}
			onClick={e => {

				if(!onClick || isDisabled) return false

				if(isDangerous) {
					if (window.confirm('Do you really want to do it?')) {
						onClick(e)
					}
					return
				}
				onClick(e)
			}}
		>
			{(url && !isDisabled)
				? (
					<a className={classes.link} href={url} target='_blank'>
						{children}
					</a>
				)
				: children
			}
		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		'-webkit-user-select': 'none',
		cursor: 'pointer',
		fontSize: 18,
		width: '100%',
		padding: [8,16],
		color: theme.text.active,
		textAlign: 'center',
		borderRadius: theme.rounded,
		backgroundColor: theme.button.background,
		position: 'relative',
		'&:hover': {
			backgroundColor: theme.button.focused.background,
		}
	},

	link: {
		color: 'inherit',
		textDecoration: 'none',
		'&:before': {
			content: '" "',
			display: 'block',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		}
	},

	notable: {
		color: theme.button.notable.color,
		backgroundColor: theme.button.notable.background,
		'&:hover': {
			backgroundColor: theme.button.notable.focused.background,
		}
	},

	dangerous: {
		color: theme.button.dangerous.color,
		backgroundColor: theme.button.dangerous.background,
		'&:hover': {
			backgroundColor: theme.button.dangerous.focused.background,
		}
	},

	large: {
		padding: 10,
	},

	compact: {
		display: 'inline-block',
		width: 'auto'
	}

}),{name: 'btn'})
