
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		children: content,
		className
	} = props


	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				className
			)}
		>
			{content}
		</div>

	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		color: theme.text.muted,
		fontStyle: 'italic',
		fontSize: 14,
		wordBreak: 'break-word',
	},

}),{name: 'muted-text-line'})
