
import { connect } from 'react-redux'

import Input from 'sharedComponents/Input'
import UIBlock from 'sharedComponents/UIBlock'
import UIBlockLabel from 'sharedComponents/UIBlockLabel'
import UIBlockHint from 'sharedComponents/UIBlockHint'

import formats from 'sharedUtils/fileFormats'
import requestOutputDir from 'exporterUtils/requestOutputDir'

import {
	setOutputDirectory,
	setOutputFilename,
} from 'exporterActions'

import {
	defOutputDirectory,
	defOutputFilename
} from 'globalConstants'


export default connect(mapStateToProps)(props => {

	const {
		format,
		allowMergePages,
		outputDirectory,
		outputFilename,
	} = props


	const handleChooseOutputDirectory = async v => {
		let dir = await requestOutputDir()
		setOutputDirectory(dir)
	}

	return (
		<UIBlock
			label='Output directory'
			secondaryActions={[
				{
					label: 'Choose',
					action: handleChooseOutputDirectory
				}
			]}
		>

			<Input
				onInput={setOutputDirectory}
				value={outputDirectory}
				placeholder={defOutputDirectory}
				insideUIBlock
			/>

			<UIBlockLabel>
				Output file name{allowMergePages?``:`s`}
			</UIBlockLabel>

			<Input
				onInput={setOutputFilename}
				value={outputFilename}
				placeholder={allowMergePages?defOutputFilename:''}
				insideUIBlock
			/>

			{(!allowMergePages && outputFilename) && (
				<UIBlockHint>
					This will be multiple file saving. The app adds an index to each file name: <b>{outputFilename}-1.{formats[format]}</b>
				</UIBlockHint>
			)}
			{(!allowMergePages && outputFilename) && (
				<UIBlockHint>
					Leave the file name field empty if you want to use page titles as file names.
				</UIBlockHint>
			)}
			{(!allowMergePages && !outputFilename) && (
				<UIBlockHint>
					This will be multiple file saving. The file names will match the page titles.
				</UIBlockHint>
			)}

		</UIBlock>
	)

})


function mapStateToProps(state, props) {
	return {
		format: state.exporter.format,
		allowMergePages: state.exporter.allowMergePages,
		outputDirectory: state.exporter.outputDirectory,
		outputFilename: state.exporter.outputFilename
	}
}