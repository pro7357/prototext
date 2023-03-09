
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { store } from 'store'
import { useState, useEffect } from 'preact/hooks'
import parseFilePath from 'globalUtils/parseFilePath'

import Topbar from './Topbar/Topbar'
import Page from './Page/Page'
import LeftSidebar from './Sidebar/LeftSidebar'
import RightSidebar from './Sidebar/RightSidebar'
import ContentShadow from './ContentShadow'

import handleKeyDownInsideEsitor from './utils/handleKeyDownInsideEsitor'



export default connect(mapStateToProps)(props => {

	const {
		scrollbarsMode,
		filePath,
		history,
		pageView,
		leftSideFocus,
		rightSideFocus,
		topbarMode,
		searchText,
		searchMatchCase,
		searchByTags,
		searchTags,
		globalSearch,
		spellcheck,
		selRange,
	} = props

	const singlePageMode = pageView === 0
	const twoPagesMode = pageView === 1
	const localizationMode = pageView === 2

	const state = store.getState()
	let content = state.editor.content
	const alonePageMode = content.length === 1
	const targetPageIndex = state.editor.targetPageIndex

	let sharedEditorProps = props

	sharedEditorProps.scrollbarsMode = scrollbarsMode
	sharedEditorProps.spellcheck = spellcheck

	sharedEditorProps.localizationMode = localizationMode

	sharedEditorProps.search = searchText && {
		text: searchText,
		tags: searchTags,
		isTagsMode: searchByTags,
		matchCase: searchMatchCase,
		global: globalSearch,
		hiddenPages: null
	}

	sharedEditorProps.currentDoc = filePath && parseFilePath(filePath)

	useEffect(() => {
		document.body.addEventListener('keydown', handleKeyDownInsideEsitor)
	},[])

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<LeftSidebar
				sharedEditorProps={sharedEditorProps}
				targetPageIndex={leftSideFocus}
				history={history}
			/>

			<div className={classes.editor}>

				{topbarMode && <Topbar/>}

				<div className={classes.editorContent}>

					<ContentShadow side='top' withScrollbarOffset />

					{localizationMode && (
						<Page
							sharedEditorProps={sharedEditorProps}
							page={content[leftSideFocus]}
							pageIndex={leftSideFocus}
							isTargetPage={true}
							targetLocaleIndex={rightSideFocus}
							twoColsMode={localizationMode}
							alonePageMode={alonePageMode}
						/>
					)}

					{!localizationMode && (
						<Page
							sharedEditorProps={sharedEditorProps}
							page={content[leftSideFocus].content[0]}
							pageIndex={leftSideFocus}
							isTargetPage={targetPageIndex === leftSideFocus}
							targetLocaleIndex={0}
							singlePageMode={singlePageMode}
							alonePageMode={alonePageMode}
							side={singlePageMode ? 'center' : 'left'}
						/>
					)}


					{twoPagesMode && (
						<Page
							sharedEditorProps={sharedEditorProps}
							page={localizationMode
								? content[leftSideFocus].content[rightSideFocus]
								: content[rightSideFocus].content[0]
							}
							pageIndex={rightSideFocus}
							isTargetPage={targetPageIndex === rightSideFocus}
							targetLocaleIndex={0}
							alonePageMode={alonePageMode}
							side='right'
						/>
					)}

					<ContentShadow side='bottom' withScrollbarOffset />

				</div>
			</div>

			{!singlePageMode && (
				<RightSidebar
					sharedEditorProps={sharedEditorProps}
					targetPageIndex={localizationMode ? leftSideFocus : rightSideFocus}
					targetLocaleIndex={rightSideFocus}
				/>
			)}

		</div>
	)

})


function mapStateToProps(state, props) {
	return {
		timestamp: state.editor.timestamp,
		pageView: state.editor.pageView,
		leftSideFocus: state.editor.leftSideFocus,
		rightSideFocus: state.editor.rightSideFocus,
		localeOptions: state.editor.localeOptions,
		localeConfigMode: state.editor.localeConfigMode,
		filePath: state.filePath,
		linkMode: state.editor.linkMode,
		aiPromptMode: state.editor.aiPromptMode,
		fbbMode: state.fbbMode,
		dndMode: state.editor.dndMode,
		selMode: Boolean(state.editor.selRange),
		selRange: state.editor.selRange,
		topbarMode: state.topbar.isActive,
		searchText: state.topbar.searchText,
		searchMatchCase: state.topbar.searchMatchCase,
		searchByTags: state.topbar.searchByTags,
		searchTags: state.topbar.searchTags,
		globalSearch: state.topbar.searchInAllPages,
		history: state.history,
		spellcheck: state.spellcheck,
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		height: '100vh',
		overflow: 'hidden',
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'center',
	},

	editor: {
		display: 'flex',
		flexGrow: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'center',
		gap: 16,
		overflow: 'hidden',
		position: 'relative'
	},

	editorContent: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		position: 'relative',
		overflow: 'hidden',
	},

}),{name: 'editor'})
