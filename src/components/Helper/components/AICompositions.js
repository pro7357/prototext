
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import UIBlock from 'sharedComponents/UIBlock'
import TextButton from 'sharedComponents/TextButton'
import Shortcut from './Shortcut'

import BlockBorder from '../../Editor/Page/Block/BlockBorder'


export default () => {

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div>
				Currently, ProtoText supports integration with ChatGPT by using the official OpenAI API and integration with Microsoft Translator.
			</div>

			<div>
				Use the "AI" button to target ChatGPT to your desired content and task:
			</div>

			<UIBlock className={classes.block}>
				<div className={classes.btns}>
					<TextButton isNotable isSmall>AI</TextButton>
				</div>
				Block – Content
			</UIBlock>

			<UIBlock className={clsx(classes.block, classes.taskBlock)}>
				<div className={classes.taskBlockBg}/>
				Block – Task
			</UIBlock>

			<UIBlock className={classes.block}>
				<div className={classes.btns}>
					<TextButton isNotable isSmall>Translate</TextButton>
				</div>
				<BlockBorder style={9}/>
				AI's response<br/>
				is here…
			</UIBlock>

			<div>
				Please note that Content and Task can be the same block.
			</div>

			<div className={classes.subHeading}>
				<b>
					And finally the most interesting feature
				</b>
			</div>

			<div>
				Use the internal links feature to give the AI more complex content and tasks.
			</div>

			<UIBlock className={clsx(classes.block, classes.taskBlock)}>
				<div className={classes.taskBlockBg}/>
				{/* Link to a page */}
				Block – Internal link<br/>
				To use all page content for the prompt.
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
		margin: [4,0]
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
	}


}),{name: 'ai-compositions'})