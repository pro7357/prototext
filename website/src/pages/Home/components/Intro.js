
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Link from 'components/Link'
import Modal from 'components/Modal'
import TextButton from 'app/components/shared/TextButton'
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
				<div className={classes.appName}>ProtoText</div>
			</div>

			<h1 className={classes.heading}>
				<span>Try an <div className={clsx(classes.modalLink, classes.silentLink)} onClick={()=>{openModal(3)}}>innovative</div> way of working with text.</span>
				<span>That's as flexible and easy as cards in <div className={clsx(classes.modalLink, classes.silentLink)} onClick={()=>{openModal(1)}}>Trello</div> or  <div className={clsx(classes.modalLink, classes.silentLink)} onClick={()=>{openModal(2)}}>Markdown</div>.</span>
				<span>The built-in AI will help you generate content.</span>
			</h1>



			<i className={classes.subHeading}>
				It's a free, private, desktop app that is suitable for taking daily notes, brainstorming, composing multilingual text, creating flexible presentations, building knowledge networks, and solving other creative problems using text.<br/>
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

				{modalContentIndex === 1 && (
					<div className={classes.twoCols}>

						<div className={classes.firstCol}>
							<p>
								Trello is a digital tool that helps people organize tasks and projects in a visual way. It uses lists and cards to represent tasks and allows you to assign due dates, labels, and comments to each card. It's easy to use and great for organizing and managing tasks and projects.
							</p>
						</div>
						<div className={classes.secondCol}>
							<img src='/assets/trello.jpg' />
						</div>

					</div>

				)}

				{modalContentIndex === 2 && (
					<div className={classes.twoCols}>

						<div className={classes.firstCol}>
							<p>
								Markdown is a simple popular way of writing that allows you to add basic formatting to text. It uses special characters, like asterisks (*) or hash symbols (#), to indicate different types of formatting, such as bold or headings.
							</p>
						</div>
						<div className={classes.secondCol}>
							<img src='/assets/markdown.jpg' />
						</div>

					</div>

				)}

				{modalContentIndex === 3 && (
					<div className={classes.twoCols}>
						<div className={classes.firstCol}>
							<p>
								Is innovative the way or not? Why use this app when there are millions of other options? Can ProtoText help make life easier? Whether it's worth a try is up to you. I'm just a dev, but it seems to have solved many of the issues I've seen. Try it out and let me know what you think ✍️
							</p>
						</div>
						<div className={classes.secondCol}>
							<iframe width="560" height="280" src="https://www.youtube.com/embed/aUczdQSx6po" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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