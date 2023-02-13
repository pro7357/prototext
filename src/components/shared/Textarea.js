
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		id,
		onInput,
		onChange,
		handleRef,
		isTransparent,
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
		backgroundColor: theme.background.default,
		padding: 10,
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
	}

}),{name: 'textarea'})
