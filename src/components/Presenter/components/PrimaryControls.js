
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import SmartForm from 'sharedComponents/SmartForm'
import models from '../models/presentation'
import { setPresenterProperty } from 'presenterActions'


export default props => {

	const {
		scrollbarsMode,
		presenterProps,
	} = props

	const classes = useStyles()

	return (
		<SmartForm
			scrollbarsMode={scrollbarsMode}
			className={classes.form}
			sectionsClassName={classes.sections}
			isNestedForm={!false}
			withFixedColumnWidth
			withWideColumnGap
			models={models}
			state={presenterProps}
			onInput={(fieldId, newValue) => {
				setPresenterProperty(
					fieldId,
					newValue
				)
			}}
		/>
	)
}

const useStyles = createUseStyles(theme => ({

	form: {
		padding: 0,
		'& b': {
			fontWeight: 'normal'
		}
	},

	sections: {
		gap: 20,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},

}),{name: 'presenter-main-controls'})