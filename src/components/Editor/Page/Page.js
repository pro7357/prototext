
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { bugReportsUrl } from 'globalConstants'
import isContentRowHidden from 'sharedUtils/isContentRowHidden'
import ContentRow from './ContentRow/ContentRow'
import Block from './Block/Block'
import MidDropArea from '../MidDropArea'
import PageFooter from './PageFooter'
import createBlock from 'editorUtils/createBlock'

import { localesDict } from 'globalUtils/allLocaleOptions'


let prevYScrollPagesPos = {
	left: {},
	right: {},
	center: {},
	localization: {}
}



export default connect(mapStateToProps)(props => {

	const {

		// Local connection to Redux Store.
		pageWidth,

		// Parental Props.
		sharedEditorProps,
		page,
		pageId,
		pageIndex,
		isTargetPage,
		targetLocaleIndex,
		singlePageMode,
		alonePageMode,
		twoColsMode,
		side,

	} = props

	const {
		localeOptions,
		topbarMode,
		scrollbarsMode,
		search,
		selMode,
		selRange,
	} = sharedEditorProps


	const isFirstPage = pageIndex === 0

	let targetContent = twoColsMode
		? page.content[0].content
		: page.content

	let isLocalesExists = twoColsMode && localeOptions.length > 1

	let gap = 16

	let minWidth = 200
	let maxWidth = 10000

	let pwIsOutOfRange = pageWidth && (pageWidth < minWidth || pageWidth > maxWidth)

	let displayPageWidth = pageWidth &&
		pageWidth < minWidth
			? minWidth
			: pageWidth > maxWidth
				? maxWidth
				: pageWidth

	let pageContentWidth = displayPageWidth
		? (displayPageWidth + gap*(twoColsMode?1.5:2)) * (twoColsMode?2:1)
		: '100%'

	let contentLength = page.content.length
	let targetContentLength = targetContent && targetContent.length

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				side && classes[side+'Side'],
				twoColsMode && (scrollbarsMode ? classes.twoColsWithFakeScrollbar : classes.twoCols),
				topbarMode && classes.withTopbar,
				scrollbarsMode && classes.withVisibleScrollbars
			)}
			onScroll={e => {
				setTimeout(() => {
					prevYScrollPagesPos[side][pageId] = e.target.scrollTop
				}, 0)
			}}
			ref={node => {
				if(node) {
					setTimeout(() => {
						node.scroll({
							top: prevYScrollPagesPos[side][pageId] || 0,
							behavior: 'auto'
						})
					}, 0)
				}
			}}
		>
			<div
				className={classes.content}
				style={{width: pageContentWidth}}
			>

				{targetContentLength > 0 && targetContent.map((block, blockIndex)=> {

					if(block === null || typeof block === 'undefined') {
						block = createBlock(
							`Oops... You have met with some kind of bug. Please describe how this block was created and send your bug report: ${bugReportsUrl}`,
							{style: 1}
						)
					}

					let blockLang = localesDict[localeOptions[0]]

					let localizedBlock = twoColsMode &&
						isLocalesExists &&
						page.content[targetLocaleIndex] &&
						page.content[targetLocaleIndex].content[blockIndex]

					let localizedBlockLang = localizedBlock &&
						localesDict[localeOptions[targetLocaleIndex]]

					let isAlone = targetContentLength === 1

					let isSelected = selMode &&
						isTargetPage &&
						selRange.includes(blockIndex)

					if(isContentRowHidden({search,block,localizedBlock})) {
						return null
					}

					return (

						<ContentRow
							sharedEditorProps={sharedEditorProps}
							isSelected={isSelected}
							twoColsMode={twoColsMode}
							block={block}
							localizedBlock={localizedBlock}
							pageIndex={pageIndex}
							blockIndex={blockIndex}
							localeIndex={targetLocaleIndex}
							isTargetPage={isTargetPage}
							pageWidth={pageWidth}
							isAlone={isAlone}
							singlePageMode={singlePageMode}
							side={side}
						>

							<Block
								sharedEditorProps={sharedEditorProps}
								isSelected={isSelected}
								block={block}
								twoColsMode={twoColsMode}
								pageIndex={pageIndex}
								blockIndex={blockIndex}
								isAlone={isAlone}
								localeIndex={0}
								pageWidth={pageWidth}
								singlePageMode={singlePageMode}
								lang={blockLang}
								side={side}
							/>

							{(twoColsMode && isLocalesExists) && (
								<Block
									sharedEditorProps={sharedEditorProps}
									isSelected={isSelected}
									block={localizedBlock}
									originalLocaleBlock={block}
									twoColsMode={twoColsMode}
									pageIndex={pageIndex}
									blockIndex={blockIndex}
									isAlone={isAlone}
									localeIndex={targetLocaleIndex}
									pageWidth={pageWidth}
									lang={localizedBlockLang}
								/>
							)}

							<MidDropArea />

						</ContentRow>

					)

				})}

				{!search && (
					<PageFooter
						sharedEditorProps={sharedEditorProps}
						pageIndex={pageIndex}
						singlePageMode={singlePageMode}
						alonePageMode={alonePageMode}
						twoColsMode={twoColsMode}
						isLocalesExists={isLocalesExists}
						pageWidth={pageWidth}
						pwIsOutOfRange={pwIsOutOfRange}
					/>
				)}

			</div>
		</div>
	)


})

function mapStateToProps(state, props) {
	return {
		pageWidth: state.editor.pageWidth,
	}
}

const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		gap: 16,
		height: '100vh',
		padding: [32,16,0,16],
		overflowX: 'hidden',
		overflowY: 'scroll',
		//transition: 'padding-top 500ms ease',
		...theme.hiddenScrollbar
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

	withTopbar: {
		paddingTop: 120,
	},

	twoCols: {
		justifyContent: 'center',
	},

	twoColsWithFakeScrollbar: {
		justifyContent: 'center',
		borderLeft: `10px solid ${theme.fakeScrollbar}`
	},

	centerSide: {
		direction: 'ltr',
		justifyContent: 'center',
	},

	leftSide: {
		direction: 'rtl',
		paddingRight: 0,
		'& div':{
			direction: 'ltr',
		}
	},

	rightSide: {
		paddingLeft: 0,
		direction: 'ltr',
	},

	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		padding: [0,16],
		'& > div:first-child': {
			marginTop: 0
		}
	},

}),{name: 'page'})
