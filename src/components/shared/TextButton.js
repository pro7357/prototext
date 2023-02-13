
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id = null,
		onClick,
		isSmall,
		isMuted,
		isActive,
		isNotable,
		isDangerous,
		isSemiDangerous,
		isComplexNotable,
		children,
		className,
		extraProps = {},
	} = props


	const classes = useStyles()

	return (
		<div
			id={id}
			className={clsx(
				classes.root,
				isSmall && classes.isSmall,
				isMuted && classes.isMuted,
				isActive && classes.isActive,
				isNotable && classes.isNotable,
				(isDangerous || isSemiDangerous) && classes.isDangerous,
				isComplexNotable && classes.isComplexNotable,
				className
			)}
			onClick={e => {

				if(!onClick) return false

				if(isDangerous) {
					if (window.confirm('Do you really want to do it?')) {
						onClick(e)
					}
					return
				}
				onClick(e)
			}}
			{...extraProps}
		>
			{children}
		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		'-webkit-user-select': 'none',
		cursor: 'pointer',
		fontSize: 16,
		whiteSpace: 'nowrap',
		'&:hover': {
			textDecoration: 'underline'
		}
	},

	isSmall: {
		fontSize: 14,
	},

	isMuted: {
		color: theme.text.muted
	},

	isActive: {
		color: theme.textButton.active.color,
	},

	isNotable: {
		color: theme.textButton.notable.color,
	},

	isComplexNotable: {
		'& span': {
			color: theme.textButton.notable.color,
		}
	},

	isDangerous: {
		color: theme.textButton.dangerous.color,
	},

}),{name: 'txt-btn'})
