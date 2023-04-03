
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id = null,
		onClick,
		isDisabled,
		isSmall,
		isMuted,
		isActive,
		isNotable,
		isDangerous,
		isSemiDangerous,
		isComplexNotable,
		children,
		hint,
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
				isDisabled && classes.isDisabled,
				className
			)}
			{...extraProps}
		>
			<div
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
				{children}
			</div>

			{hint && (
				<div className={classes.hint}>
					{hint}
				</div>
			)}

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
		position: 'relative',
		display: 'table',
		position: 'relative',
		'&:hover': {
			color: theme.textButton.notable.color,
			'& $hint': {
				display: 'block',
			},
			'&:before': {
				content: '" "',
				position: 'absolute',
				zIndex: 0,
				display: 'block',
				width: '100%',
				bottom: 0,
				left: 0,
				borderBottom: `1px solid ${theme.textButton.notable.color}`,
			},
		}
	},

	hint: {
		display: 'none',
		position: 'absolute',
		bottom: 'calc(100% + 4px)',
		left: 0,
		fontSize: 14,
		width: 150,
		padding: 5,
		background: theme.background.top,
		wordWrap: 'break-word',
		whiteSpace: 'break-spaces',
		borderRadius: 4,
		color: theme.text.default,
		'&:before': {
			content: '" "',
			position: 'absolute',
			zIndex: 0,
			display: 'block',
			width: '100%',
			bottom: -6,
			left: 0,
			height: 6
		},
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

	isDisabled: {
		cursor: 'not-allowed',
		color: [theme.text.default, '!important'],
	}

}),{name: 'txt-btn'})
