
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Link from 'components/Link'
import Modal from 'components/Modal'
import DynamicHeading from 'components/DynamicHeading'
import { useState } from 'preact/hooks'


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
		<Section className={classes.root} isCentred id='app'>

			<div className={classes.appIcon}>
				<img
					src={`assets/logo${isDark?`-dark`:``}.png`}
					className={classes.appIconImg}
				/>
				{/* <div className={classes.appName}>ProtoText</div> */}
			</div>

			<h1 className={classes.heading}>
				<span>Try a new card-based method of working with text,</span>
				<span>media files, and ChatGPT to unlock advanced possibilities</span>
				<span>in content creation.</span>
			</h1>

			<i className={classes.subHeading}>
				This app is called “ProtoText”. It's a free, private, desktop app that is suitable for taking daily notes, brainstorming, composing multilingual text, creating flexible presentations, building knowledge networks. The app is designed to help you solve creative problems. The workflow is similar to creating cards in Trello and writing text in Markdown, but easier.<br/>
				<span className={classes.modalLink} onClick={()=>{openModal(0)}}>Read the author's short story to learn more about the project.</span>
			</i>

			<Modal
				title={
					[
						`Hi! My name is Artemy`
					][modalContentIndex]
				}
				isOpened={modalContentIndex !== false}
				onClose={closeModal}
			>

				{modalContentIndex === 0 && (
					<div className={classes.twoCols}>

						<div className={classes.firstCol}>
							<p>
								The app, which began as an experiment in working with text, has now become something I use every day and I love the freedom it brings to my mind.
							</p>

							{/* <p>
								It all became possible after the idea: What if we replaced the "text paragraphs" with "cards", like in Trello, and added Markdown for quick card styling.
							</p> */}

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
		paddingTop: 160,
		paddingBottom: 12
	},

	heading: {
		margin: [32, 0, 24, 0],
		fontSize: 34,
		...theme.desktopLineBreaks
	},

	subHeading: {
		lineHeight: 1.55,
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
		'&:hover': {
			color: theme.textButton.notable.color,
			'&:before': {
				content: '" "',
				position: 'absolute',
				zIndex: 0,
				display: 'block',
				width: '100%',
				bottom: 2,
				left: 0,
				borderBottom: `1px solid ${theme.textButton.notable.color}`,
			},
		}
	},

	largeModalLink: {
		'&:before': {
			bottom: 4,
			opacity: 1,
			borderBottom: `2px solid ${theme.text.default}`,
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
	}

}),{name: 'intro'})