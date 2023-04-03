
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		label,
		onClick,
		onInput,
		isActive,
		isNotable,
		isDisabled,
		children,
		isSmall,
		withoutPadding,
		className
	} = props


	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				withoutPadding && classes.withoutPadding,
				className
			)}
			onClick={() => {
				if(isDisabled) return null
				if(onClick) {
					onClick(!isActive)
				} else if(onInput) {
					onInput(!isActive)
				}
			}}
		>
			{label && (
				<div
					className={clsx(
						classes.label,
						isNotable && classes.isNotable,
					)}
				>
					{label}
				</div>
			)}
			<div
				className={clsx(
					classes.switch,
					isSmall && classes.smallSwitch,
					(isActive && !isDisabled) && classes.isActive,
					isDisabled && classes.isDisabled
				)}
			/>
		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		'-webkit-user-select': 'none',
		cursor: 'pointer',
		display: 'flex',
		width: '100%',
		padding: [10,12],
		gap: 4,
		alignItems: 'center',
		justifyContent: 'space-between',
		'&:hover':{
			'& $switch': {
				backgroundColor: theme.switch.focused.background,

			},
			'& $isActive': {
				backgroundColor:[ theme.switch.active.background,'!important'],
			}
		}
	},

	withoutPadding: {
		padding: 0
	},

	switch: {
		backgroundColor: theme.switch.background,
		padding: 10,
		borderRadius: theme.round,
	},

	smallSwitch: {
		padding: 6,
	},

	isActive: {
		backgroundColor: theme.switch.active.background,
	},

	isNotable: {
		color: theme.textButton.notable.color,
	},

	isDisabled: {
		cursor: 'not-allowed',
		'&:hover':{
			backgroundColor: theme.switch.background,
		}
	},

	label: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		maxWidth: '100%',
	}

}),{name: 'switch'})
