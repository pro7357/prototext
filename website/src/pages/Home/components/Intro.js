
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import Link from 'components/Link'
import Modal from 'components/Modal'
import TextButton from 'app/components/shared/TextButton'
import OverviewVideo from './OverviewVideo'
import { useState } from 'preact/hooks'
import DynamicHeading from 'components/DynamicHeading'


export default connect(mapStateToProps)(props => {

	const {
		theme
	} = props

	let isDark = theme === 0

	const [modalContentIndex, setModalContentIndex] = useState(false)
	const openModal = (index) => setModalContentIndex(index)
	const closeModal = () => setModalContentIndex(false)

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isVFlex id='app'>

			<Heading isHuge isCold className={classes.primaryHeading}>
				Solving<br/>creative problems
			</Heading>

			<div className={classes.secondaryHeading}>
				Using AI & “Cards”
			</div>

			<div className={classes.overview}>
				<OverviewVideo/>
			</div>

			<i className={classes.subHeading}>
				It's a free, introvert-friendly, desktop app that is suitable for brainstorming with AI assistance, taking notes, composing multilingual text, creating flexible presentations, building knowledge networks, and managing your project's content.<br/>
				<span className={classes.modalLink} onClick={()=>{openModal(0)}}>Read the author's short story about the project.</span>
			</i>

			<Modal
				title={
					[
						`Hi! My name is Artemy`,
						`What is Trello?`,
						`What is Markdown?`,
						`Overview video`
					][modalContentIndex]
				}
				isOpened={modalContentIndex !== false}
				onClose={closeModal}
			>

				{modalContentIndex === 0 && (
					<div className={classes.twoCols}>

						<div className={classes.firstCol}>

							<p>
								The app, which began as an experiment in working with text and media files, has now become something I use every day and I love the freedom it brings to my mind.
							</p>

							<p>
								As a person who does not possess exceptional mental computational abilities or a super memory, I still want to solve complex creative tasks. Here, the computer helps me as the Second Brain. I record all my ideas, structure them, connect them, and use AI as an assistant inside the ProtoText.
							</p>

							<p>
								The built-in ChatGPT and set of frequently used commands help me quickly find new ideas, improve my English, and generate text content for my projects.
							</p>

							<p>
								I've seen from my experience how ideas start to progress and their quality increases. This is important in our digital age. That is why I would like to recommend such a methodology and the app to you.
							</p>

							<p>
								Thank you!
							</p>

							<h2>☮︎</h2>

						</div>

						<div className={classes.secondCol}>
							<img src='/assets/artemy.jpg' />
						</div>

					</div>
				)}

			</Modal>

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
		paddingTop: 120,
		paddingBottom: 12,
		[theme.desktop]: {
			paddingTop: 160,
		}
	},

	caption: {
		...theme.desktopLineBreaks
	},

	primaryHeading: {
		margin: 0,
		padding: 0,
		...theme.desktopLineBreaks
	},

	secondaryHeading: {
		fontSize: 38,
		fontWeight: 'bold',
	},

	subHeading: {
		lineHeight: 1.55,
		fontSize: 19,
	},

	overview: {
		margin: [40,0]
	},

	nowrap: {
		whiteSpace: 'nowrap'
	},

	appIcon: {
		position: 'relative',
		'& $appIconImg': {
			boxShadow: `0 10px 10px ${theme.shadow.default}, 0 20px 70px ${theme.shadow.default}`,
		}
	},

	appName: {
		marginTop: 12,
		textAlign: 'center',
		width: '100%'
	},

	appIconImg: {
		width: 128,
		height: 128,
		borderRadius: 30,
		overflow: 'hidden',
	},

	modalLink: {
		display: 'inline-block',
		position: 'relative',
		cursor: 'pointer',
		color: theme.textButton.notable.color,
		'&:before': {
			content: '" "',
			position: 'absolute',
			zIndex: 0,
			display: 'block',
			width: '100%',
			bottom: 2,
			left: 0,
		},
		'&:hover': {
			color: theme.textButton.notable.color,
			'&:before': {
				borderBottom: `1px solid ${theme.textButton.notable.color}`,
			},
		}
	},

	silentLink: {
		color: theme.text.default,
		'&:before': {
			bottom: 4,
			opacity: .25,
			borderBottom: `2px solid ${theme.text.default}`,
		},
		'&:hover': {
			'&:before': {
				opacity: 1,
				borderBottom: `2px solid ${theme.textButton.notable.color}`,
			},
		}
	},

	twoCols: {
		display: 'flex',
		gap: 16,
		flexWrap: 'wrap',
		[theme.desktop]: {
			gap: 48,
			flexWrap: 'nowrap',
		}
	},

	firstCol: {
		[theme.desktop]: {
			width: '60%',
		}
	},

	secondCol: {
		'& img': {
			width: '100%'
		},
		'& iframe': {
			width: '100%'
		},
		[theme.desktop]: {
			width: '40%',
		}
	},

	refs: {
		fontSize: 14,
	},

	aboutMeInModal: {
		display: 'flex',
		gap: 16,
		flexDirection: 'column',
		paddingBottom: 24
	},

	mission: {
		display: 'flex',
		gap: 16,
		marginBottom: 8,
		'& img': {
			display: 'block',
			width: 'calc(100% / 3 - 10px)'
		},
	},

	youtube: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}

}),{name: 'intro'})