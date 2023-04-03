
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import os from 'globalUtils/os'

import { showEditor } from 'layoutActions'
import { domain } from 'globalConstants'

import Form from 'sharedComponents/Form'
import UIBlock from 'sharedComponents/UIBlock'
import TextButton from 'sharedComponents/TextButton'

import Heading from './components/Heading'
import SHTs from './components/SHTs'
import Shortcut from './components/Shortcut'
import EditorViewCompositions from './components/EditorViewCompositions'
import LinkedContentCompositions from './components/LinkedContentCompositions'
import AICompositions from './components/AICompositions'

import mainMenuFile from './data/mainMenuFile'
// import mainMenuView from './data/mainMenuView'
import viewOptions from './data/viewOptions'
import textBlockStyling from './data/textBlockStyling'
import textBlockFeatures from './data/textBlockFeatures'

import BlockBorder from '../Editor/Page/Block/BlockBorder'
import OuterActions from '../Editor/Page/ContentRow/OuterActions'

import { styles } from 'sharedUtils/blockStyling'



export default props => {

	const {
		scrollbarsMode
	} = props

	const isMac = os.isMac()
	let cmdKey = isMac ? 'CMD' : 'CTRL'

	let investSectionPath = '/#invest-in-the-project'

	const classes = useStyles()

	return (
		<Form
			title='App features & Shortcuts'
			secondaryActions={[
				{
					label: 'Write a review',
					isExternal: true,
					isNotable: true,
					action: () => {
						window.open('https://forms.gle/ztiNzcoRbeGbDVKj8','_blank')
					}
				},
				{
					label: 'Join the community',
					isExternal: true,
					isNotable: true,
					action: () => {
						window.open('https://discord.gg/SDuzTXWkSd','_blank')
					}
				},
				{
					label: (
						<div>
							Donate <span className={classes.coin}>₿</span>
						</div>
					),
					isNotable: true,
					isExternal: true,
					action: () => {
						window.open(domain+investSectionPath, '_blank')
					}
				},
				{
					label: 'Close [ESC]',
					isSemiDangerous: true,
					action: () => {
						showEditor()
					}
				}
			]}
			secondaryActionsForPrinting={(
				<div className={classes.printLinks}>
					<a href='https://discord.gg/SDuzTXWkSd' target='_blank'>
						Join the community
					</a>
				</div>
			)}
			scrollbarsMode={scrollbarsMode}
			className={classes.root}
			sectionsClassName={classes.sectionsClassName}
			withFixedColumnWidth
			withWideColumnGap
		>

			<div className={classes.column}>
				<div className={classes.columnSection}>
					<Heading>Workspace<br/> options</Heading>
					<EditorViewCompositions/>
					<SHTs
						content={viewOptions(cmdKey)}
					/>
					<Heading offsetTop>Working with one <span className={classes.emoji}>📖</span><br/>or several files <span className={classes.emoji}>📚</span></Heading>
					<SHTs
						content={mainMenuFile}
					/>
				</div>
			</div>

			<>
				<Heading>Content card<br/>markup</Heading>
				<div className={classes.textBlockSamples}>

					<UIBlock isCompact>
						Ordinary text
					</UIBlock>

					{styles.map((styleRule, index) => {

						if(styleRule.isHidden) {
							return null
						}

						return (
							<UIBlock
								className={clsx(
									classes.styledTextBlock,
								)}
							>
								<BlockBorder style={styleRule.index}/>
								<Shortcut isInline>[{styleRule.key}]</Shortcut> {styleRule.sample}
							</UIBlock>
						)
					})}
				</div>

				<SHTs
					content={textBlockStyling}
				/>

				<Heading offsetTop>Links, Tags & Assets</Heading>
				<LinkedContentCompositions/>

			</>

			<>
				<Heading>Content card<br/>features</Heading>

				<UIBlock isCompact className={classes.blockDemo}>
					<OuterActions/>
					<div className={classes.innerActionsBlockDemo}>
						<TextButton isMuted isSmall>Actions</TextButton>
					</div>
					Any kind of cards
				</UIBlock>

				<SHTs
					content={textBlockFeatures(cmdKey)}
				/>


				<Heading offsetTop>The Power of AI</Heading>
				<AICompositions/>

			</>

		</Form>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		textAlign: 'left',
		fontSize: 16,
	},

	sectionsClassName: {
		'-webkit-app-region': 'no-drag',
		cursor: 'default',
		justifyContent: 'flex-start',
		gap: 48,
		marginTop: 16,
	},

	column: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 48,
	},

	columnSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		gap: 16
	},

	textBlockSamples: {
		margin: [12,0],
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 16,
		'& > div': {
			width: '100%',
			minWidth: 'auto',
		}
	},

	styledTextBlock: {
		padding: 16,
		display: 'flex',
		gap: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		fontSize: 'inherit !important',
		fontWeight: 'inherit !important',
		fontStyle: 'inherit !important',
		color: 'inherit !important',
	},

	blockDemo: {
		margin: [12,0],
		position: 'relative'
	},

	innerActionsBlockDemo: {
		position: 'absolute',
		top: 8,
		right: 16,
	},

	coin: {
		borderRadius: '50%',
		backgroundColor: 'gold',
		color: 'black',
		padding: [0,5]
	},

	printLinks: {
		display: 'flex',
		gap: 16
	},

	emoji: {
		fontSize: 20
	}

}),{name: 'helper'})