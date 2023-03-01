
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import Link from 'components/Link'
import Subheading from 'components/Subheading'
import Video from 'app/components/shared/Video'

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

				<div id='features-slides-1' className={classes.feature}>

					<Subheading>
						The App Interface<br/>and your first impression.
					</Subheading>

					<div className={clsx(classes.subtitle, classes.firstSubtitle)}>
						Yeah! It's primarily a minimal tool to focus on your own thoughts. Discover the hidden app's features in the <Link isInline url='/assets/usage-guide.pdf'>usage guide</Link> and on the <Link isInternal isInline url='#features-slides-2'>following slides</Link>. Check out <Link isInternal isInline url='#use-cases'>real-world examples</Link> and benefits for you in the <Link isInternal isInline url='#questions-and-answers'>Q&A section</Link>. Keep what you need and discard the rest!
					</div>

					<div className={classes.screenshotWindow}>

						<img
							src={`assets/screenshots/os_${theme}.jpg`}
							className={classes.screenshotBackground}
						/>

						<div className={classes.blankDemoVideoWindow}>
							<Video
								className={classes.blankDemoVideo}
								src={`assets/screenshots/blank-doc_${theme}.webm`}
								poster={`assets/screenshots/start-with-john_${theme}.jpg`}
								withoutBg
								controls={false}
								autoplay={true}
								loop={true}
							/>
						</div>

					</div>

				</div>

				{features.map((feature, index) => {

					let id = feature[0].toLowerCase().replaceAll(/ /g,'-')
					let title = splitText(feature[1])
					let subtitle = splitText(feature[2])
					let description = feature.slice(3)

					let sectionIndex=`features-slides-${index+2}`

					return (
						<div id={sectionIndex} className={classes.feature}>

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
		marginBottom: 18,
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
		marginBottom: 30,
		'&:first-child': {
			marginBottom: 60
		},
		...theme.desktopLineBreaks
	},

	firstSubtitle: {
		maxWidth: 920,
		lineHeight: 1.45,
		'& a': {
			'&:before': {
				bottom: 1
			}
		}
	},

	description: {
		textAlign: 'left',
		maxWidth: 700,
		marginTop: 60,
		wordBreak: 'break-word',
	},

	screenshotWindow: {
		position: 'relative',
		boxShadow: `0 40px 60px ${theme.ambient}`,
		borderRadius: theme.rounded,
		[theme.desktop]: {
			borderRadius: theme.rounded * 2,
		}
	},

	screenshotBackground: {
		width: '100%',
		overflow: 'hidden',
		display: 'block',
		borderRadius: theme.rounded,
		[theme.desktop]: {
			borderRadius: theme.rounded * 2,
		}
	},

	screenshot: {
		top: '6.5%',
		left: '3%',
		width: '94%',
		display: 'block',
		overflow: 'hidden',
		position: 'absolute',
		borderRadius: theme.rounded,
		[theme.desktop]: {
			borderRadius: theme.rounded * 2,
		}
	},

	blankDemoVideoWindow: {
		top: '14.5%',
		left: '15%',
		width: '70%',
		display: 'block',
		overflow: 'hidden',
		position: 'absolute',
		aspectRatio: 'auto 1920 / 1215',
		borderRadius: theme.rounded,
		[theme.desktop]: {
			borderRadius: theme.rounded * 2,
		}
	},

	blankDemoVideo: {
		width: '100%',
		height: '100%',
		aspectRatio: 'auto 1920 / 1215',
	}

}),{name: 'features'})