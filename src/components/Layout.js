
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import WindowControls from './WindowControls/WindowControls'

import Editor from './Editor/Editor'
import Exporter from './Exporter/Exporter'
import Helper from './Helper/Helper'
import Protector from './Protector/Protector'
import Presenter from './Presenter/Presenter'
import Settings from './Settings/Settings'
import Welcome from './Welcome/Welcome'

const components = [
	Welcome,
	Editor,
	Exporter,
	Helper,
	Protector,
	Presenter,
	Settings,
]

export default connect(mapStateToProps)(props => {

	const {
		layout,
		scrollbarsMode
	} = props

	const Component = components[layout]

	const classes = useStyles()

	return (
		<div className={classes.layout}>
			<WindowControls/>
			<Component scrollbarsMode={scrollbarsMode} />
		</div>
	)

})


function mapStateToProps(state, props) {
	return {
		layout: state.layout,
		scrollbarsMode: state.scrollbarsMode
	}
}


const useStyles = createUseStyles(theme => ({

	'@global': {

		// Local fonts.
		'@font-face': theme.typography.localFontsCss,

		'*': {
			boxSizing: 'border-box',
		},

		'::selection': {
			color: theme.selection.color,
			backgroundColor: theme.selection.background,
		},

		body: {
			padding: 0,
			margin: 0,
			overflow: 'hidden',
			fontSize: theme.typography.sizes.default,
			fontFamily: theme.typography.fonts.primary,
			backgroundColor: `${theme.background.default} !important`,
			color: theme.text.default,
			borderTop: theme.isFrameless ? 'none' : `1px solid ${theme.block.background}`,
			textShadow: theme.isWindows ? '0px 0px 0px rgb(0,0,0)': 'none',
		}

	},

	layout: {
		position: 'relative',
		backgroundColor: theme.background.default,
		zIndex: 2
	}

}))

