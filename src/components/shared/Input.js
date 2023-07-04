
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import ResetButton from './ResetButton'

export default props => {

	const {
		id,
		onInput,
		onChange,
		onPressEnter,
		className,
		insideUIBlock,
		value,
		showSecrets,
		min = null,
		max = null,
		step = null,
		placeholder,
		autoFocus,
		spellcheck = false,
		disabled,
		resettable,
		onReset,
	} = props

	let dataType = props.dataType || 'text' // text, password, number

	if(showSecrets === true && dataType === 'password') {
		dataType = 'text'
	}

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				insideUIBlock && classes.insideUIBlock,
				className
			)}
		>
			<input
				id={id}
				type={dataType}
				min={min}
				max={max}
				step={step}
				className={clsx(
					classes.input,
					insideUIBlock && classes.insideUIBlock,
					className
				)}
				onInput={e => {
					onInput(e.target.value, e)}
				}
				onKeyDown={e => {
					if(e.key === 'Enter' && onPressEnter) {
						onPressEnter(e.target.value)
					}
				}}
				value={value}
				placeholder={placeholder}
				autoFocus={autoFocus}
				disabled={disabled}
				spellcheck={spellcheck}
				ref={(node) => {
					if(node && autoFocus) {
						setTimeout(() => {
							node.focus()
						}, 0)
					}
				}}
			/>
			{resettable && (
				<ResetButton onClick={onReset} className={classes.resetButton}/>
			)}
		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		width: '100%',
		position: 'relative'
	},

	input: {
		'-webkit-app-region': 'no-drag',
		width: '100%',
		padding: [8,12],
		color: 'inherit',
		font: 'inherit',
		textAlign: 'left',
		border: 'none',
		borderRadius: theme.rounded,
		backgroundColor: theme.input.background,
		outline: 'none',
		border: '3px solid transparent',
		'&::placeholder': {
			color: theme.text.muted
		},
		'&:focus': {
			color: theme.text.active,
			'&::placeholder': {
				color: 'transparent'
			}
		},
		'&:hover': {
			color: theme.text.active,
			// borderColor: theme.input.focused.background,
		}
	},

	insideUIBlock: {
		backgroundColor: theme.input.insideUIBlock.background,
	},

	resetButton: {
		top: 0,
		right: 0,
		position: 'absolute',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		width: 42,
		justifyContent: 'center',
	}

}),{name: 'input'})
