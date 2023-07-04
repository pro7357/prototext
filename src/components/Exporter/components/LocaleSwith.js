
import { connect } from 'react-redux'
import Switch from 'sharedComponents/Switch'
import UIBlock from 'sharedComponents/UIBlock'
import { setAllowLocales } from 'exporterActions'


export default connect(mapStateToProps)(props => {

	const {
		allowLocales,
	} = props

	return (
		<UIBlock
			isCompact
			isInline
		>
			<Switch
				label='Localizations'
				onClick={() => setAllowLocales(!allowLocales)}
				value={allowLocales}
				withoutPadding
			/>
		</UIBlock>
	)
})


function mapStateToProps(state, props) {
	return {
		allowLocales: state.exporter.allowLocales,
	}
}