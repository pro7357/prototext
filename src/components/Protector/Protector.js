
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import { showEditor } from 'layoutActions'
import Form from 'sharedComponents/Form'

import Encryption from './components/Encryption'
import Decryption from './components/Decryption'


export default connect(mapStateToProps)(props => {

	const {
		scrollbarsMode,
		unlockMode,
	} = props

	const classes = useStyles()

	let formTitle = unlockMode
		? `This document is locked`
		: `Protect Data`

	return (
		<Form
			title={formTitle}
			secondaryActions={[{
				label: 'Close',
				isSemiDangerous: true,
				action: () => {
					showEditor()
				}
			}]}
			scrollbarsMode={scrollbarsMode}
			className={classes.root}
			//sectionsClassName={classes.sectionsClassName}
			withFixedColumnWidth
			withWideColumnGap
		>

			{unlockMode ? <Decryption/> : <Encryption/>}

		</Form>
	)

})


function mapStateToProps(state, props) {
	return {
		unlockMode: state.encryption && state.encryption.unlockMode
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		textAlign: 'left',
		fontSize: 16,
	},

}),{name: 'protector'})