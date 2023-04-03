
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import { showEditor } from 'layoutActions'
import SmartForm from 'sharedComponents/SmartForm'

import models from './models/settings'
import setSettingsProperty from './settings.actions'


export default connect(mapStateToProps)(props => {

	const {
		scrollbarsMode,
		settings
	} = props

	const classes = useStyles()

	return (
		<SmartForm
			title='App settings'
			secondaryActions={[
				{
					label: 'Close',
					isSemiDangerous: true,
					action: () => {
						showEditor()
					}
				}
			]}
			scrollbarsMode={scrollbarsMode}
			className={classes.root}
			//sectionsClassName={classes.sectionsClassName}
			withFixedColumnWidth
			withWideColumnGap
			models={models}
			state={settings}
			onInput={(fieldId, newValue) => {
				setSettingsProperty(
					fieldId,
					newValue
				)
			}}
		/>
	)

})


function mapStateToProps(state, props) {
	return {
		settings: state.settings
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		textAlign: 'left',
		fontSize: 16,
	},

}),{name: 'settings'})