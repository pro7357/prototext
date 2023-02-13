
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		content,
		className
	} = props


	const classes = useStyles()

	return (
		<pre
			className={clsx(
				classes.root,
				className
			)}
			dangerouslySetInnerHTML={{__html: content}}
		/>

	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'no-drag',
		tabSize: 2,
		fontFamily: 'monospace',
		fontSize: 15,
		margin: 0,
		whiteSpace: 'pre-wrap',
		'& span': {
			fontStyle: 'italic',
			opacity: 0.55
		},
		'& violet': {
			color: '#756ba4'
		},
		'& green': {
			color: '#6ba485'
		}
	},

}),{name: 'code'})
