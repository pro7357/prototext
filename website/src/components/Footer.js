
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from './Section'


export default props => {

	const classes = useStyles()

	return (
		<Section isCentred isCompact>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {

	},

}),{name: 'footer'})