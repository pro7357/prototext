
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import UIBlock from 'sharedComponents/UIBlock'
import TextButton from 'sharedComponents/TextButton'
import Link from 'sharedComponents/Link'
import Shortcut from './Shortcut'

import BlockBorder from '../../Editor/Page/Block/BlockBorder'


export default () => {

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div>
				Currently, ProtoText supports integration with ChatGPT by OpenAI, Microsoft Translator and Speech Synthesis by ElevenLabs.
			</div>

			<div>
				Go to the Main menu {`>`} Settings to activate these cool features.
			</div>

			<div className={classes.subHeading}>
				<b>
					Text Generation
				</b>
			</div>

			<div>
				Use the "AI" button to target built-in ChatGPT to your desired content and task:
			</div>

			<UIBlock className={classes.block}>
				<div className={classes.btns}>
					<TextButton isNotable isSmall>AI</TextButton>
				</div>
				Card – Content
			</UIBlock>

			<UIBlock className={clsx(classes.block, classes.taskBlock)}>
				<div className={classes.taskBlockBg}/>
				Card – Task
			</UIBlock>

			<UIBlock className={classes.block}>
				<BlockBorder style={9}/>
				AI's response<br/>
				is here…
			</UIBlock>

			<UIBlock
				className={clsx(classes.block)}
			>
				Use "Internal links" feature to give the AI an entire content page as a single prompt.
			</UIBlock>

			<div>
				<a target='_blank' href='https://youtu.be/Udo38jdK6u4'>
					A tutorial video on YouTube
				</a>
			</div>

			{/* <div>
				Limits:<br/>
				1. Linked content depth: 1 level.<br/>
				2. Max request length to ChatGPT is ~300 English words.<br/>
				But you can continue the conversation in the context of the last message.
			</div> */}

			<div className={classes.subHeading}>
				<b>
					Speech Synthesis
				</b>
			</div>

			<div>
				Just one click to generate a high-quality voiceover and save the result as an attached MP3 asset.
			</div>

			<UIBlock className={classes.block}>
				<div className={classes.btns}>
					<TextButton isNotable isSmall>Speech</TextButton>
				</div>
				Text to Speech
			</UIBlock>

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 16,
		margin: [6,0],
		minWidth: 240,
		// maxWidth: 300,
	},

	composition: {
		width: '100%',
		height: 100,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'stretch',
		gap: 8,
	},

	block: {
		padding: 20,
		gap: 8,
		position: 'relative',
		'& [data-role="block-styling-border"]': {
			top: 0
		}
	},

	subHeading: {
		marginTop: 8
	},

	btns: {
		position: 'absolute',
		top: 10,
		right: 16,
	},

	taskBlock: {
		backgroundColor: theme.block.prompt.background,
		margin: [4,0],
	},

	taskBlockBg: {
		display: 'block',
		position: 'absolute',
		zIndex: -1,
		top: -20,
		left: -20,
		right: -20,
		bottom: -20,
		background: theme.shadow.rainbow,
		boxShadow: `inset 0 0 10px 15px ${theme.background.default}, inset 0 0 3px 2px ${theme.background.default}`,
		'@media print': {
			boxShadow: 'none',
			backgroundImage: 'url(./assets/ai-block-bg.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: '100% 100%',
		}
	},

	largeTaskBlockBg: {
		'@media print': {
			backgroundSize: '100% 106%',
		}
	}


}),{name: 'ai-compositions'})