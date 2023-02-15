
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from './Section'


export default props => {

	const classes = useStyles()

	return (
		<Section isCentred isVFlex className={classes.footer}>
			<div className={classes.thk}>
				<b>Thank you and best of luck with your journey of self-discovery!</b>
			</div>
			<i className={classes.qt}>
				Unloading the mental stack is a useful practice to decompose any difficult professional task or make some critical decision in life.
			</i>
		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	footer: {
		paddingTop: 0,
		paddingBottom: 140
	},

	qt: {
		maxWidth: 700
	}

}),{name: 'footer'})