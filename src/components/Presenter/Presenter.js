
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Sidebar from './components/Sidebar'
import Slides from './components/layouts/Slides'
import Flow from './components/layouts/Flow'
import parseFilePath from 'globalUtils/parseFilePath'
import collectContent from './utils/collectContent'


export default connect(mapStateToProps)(props => {

	const {
		theme,
		scrollbarsMode,
		filePath,
		editorProps,
		topbarProps,
		presenterProps,
	} = props

	const {
		allPagesMode,
		tagFilterMode,
		slideMode,
		groupBlocksMode,
		contrastDarkMode,
		locale,
		exposeLinkedContent,
	} = presenterProps

	const {
		content: allEditorContent,
		leftSideFocus,
		targetPageIndex,
		pageView,
	} = editorProps

	const {
		searchByTags,
		searchTags
	} = topbarProps

	const isTwoPagesView = pageView === 1

	const focus = isTwoPagesView
		? targetPageIndex
		: leftSideFocus

	const content = collectContent({
		allEditorContent,
		content: allEditorContent,
		targetLocaleIndex: locale,
		exposeLinkedContent,
		depthLimit: 3,
		allPagesMode,
		tagFilterMode,
		searchByTags,
		searchTags,
		focus,
	})

	const currentDoc = filePath && parseFilePath(filePath)

	const ContentLayout = slideMode ? Slides : Flow

	const classes = useStyles()

	return (
		<div
			tabIndex={0}
			className={clsx(
				classes.root,
			)}
		>

			<Sidebar
				presenterProps={presenterProps}
				editorProps={editorProps}
			/>

			<ContentLayout
				presenterProps={presenterProps}
				scrollbarsMode={scrollbarsMode}
				currentDoc={currentDoc}
				content={content}
				className={clsx(
					contrastDarkMode && classes.darkMode
				)}
			/>

		</div>
	)

})


function mapStateToProps(state, props) {
	return {
		filePath: state.filePath,
		editorProps: state.editor,
		presenterProps: state.presenter,
		topbarProps: state.topbar,
		theme: state.theme,
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		width: '100%',
		height: '100vh',
		justifyContent: 'center',
		overflow: 'hidden',
		outline: 'none',
	},

	content: {
		display: 'flex',
		flexGrow: 1,
		width: 'calc(100% - 280px)',
		height: '100vh',
		flexDirection: 'column',
		gap: 40,
		padding: 60,
		outline: 'none',
		overflowX: 'hidden',
		overflowY: 'scroll',
		...theme.hiddenScrollbar
	},

	contentInSlideMode: {
		gap: 0,
		padding: 0,
	},

	darkMode: {
		backgroundColor: 'black',
		color: 'white'
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

	footer: {
		padding: [50,0]
	},

}),{name: 'presenter'})