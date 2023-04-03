
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import handleDrag from './utils/handleDrag'
import handleDrop from './utils/handleDrop'
import handleClick from './utils/handleClick'
import getClickPosition from 'globalUtils/getClickPosition'

import InnerActions from './InnerActions/InnerActions'
import OuterActions from './OuterActions'


export default props => {

	const {
		sharedEditorProps,
		pageIndex,
		block,
		localizedBlock,
		blockIndex,
		localeIndex,
		isAlone,
		isTargetPage,
		twoColsMode,
		singlePageMode,
		pageWidth,
		side,
		isSelected,
		children
	} = props

	const {
		dndMode,
		selMode,
		linkMode,
		aiPromptMode,
		selRange,
		currentDoc,
	} = sharedEditorProps

	let isTextBlockDndMode = dndMode === 'block'
	let isPageDndMode = dndMode === 'page'
	let isLocaleDndMode = dndMode === 'locale'

	let promptable = aiPromptMode

	let draggable = (!isAlone && !linkMode && !promptable) || isSelected
	let droppable = isTextBlockDndMode && !promptable && !isSelected
	let deletable = !isAlone && !linkMode && !promptable && !selMode

	let ignoreDnd = isPageDndMode || isLocaleDndMode

	let isHighlighted = block.isHighlighted

	let lastMouseDownPos

	const classes = useStyles()

	return (
		<div
			id={`${side?`${side}-`:``}cr-${pageIndex}-${localeIndex}-${blockIndex}`}
			data-role='content-row'
			className={clsx(
				classes.root,
				twoColsMode && classes.twoCols,
				draggable && classes.draggable,
				droppable && classes.droppable,
				deletable && classes.deletable,
				linkMode && classes.linkable,
				promptable && classes.promptable,
				isHighlighted && classes.highlighted,
				isSelected && classes.selected,
				block.style === 6 && classes.withTopMargin
			)}
			onMouseUp={e=>{
				if(isAlone || !dndMode) return
				handleDrag({
					e,
					moment: 'unhold',
				})
			}}
			onMouseDown={e => {
				lastMouseDownPos = getClickPosition(e)
			}}
			onDoubleClick={e=>{
				if(isAlone && !linkMode && !aiPromptMode) return
				handleClick({
					e,
					pageIndex,
					localeIndex,
					blockIndex,
					isTargetPage,
					selRange,
					dblMode: true
				})
			}}
			onClick={e=>{
				if(isAlone && !linkMode && !aiPromptMode) return
				handleClick({
					e,
					lastMouseDownPos,
					block,
					pageIndex,
					localeIndex,
					blockIndex,
					isTargetPage,
					pageWidth,
					isAlone,
					singlePageMode,
					twoColsMode,
					linkMode,
					aiPromptMode,
					selRange,
					isTextBlockDndMode,
					currentDoc
				})
			}}
			draggable={!isAlone}
			onDragStart={e=>{
				if(isAlone) return
				handleDrag({
					e,
					moment: 'start',
					selMode,
					selRange,
					srcPageIndex: pageIndex,
					srcLocaleIndex: localeIndex,
					srcBlockIndex: blockIndex,
					twoColsMode,
					pageWidth
				})
			}}
			onDragEnd={e=>{
				handleDrag({
					e,
					selMode,
					selRange,
					moment: 'end',
					twoColsMode
				})
			}}
			onDragOver={e => {
				if(ignoreDnd) return
				handleDrop({e,moment: 'over', twoColsMode})
			}}
			onDragLeave={e => {
				if(ignoreDnd) return
				handleDrop({e,moment: 'leave', twoColsMode})
			}}
			onDrop={e => {
				if(ignoreDnd) return
				handleDrop({
					e,
					selMode,
					selRange,
					block,
					moment: 'drop',
					pageIndex,
					localeIndex,
					blockIndex,
					twoColsMode,
					currentDoc
				})
			}}
		>

			{children}

			<div className={classes.bg} />

			{!selMode && <OuterActions className={classes.outerActions}/>}

			<InnerActions
				className={classes.innerActions}
				sharedEditorProps={sharedEditorProps}
				pageIndex={pageIndex}
				localizedBlock={localizedBlock}
				blockIndex={blockIndex}
				localeIndex={localeIndex}
				block={block}
				twoColsMode={twoColsMode}
				singlePageMode={singlePageMode}
			/>

		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 16,
		marginBottom: 16,
		flexWrap: 'wrap',
		position: 'relative',
		'&:hover':{
			'& $innerActions': {
				display: 'flex'
			}
		}
	},

	twoCols: {
		alignItems: 'stretch',
		'&>div':{
			width: 'calc(50% - 8px)'
		}
	},

	withTopMargin: {
		marginTop: 20,
	},

	linkable: {
		boxShadow: `0px 4px 4px ${theme.block.link.default.shadow}`,
		borderRadius: theme.rounded,
		cursor: 'pointer',
		'&:hover': {
			boxShadow: `0px 0 8px 4px ${theme.block.link.active.shadow}`,
		}
	},

	promptable: {
		borderRadius: theme.rounded,
		cursor: 'pointer',
		position: 'relative',
		'& $bg': {
			display: 'none',
			position: 'absolute',
			zIndex: -1,
			top: -20,
			left: -20,
			right: -20,
			bottom: -20,
			background: theme.shadow.rainbow,
			boxShadow: `inset 0 0 10px 15px ${theme.background.default}, inset 0 0 3px 2px ${theme.background.default}`,
		},
		'&:hover':{
			'& $bg': {
				display: 'block',
			},
			'& [data-role="block-styling-border"]': {
				display: 'none'
			},
			'&>div:first-child': { backgroundColor: theme.block.prompt.background }
		}
	},

	bg: {
		position: 'absolute',
	},

	highlighted: {
		borderRadius: theme.rounded,
		boxShadow: `0px 0 8px 4px ${theme.block.link.focused.shadow}`,
	},

	selected: {
		'& [data-role="block-root"]': {
			backgroundColor: theme.selection.background,
			color: theme.selection.color,
		}
	},

	draggable: {
		'&:hover':{
			'& $outerActions': {
				display: 'flex'
			}
		},
		...theme.textBlockHandles.left(true),
	},

	droppable: {
		// marginBottom: 0,
		// paddingBottom: 16,
	},

	deletable: {
		...theme.textBlockHandles.right(true),
	},

	outerActions: {
		display: 'none'
	},

	innerActions: {
		display: 'none'
	},

}),{name: 'content-row'})