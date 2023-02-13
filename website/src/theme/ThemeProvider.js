
import { connect } from 'react-redux'
import { ThemeProvider } from 'react-jss'

import themes from './themes'


export default connect(mapStateToProps)(props => {
	return (
		<ThemeProvider theme={themes[props.themeIndex || 0]}>
			{props.children}
		</ThemeProvider>
	)
})


function mapStateToProps(state, props) {
	return {
		themeIndex: state.theme,
	}
}
