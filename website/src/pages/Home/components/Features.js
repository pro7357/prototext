
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import Subheading from 'components/Subheading'

import features  from './data/features'

import splitText from 'utils/splitText'


export default connect(mapStateToProps)(props => {

	const {
		theme
	} = props

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isWide id='features'>

			<Heading className={classes.heading} isHuge isCold>Features</Heading>

			<div className={classes.content}>

				{features.map((feature, index) => {

					let id = feature[0].toLowerCase().replaceAll(/ /g,'-')
					let title = splitText(feature[1])
					let subtitle = splitText(feature[2])
					let description = feature.slice(3)

					return (
						<div className={classes.feature}>

							<Subheading>
								{title}
							</Subheading>

							<div className={classes.subtitle}>{subtitle}</div>

							<div className={classes.screenshotWindow}>
								<img
									src={`assets/screenshots/os_${theme}.jpg`}
									className={classes.screenshotBackground}
								/>
								<img
									src={`assets/screenshots/${id}_${theme}.jpg`}
									className={classes.screenshot}
								/>
							</div>

							{description.length > 0 && (
								<div className={classes.description}>
									{description.map(p => {
										return (
											<p>
												{p.split('<br>')}
											</p>
										)
									})}
								</div>
							)}

							</div>
					)

				})}

			</div>

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

	heading: {
		paddingBottom: 0,
		marginBottom: 18
	},

	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 80,
		[theme.desktop]: {
			gap: 180,
		}
	},

	feature: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 24,
	},

	subtitle: {
		maxWidth: 550,
		marginBottom: 30,
		'&:first-child': {
			marginBottom: 60
		}
	},

	description: {
		textAlign: 'left',
		maxWidth: 700,
		marginTop: 60
	},

	screenshotWindow: {
		borderRadius: theme.rounded * 2,
		boxShadow: `0 40px 60px ${theme.ambient}`,
		position: 'relative'
	},

	screenshotBackground: {
		width: '100%',
		borderRadius: theme.rounded * 2,
		overflow: 'hidden',
		display: 'block',
		//maxHeight: 'calc(100vh - 100px)',
	},

	screenshot: {
		borderRadius: theme.rounded * 2,
		top: '6.5%',
		left: '3%',
		width: '94%',
		display: 'block',
		overflow: 'hidden',
		position: 'absolute',
		borderRadius: 8,
	}

}),{name: 'features'})