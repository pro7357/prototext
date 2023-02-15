
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Link from 'components/Link'
import Modal from 'components/Modal'
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
		<Section className={classes.root} isCentred id='downloads'>

			<div className={classes.appIcon}>
				<img
					src={`assets/logo${isDark?`-dark`:``}.png`}
					className={classes.appIconImg}
				/>
			</div>

			<h1 className={classes.heading}>
			“<span>What started as an experiment in working with text</span> <span className={classes.nowrap}>has now become</span> an AI-powered <span className={clsx(classes.modalLink, classes.largeModalLink)} onClick={()=>{openModal(0)}}>Zettelkasten</span>, which I use every day and love the freedom it brings to my mind.”
			</h1>

			<i>– <b className={classes.modalLink} onClick={()=>{openModal(1)}}>Artemy</b>, developer of the app.</i>

			<Modal
				title={
					[
						`What is the Zettelkasten?`,
						`Hi! Call me to grow trees ;)`
					][modalContentIndex]
				}
				isOpened={modalContentIndex !== false}
				onClose={closeModal}
			>
				{modalContentIndex === 0 && (
					<div className={classes.twoCols}>
						<div className={classes.firstCol}>
							<p>
								Zettelkasten is a method of note-taking and organization where individual notes, ideas, or observations are recorded on index cards or slips that are linked to one another. The key advantages of this method include:
							</p>

							<ol>

								<li><p><b>Encourages creative thinking:</b> By linking individual notes and ideas, Zettelkasten encourages you to make connections between them, fostering creative thinking and problem-solving.</p></li>

								<li><p><b>Improves knowledge management:</b> Zettelkasten helps you to store and organize your thoughts in a way that is easily accessible and searchable, so you can build a comprehensive understanding of a topic over time.</p></li>

								<li><p><b>Facilitates writing and research:</b> By creating a network of interlinked notes, Zettelkasten provides a structured framework for writing and research, making it easier to prepare and organize your ideas.</p></li>

								<li><p><b>Promotes reflection:</b> Regularly reviewing and updating your Zettelkasten notes can help you reflect on what you've learned and identify areas for further exploration.</p></li>

								<li><p><b>Easy to implement:</b> Zettelkasten can be easily implemented using physical index cards or through digital tools, making it a flexible and accessible method for anyone looking to improve their knowledge management.</p></li>

							</ol>
							<i className={classes.refs}>
								Photo by <Link isInline url="https://unsplash.com/fr/@jankolar">Jan Antonin Kolar</Link> on <Link isInline url="https://unsplash.com/photos/lRoX0shwjUQ">Unsplash</Link>
							</i>
						</div>
						<div className={classes.secondCol}>
							<img
								src='/assets/jan-antonin-kolar-lRoX0shwjUQ-unsplash.jpg'
							/>
						</div>
					</div>
				)}

				{modalContentIndex === 1 && (
					<div className={classes.aboutMeInModal}>
						<div className={classes.mission}>
							<img src='/assets/mission-1.jpg' />
							<img src='/assets/artemy.jpg' />
							<img src='/assets/mission-2.jpg'/>
						</div>
						<i>letter2artemy@gmail.com</i>
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
		paddingTop: 150,
		paddingBottom: 8
	},

	heading: {
		margin: [32, 0, 18, 0]
	},

	nowrap: {
		whiteSpace: 'nowrap'
	},

	appIcon: {
		marginBottom: 8,
		position: 'relative',
		'& $appIconImg': {
			boxShadow: `0 10px 10px ${theme.shadow.default}, 0 20px 70px ${theme.shadow.default}`,
		}
	},

	appIconImg: {
		width: 128,
		borderRadius: 30,
		overflow: 'hidden',
	},

	modalLink: {
		display: 'inline',
		position: 'relative',
		cursor: 'pointer',
		'&:before': {
			content: '" "',
			position: 'absolute',
			zIndex: 0,
			display: 'block',
			width: '100%',
			bottom: 1,
			left: 0,
			opacity: 0.5,
			borderBottom: `1px solid ${theme.text.default}`,
		},
		'&:hover': {
			color: theme.textButton.notable.color,
			'&:before': {
				borderColor: theme.textButton.notable.color
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
		gap: 16
	},

	firstCol: {
		width: '60%'
	},

	secondCol: {
		width: '40%',
		'& img': {
			width: '100%'
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
		'& img': {
			display: 'block',
			width: 'calc(100% / 3 - 10px)'
		},
	}

}),{name: 'intro'})