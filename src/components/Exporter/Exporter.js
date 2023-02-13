
import { connect } from 'react-redux'
import { useEffect } from 'preact/hooks'

import { toggleAllPagesSelection } from 'exporterActions'
import { switchLayout } from 'layoutActions'
import Form from 'sharedComponents/Form'
import PageSelector from './components/PageSelector'
import FormatSwitch from './components/FormatSwitch'
import LocaleSwith from './components/LocaleSwith'
import StylingSwith from './components/StylingSwith'
import MergePagesSwith from './components/MergePagesSwith'
import ExportingPathInputs from './components/ExportingPathInputs'
import Preview from './components/Preview'

import prepareDataForExporting from './utils/prepareDataForExporting'
import exportData from './utils/exportData'


export default connect(mapStateToProps)(props => {

	const {
		pages,
		scrollbarsMode
	} = props

	useEffect(() => {
		// toggleAllPagesSelection(pages, true)
	}, [])


	const handleExportBtnClick = () => {

		let exportingProps = prepareDataForExporting()

		if(isDesktopBuild) {
			exportData(exportingProps)
		} else {
			console.log('exportingProps')
			console.log(exportingProps)
		}

	}


	return (
		<Form
			title='Export Options'
			scrollbarsMode={scrollbarsMode}
			primaryAction={{
				label: 'Export',
				action: handleExportBtnClick
			}}
			secondaryActions={[
				{
					label: 'Back to Editor',
					isSemiDangerous: true,
					action: () => {
						switchLayout(0)
					}
				}
			]}
		>

			<PageSelector pages={pages} />

			<>

				<FormatSwitch/>

				<LocaleSwith/>

				<StylingSwith/>

				<MergePagesSwith/>

				<ExportingPathInputs/>

			</>

			<Preview />

		</Form>
	)

})


function mapStateToProps(state, props) {
	return {
		pages: state.editor.content,
	}
}