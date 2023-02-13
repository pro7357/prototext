
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { useState } from 'preact/hooks'

import Modal from 'components/Modal'
import Section from 'components/Section'
import Button from 'app/components/shared/Button'

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
		<Section className={classes.root}>

			<Button
				className={classes.buildBtn}
				url='/releases/ProtoText-darwin-x64/ProtoText.zip'
				isNotable
				isLarge
			>
				Download for Mac
			</Button>

			<Button
				className={classes.buildBtn}
				url='/releases/ProtoText-win32-x64/ProtoText.zip'
				isNotable
				isLarge
			>
				Download for Windows
			</Button>

			<Button
				className={classes.intallationGuideBtn}
				onClick={() => {
					openModal(0)
				}}
				isLarge
			>
				Installation Guide
			</Button>

			<Button
				className={classes.usageGuideBtn}
				onClick={() => {
					openModal(1)
				}}
				isLarge
			>
				Usage Guide
			</Button>

			<Button
				className={classes.bitbucketBtn}
				url='https://bitbucket.org/svgsprite/prototext/src/master/'
				isLarge
			>
				Source code on Bitbucket
			</Button>

			<Modal
				title={
					[
						`Installation Guide`,
						`Usage Guide`
					][modalContentIndex]
				}
				isOpened={modalContentIndex !== false}
				onClose={closeModal}
			>

				{modalContentIndex === 0 && (
					<div className={classes.installationGuideInModal}>
						Coming soon...
					</div>
				)}

				{modalContentIndex === 1 && (
					<div className={classes.usageGuideInModal}>
						<img src={`/assets/screenshots/help_${theme}.jpg`} />
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
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
		flexWrap: 'wrap',
		paddingTop: 4,
		// paddingBottom: 0
	},

	buildBtn: {
		// flex: 1,
		width: 'calc(50% - 16px)'
	},

	bitbucketBtn: {
		// flex: 1,
		width: 'calc(100% / 3 - 16px)'
	},

	usageGuideBtn: {
		// flex: 1,
		width: 'calc(100% / 3 - 16px)'
	},

	intallationGuideBtn: {
		// flex: 1,
		width: 'calc(100% / 3 - 16px)'
	},

	usageGuideInModal: {
		boxShadow: `0 10px 30px ${theme.shadow.default}`,
		'& img': {
			display: 'block',
			maxWidth: '100%',
		}
	},




}),{name: 'download'})