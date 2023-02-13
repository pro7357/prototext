
import { createUseStyles } from 'react-jss'

export default props => {

	// const {

	// } = props


	const classes = useStyles()

	return (
		<div style={{}} className={classes.root} id='TextAnalysisHint'>
			Loading...
		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'none',
		wordBreak: 'break-word',
		backgroundColor: theme.textAnalysisHint.background,
		color: theme.textAnalysisHint.color,
		padding: 16,
		borderRadius: theme.rounded,
		zIndex: 0,
		borderRadius: '4px',
		position: 'absolute',
		top: 0,
		left: '100%',
		width: 300,
		textAlign: 'left',
		fontSize: 14,
		marginLeft: 22,
		'& h1': {
			fontSize: 18,
			padding: 0,
			margin: 0,
		},

		'& h2': {
			fontSize: 16,
			padding: 0,
			margin: 0,
		},
		'& ul': {
			padding: [0,0,0,12],
			margin: 0,
		},
		'& li': {
			padding: [3,0],
		},
		'& .rule-description': {
			margin: [6,0]
		},
		'& .rule-examples': {
			marginBottom: 6,
		},
		'& table tr td': {
			verticalAlign: 'top',
		},
		'& .see-also': {
			margin: [6,0]
		},
		'& a': {
			color: 'inherit',
		},
		'& small': {
			cursor: 'pointer',
			'&:hover': {
				textDecoration: 'underline'
			}
		}
	},

}),{name: 'text-analysis-hint'})