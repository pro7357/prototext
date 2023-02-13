
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'


export default connect(mapStateToProps)(props => {

	const {
		theme
	} = props

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isWide>

			<Heading isHuge isWarm>Real-World<br/>Examples</Heading>

			<h2>“The Second Brain”</h2>
			<h2>Writing a large multilingual text</h2>
			<h2>Making a personal dynamic visual Portfolio</h2>
			<h2>Creating a secret document</h2>
			<h2>Project workflow or ToDo list</h2>
			<h2>Content managment system for developers</h2>

		</Section>
	)
})

function mapStateToProps(state, props) {
	return {
		theme: state.theme,
	}
}


const useStyles = createUseStyles(theme => ({

	root: {

	},

	screenshotWindow: {
		borderRadius: theme.rounded * 2,
		boxShadow: `0 30px 60px ${theme.ambient}`,
	},

	screenshot: {
		width: '100%',
		borderRadius: theme.rounded * 2,
		overflow: 'hidden',
		display: 'block'
	}

}),{name: 'use-cases'})