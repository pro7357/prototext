
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import formats from 'sharedUtils/fileFormats'
import ButtonGroup from 'sharedComponents/ButtonGroup'
import UIBlock from 'sharedComponents/UIBlock'
import { setFormat } from 'exporterActions'


export default connect(mapStateToProps)(props => {

	const {
		format,
	} = props

	const classes = useStyles()

	return (
		<UIBlock
			label='Format'
		>
			<ButtonGroup
				onClick={setFormat}
				className={classes.formatBtns}
				upperCase
				value={format}
				options={formats}
			/>
		</UIBlock>
	)
})


function mapStateToProps(state, props) {
	return {
		format: state.exporter.format,
	}
}


const useStyles = createUseStyles(theme => ({
	formatBtns: {
		height: 'auto'
	},
}))