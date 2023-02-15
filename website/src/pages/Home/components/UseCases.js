
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import DocsGroup from './DocsGroup'
import Link from 'components/Link'

export default connect(mapStateToProps)(props => {

	const {
		theme,
		publicData
	} = props

	const rwExamples = publicData[3]
	const dir = 'assets/docs'

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isWide id='use-cases'>

			<Heading isHuge isCold>Real-world usage examples</Heading>

			<DocsGroup
				title='Real-World Examples'
				data={rwExamples}
				dir={dir+'/real-worl-examples'}
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


}),{name: 'use-cases'})