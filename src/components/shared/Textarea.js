
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id,
		onInput,
		onChange,
		handleRef,
		isTransparent,
		insideUIBlock,
		className,
		value,
		placeholder,
	} = props


	const classes = useStyles()

	return (
		<textarea
			id={id}
			className={clsx(
				classes.root,
				isTransparent && classes.transparent,
				insideUIBlock && classes.insideUIBlock,
				className
			)}
			spellcheck={false}
			onInput={onInput ? e => onInput(e.target.value) : null}
			onChange={onChange}
			ref={handleRef}
			placeholder={placeholder}
		>
			{value}
		</textarea>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		width: '100%',
		height: '100%',
		minHeight: 110,
		backgroundColor: theme.input.background,
		padding: 12,
		borderRadius: theme.rounded,
		border: 'none',
		outline: 'none',
		font: 'inherit',
		resize: 'none',
		fontSize: 16,
		color: 'inherit',
		...theme.scrollbar
	},

	transparent: {
		backgroundColor: 'transparent',
		padding: 0
	},

	insideUIBlock: {
		backgroundColor: theme.input.insideUIBlock.background,
	}

}),{name: 'textarea'})
