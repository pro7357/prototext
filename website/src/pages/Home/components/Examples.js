
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import ExamplesGroup from './ExamplesGroup'


export default connect(mapStateToProps)(props => {

	const {
		theme,
		publicData
	} = props

	const rwExamples = publicData[3]
	const templates = publicData[4]
	const notes = publicData[5]
	const dir = 'docs'

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isWide>

			<Heading isHuge isWarm>Examples</Heading>

			<ExamplesGroup
				title='Useful notes'
				data={notes}
				dir={dir+'/notes'}
				isDownloadable
			/>

			{/* <ExamplesGroup
				title='Real-World Examples'
				data={rwExamples}
				dir={dir+'/real-worl-examples'}
			/> */}

			<ExamplesGroup
				title='Templates'
				data={templates}
				dir={dir+'/templates'}
				isNarrow
				isDownloadable
			/>

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