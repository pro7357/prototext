
import { switchEditorMode } from '../editor.actions'
import TextButton from 'sharedComponents/TextButton'
import Sidebar from './Sidebar'


export default props => {

	const {
		sharedEditorProps,
		targetPageIndex,
		targetLocaleIndex,
	} = props

	const {
		localizationMode,
		localeConfigMode
	} = sharedEditorProps

	return (
		<Sidebar
			sharedEditorProps={sharedEditorProps}
			targetPageIndex={targetPageIndex}
			targetLocaleIndex={targetLocaleIndex}
			side='right'
			footerContent={<>
				{(localizationMode) && (
					<div>
						{!localeConfigMode && (
							<TextButton

								onClick={() => {
									switchEditorMode('localeConfig',true)
								}}
							>
								Edit locales
							</TextButton>
						)}
						{localeConfigMode && (
							<TextButton
								isSemiDangerous
								onClick={() => {
									switchEditorMode('localeConfig',false)
								}}
							>
								Finish locale editing
							</TextButton>
						)}
					</div>
				)}
			</>}
		/>
	)

}
