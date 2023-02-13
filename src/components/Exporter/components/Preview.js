
import { connect } from 'react-redux'

import UIBlock from 'sharedComponents/UIBlock'
import Code from 'sharedComponents/Code'
import Textarea from 'sharedComponents/Textarea'

import formats from 'sharedUtils/fileFormats'
import getFormatExamples from 'exporterUtils/getFormatExamples'
import prepareDataForExporting from 'exporterUtils/prepareDataForExporting'

import {
	setPreview,
} from 'exporterActions'


export default connect(mapStateToProps)(props => {

	const {
		isSchematicPreview,
		format,
		allowLocales,
		allowBlockStyles,
		allowMergePages,
	} = props


	return (
		<UIBlock
			label={isSchematicPreview ? `Schematic preview` : `Result output`}
			secondaryActions={[
				{
					label: 'Toggle',
					action: () => setPreview(!isSchematicPreview)
				}
			]}
		>

			{isSchematicPreview && (
				<Code
					content={getFormatExamples[formats[format]](
						allowLocales,
						allowBlockStyles,
						allowMergePages
					)}
				/>
			)}

			{!isSchematicPreview && (
				<Textarea
					isTransparent
					handleRef={node => {
						if(node) {
							node.value = prepareDataForExporting(true)
						}
					}}
				/>
			)}

		</UIBlock>
	)

})


function mapStateToProps(state, props) {
	return {
		isSchematicPreview: state.exporter.isSchematicPreview,
		selectedPages: state.exporter.selectedPages,
		format: state.exporter.format,
		allowLocales: state.exporter.allowLocales,
		allowBlockStyles: state.exporter.allowBlockStyles,
		allowMergePages: state.exporter.allowMergePages,
	}
}