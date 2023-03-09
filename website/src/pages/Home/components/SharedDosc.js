
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

	const templates = publicData[4]
	const notes = publicData[5]
	const dir = 'assets/docs'

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isWide id='shared-documents'>

			<Heading isHuge isCold>Helpful notes & templates<br/>to download</Heading>

			<DocsGroup
				title='Useful notes'
				data={notes}
				dir={dir+'/notes'}
				isDownloadable
			/>

			<DocsGroup
				title='Templates'
				data={templates}
				dir={dir+'/templates'}
				isNarrow
				isDownloadable
				className={classes.templates}
				renderExtraItem={() => (
					<div className={classes.sharedDocsDiscord}>

						<b>
							Stay connected<br/>
							for further updates
						</b>

						<div>
							Join this<br/>
							<Link isInline isNotable url='https://discord.gg/HNuG622tZG'>Discord channel</Link><br/>
							to collaborate on<br/>
							templates.
						</div>

					</div>
				)}
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

	templates: {
		'& > div:last-child': {
			width: '100%',
		}
	},

	sharedDocsDiscord: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		// height: '100%',
		height: 250,
		borderRadius: theme.rounded * 2,
		boxShadow: `0 10px 30px ${theme.shadow.default}`,
		padding: [48, 8],
		[theme.desktop]: {
			margin: [58, 0, 8, 0],
			padding: 0
		}
	}

}),{name: 'shared-docs'})