
import { connect } from 'react-redux'

import { undo } from 'store'
import { switchPageView, switchEditorMode } from 'editorActions'
import { toogleTopbar } from 'topbarActions'
import { showExporter, showHelper, showProtector, togglePresenter } from 'layoutActions'
import { toggleTheme } from 'theme/theme.actions'
import { themeIds } from 'theme/themes'

import TextButton from 'sharedComponents/TextButton'
import MutedTextLine from 'sharedComponents/MutedTextLine'
import Sidebar from './Sidebar'


const LockIcon = () => (
	<span
		onClick={() => {
			showProtector()
		}}
		style={{fontStyle: 'normal'}}
	>🔒 </span>
)


export default connect(mapStateToProps)(props => {

	const {

		themeIndex,
		pageViews,

		sharedEditorProps,
		targetPageIndex,
		history,
		encryption,

	} = props

	const {
		currentDoc,
		pageView
	} = sharedEditorProps

	return (
		<Sidebar
			sharedEditorProps={sharedEditorProps}
			targetPageIndex={targetPageIndex}
			side='left'
			footerContent={<>

				{history > 0 && (
					<TextButton
						isNotable
						onClick={() => {
							undo()
						}}
					>
						Undo
					</TextButton>
				)}

				{!isDesktopBuild && (<>

					<TextButton
						onClick={() => {
							toggleTheme()
						}}
					>
						Theme: <b>{themeIds[themeIndex]}</b>
					</TextButton>

					<TextButton
						onClick={() => {
							switchPageView((pageView + 1) % pageViews.length)
						}}
					>
						View: <b>{pageViews[pageView]}</b>
					</TextButton>

					<TextButton
						onClick={async () => {
							showExporter()
						}}
					>
						Export
					</TextButton>

					<TextButton
						onClick={() => {
							toogleTopbar(true)
						}}
					>
						Search
					</TextButton>

					<TextButton
						onClick={() => {
							showProtector()
						}}
					>
						Data protection
					</TextButton>

					<TextButton
						onClick={() => {
							togglePresenter()
						}}
					>
						Presentation
					</TextButton>

				</>)}

				<TextButton
					onClick={() => {
						showHelper()
					}}
				>
					Help
				</TextButton>

				{currentDoc && (
					<MutedTextLine>
						{encryption && <LockIcon/>}<span title={currentDoc.fullPath}>{currentDoc.base}</span>
					</MutedTextLine>
				)}

			</>}
		/>
	)

})


function mapStateToProps(state, props) {
	return {
		themeIndex: state.theme,
		pageViews: state.editor.pageViews,
		encryption: state.encryption,
	}
}