
import { useEffect, useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id,
		value,
		getOptions,
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

	const [options, setOptions] = useState(null)

	useEffect(() => {

		async function fetchData() {
			if (getOptions) {
			  const actualOptions = await getOptions()
			  setOptions(actualOptions)
			} else {
			  setOptions(props.options)
			}
		 }

		fetchData()

	},[props.options, getOptions])



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
			{options && options.map((option, optionIndex)=>{
				let value = optionValueHandler
					? optionValueHandler(option, optionIndex)
					: option.value
				return (
					<option disabled={value===''} value={value}>
						{optionLabelHandler
							? optionLabelHandler(option, optionIndex)
							: option.label
						}
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
