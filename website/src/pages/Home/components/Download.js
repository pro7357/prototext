
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { connect } from 'react-redux'
import { useEffect, useState } from 'preact/hooks'

import Modal from 'components/Modal'
import Section from 'components/Section'
import Button from 'app/components/shared/Button'
import Link from 'components/Link'

import requestActualAppInfo from 'utils/requestActualAppInfo'



export default connect(mapStateToProps)(props => {

	const {
		theme
	} = props

	useEffect(async () => {
		const host = 'prototext.app'
		if(location.protocol === 'http:' && location.host.indexOf(host) > -1) {
			location.href = `https://${host}/`
			return
		}
		let response = await requestActualAppInfo()
		if(!response) {
			alert('Unable to get the actual app version')
			return
		}
		setVersions(response.versions)
	}, [])

	let isDark = theme === 0

	const [modalContentIndex, setModalContentIndex] = useState(false)
	const openModal = (index) => setModalContentIndex(index)
	const closeModal = () => setModalContentIndex(false)

	const [versions, setVersions] = useState()

	let actualVersion = versions ? versions.actual : APP_VERSION


	const classes = useStyles()

	return (
		<Section className={classes.root}>

			<Button
				className={classes.buildBtn}
				url={`/releases/ProtoText-MacOS-Intel-v${actualVersion}.zip`}
				isNotable
				isLarge
			>
				Download for Mac Intel
			</Button>

			<Button
				className={classes.buildBtn}
				url={`/releases/ProtoText-Windows-v${actualVersion}.zip`}
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
				url='/assets/usage-guide.pdf'
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

						<div className={classes.authorsNote}>

							<h3>Dear user,</h3>

							<ol>

								<li><p>
									I'm an undefined developer without certifications from Apple or Microsoft. I offer you my open-source app to check and install. Your operating system may block it for security reasons, but rest assured that the app is safe. You have the option to scan it with an antivirus or build your own version from the source code.
								</p></li>

								<li><p>
									The app is already multifunctional but still very young. This means that you may encounter some bugs, especially in Windows environment. Please send your bug reports to the <Link url='https://discord.gg/zze9qE5Cvq' isNotable isInline>#bug-reports channel</Link>.
								</p></li>

								<li><p>
									ProtoText is connected to the official OpenAI API. This means that you will need an official <Link url='https://platform.openai.com/account/api-keys' isNotable isInline>API key</Link> for ChatGPT.
								</p></li>

								<li><p>
									Let me know if you are interested in the Apple Silicon or Linux versions of the app and can help me test it: <Link url='https://discord.gg/Ea3RhsMzAn' isNotable isInline>#suggestions channel</Link>.
								</p></li>

							</ol>

						</div>

						<div className={classes.macNote}>

							<h3>MacOS</h3>

							<ol>
								<li><p>Download</p></li>
								<li><p>Unpack it anywhere</p></li>
								<li><p>Open the PtotoText.app file</p></li>
							</ol>

							<p>How to solve the problem with an unidentified developer?</p>

							<p>
								<Link isNotable url='https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac'>Official Apple support page</Link>
							</p>

						</div>

						<div className={classes.winNote}>

							<h3>Windows</h3>

							<ol>
								<li><p>Download</p></li>
								<li><p>Unpack it anywhere</p></li>
								<li><p>Open the PtotoText.exe file</p></li>
							</ol>

						</div>

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
	},

	buildBtn: {
		[theme.desktop]: {
			width: 'calc(50% - 16px)'
		}
	},

	bitbucketBtn: {
		[theme.desktop]: {
			width: 'calc(100% / 3 - 16px)'
		}
	},

	usageGuideBtn: {
		[theme.desktop]: {
			width: 'calc(100% / 3 - 16px)'
		}
	},

	intallationGuideBtn: {
		[theme.desktop]: {
			width: 'calc(100% / 3 - 16px)'
		}
	},

	usageGuideInModal: {
		boxShadow: `0 10px 30px ${theme.shadow.default}`,
		'& img': {
			display: 'block',
			maxWidth: '100%',
		}
	},

	installationGuideInModal: {
		display: 'flex',
		gap: 24,
		width: '100%',
		flexWrap: 'wrap',
		'& > div': {
			width: '100%',
		}
	},

	authorsNote: {
		[theme.desktop]: {
			flexBasis: '50%',
		}
	},

	macNote: {
		[theme.desktop]: {
			flexBasis: 'calc(25% - 24px)',
		}
	},

	winNote: {
		[theme.desktop]: {
			flexBasis: 'calc(25% - 24px)',
		}
	}


}),{name: 'download'})