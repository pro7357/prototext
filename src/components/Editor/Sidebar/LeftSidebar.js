
import { connect } from 'react-redux'
import requestElectronApi from 'globalUtils/requestElectronApi'
import revealFileInFinder from 'globalUtils/revealFileInFinder'

import { switchPageView } from 'editorActions'
import { toogleTopbar } from 'topbarActions'
import {
	showExporter,
	showProtector,
	togglePresenter,
	showSettings,
	showHelper
} from 'layoutActions'
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
		encryption,
		autoSaveMode,

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

					<TextButton
						onClick={() => {
							showSettings()
						}}
					>
						Settings
					</TextButton>

					<TextButton
						onClick={() => {
							showHelper()
						}}
					>
						Help
					</TextButton>

				</>)}

				{(autoSaveMode && !currentDoc) && (
					<div>
						<TextButton
							isActive
							onClick={() => {
								requestElectronApi('hitMenuItem','save')
							}}
						>
							<b>Save this document once</b>
						</TextButton>
						<MutedTextLine>
							So future changes will be
							saved automatically.
						</MutedTextLine>
					</div>
				)}

				{currentDoc && (
					<MutedTextLine>
						{encryption && <LockIcon/>}
						<span
							title={currentDoc.fullPath}
							style={{
								cursor: 'pointer'
							}}
							onClick={e => {
								revealFileInFinder(currentDoc.fullPath)
							}}
						>
							{currentDoc.base}
						</span>
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
		autoSaveMode: state.settings.autoSaveMode
	}
}