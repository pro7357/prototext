
import { connect } from 'react-redux'
import Switch from 'sharedComponents/Switch'
import UIBlock from 'sharedComponents/UIBlock'
import { setAllowBlockStyles } from 'exporterActions'


export default connect(mapStateToProps)(props => {

	const {
		allowBlockStyles,
	} = props

	return (
		<UIBlock
			isCompact
			isInline
		>
			<Switch
				label='Block styles'
				onClick={() => setAllowBlockStyles(!allowBlockStyles)}
				value={allowBlockStyles}
				withoutPadding
			/>
		</UIBlock>
	)
})


function mapStateToProps(state, props) {
	return {
		allowBlockStyles: state.exporter.allowBlockStyles,
	}
}