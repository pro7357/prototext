
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import requestElectronApi from 'globalUtils/requestElectronApi'
import clsx from 'clsx'

import UIBlock from 'sharedComponents/UIBlock'
import Switch from 'sharedComponents/Switch'
import TextButton from 'sharedComponents/TextButton'

import { switchFullscreenWelcomeMode } from '../welcome.actions'
import setSettingsProperty from 'settingsActions'
import { toggleTheme } from 'theme/theme.actions'


export default connect(mapStateToProps)(props => {

	const {
		isFSStartingMode,
		autoSaveMode
	} = props

	const classes = useStyles()

	return (
		<UIBlock className={classes.root}>

			<div className={classes.heading}>
				Select the items you want to work on right now. Each one will be opened in a new window.
			</div>

			<Switch
				label='Multiple Desktops (MacOS)'
				onClick={() => {
					switchFullscreenWelcomeMode(!isFSStartingMode)
					requestElectronApi('switchFullscreen', !isFSStartingMode)
				}}
				isActive={isFSStartingMode}
				className={classes.switch}
				withoutPadding
				isNotable
				isSmall
			/>

			<Switch
				label='Auto-save'
				onClick={() => {
					setSettingsProperty('autoSaveMode', !autoSaveMode)
					requestElectronApi('hitMenuItem', 'auto-save')
				}}
				isActive={autoSaveMode}
				className={classes.switch}
				withoutPadding
				isNotable
				isSmall
			/>

			<TextButton
				className={classes.textButton}
				onClick={toggleTheme}
				isNotable
			>
				Theme
			</TextButton>

		</UIBlock>
	)

})

function mapStateToProps(state, props) {
	return {
		autoSaveMode: state.settings.autoSaveMode
	}
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: 12,
	},

	heading: {
		marginBottom: 4
	},

	switch: {
		fontSize: 16
	},

	textButton: {
		fontSize: 16
	}

}),{name: 'start-settings'})