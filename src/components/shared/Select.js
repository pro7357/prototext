
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id,
		value,
		options,
		optionValueHandler,
		optionLabelHandler,
		onChange,
		onInput,
		className,
		isTransparent,
		isCompact,
		isDisabled,
		insideUIBlock,
	} = props


	const classes = useStyles()

	return (
		<select
			id={id}
			value={value}
			onChange={e => {
				if(isDisabled) return null
				let newValue = e.target.value
				if(onChange) {
					onChange(newValue)
				} else if(onInput) {
					onInput(newValue)
				}
			}}
			disabled={isDisabled}
			className={clsx(
				classes.root,
				insideUIBlock && classes.insideUIBlock,
				isTransparent && classes.isTransparent,
				isCompact && classes.isCompact,
				isDisabled && classes.isDisabled,
				className
			)}
		>
			{options.map((option, optionIndex)=>{
				let value = optionValueHandler(option, optionIndex)
				return (
					<option disabled={value===''} value={value}>
						{optionLabelHandler(option, optionIndex)}
					</option>
				)
			})}
		</select>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		width: '100%',
		padding: 0,
		color: 'inherit',
		font: 'inherit',
		textAlign: 'left',
		padding: [10,12],
		minHeight: 41,
		border: 'none',
		borderRadius: theme.rounded,
		backgroundColor: theme.input.background,
		outline: 'none',
		appearance: 'none',
		cursor: 'pointer',
		'&:focus': {
			color: theme.text.active,
		},
		'&:hover': {
			color: theme.text.active,
			textDecoration: 'underline'
		}
	},

	isDisabled: {
		cursor: 'default',
		opacity: .3,
		'&:hover': {
			color: 'inherit',
			textDecoration: 'none',
		}
	},

	isTransparent: {
		backgroundColor: 'transparent'
	},

	insideUIBlock: {
		backgroundColor: theme.input.insideUIBlock.background,
	},

	isCompact: {
		padding: 0,
		minHeight: 'auto'
	}

}),{name: 'select'})
