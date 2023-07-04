
import { connect } from 'react-redux'
import Switch from 'sharedComponents/Switch'
import UIBlock from 'sharedComponents/UIBlock'
import { setAllowMergePages } from 'exporterActions'


export default connect(mapStateToProps)(props => {

	const {
		allowMergePages,
	} = props

	return (
		<UIBlock
			isCompact
			isInline
		>
			<Switch
				label='Merge pages'
				onClick={() => setAllowMergePages(!allowMergePages)}
				value={allowMergePages}
				withoutPadding
			/>
		</UIBlock>
	)
})


function mapStateToProps(state, props) {
	return {
		allowMergePages: state.exporter.allowMergePages,
	}
}