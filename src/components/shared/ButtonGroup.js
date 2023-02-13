
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id,
		onClick,
		value,
		options,
		upperCase,
		className
	} = props

	if(!options || options.length < 1) {
		return null
	}

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				className
			)}
		>
			{options.map((option, optionIndex) => {
				let isActive = optionIndex === value
				return (
					<div
						className={clsx(
							classes.item,
							isActive && classes.isActive
						)}
						style={{
							flexBasis: `${ 100 / options.length}%`
						}}
						onClick={() => {
							onClick(optionIndex)
						}}
					>
						{upperCase ? option.toUpperCase() : option}
					</div>
				)
			})}
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
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: theme.rounded,
		overflow: 'hidden'
	},

	item: {
		padding: [6,8],
		textAlign: 'center',
		backgroundColor: theme.buttonGroup.background,
		'&:hover': {
			backgroundColor: theme.buttonGroup.focused.background,
		},
		'&:first-child': {
			paddingLeft: 12
		},
		'&:last-child': {
			paddingRight: 12
		}
	},

	isActive: {
		backgroundColor: theme.buttonGroup.active.background,
		color: theme.text.active,
		'&:hover':{
			backgroundColor: theme.buttonGroup.active.background,
		}
	}

}),{name: 'btn-group'})
