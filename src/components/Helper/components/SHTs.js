
import { createUseStyles } from 'react-jss'
import SHT from './SHT'
import Heading from './Heading'

export default props => {

	const {
		title,
		content,
		offsetTop,
	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>

			{title && <Heading offsetTop={offsetTop}>{title}</Heading>}

			{content.map(item => {
				let isItemArr = Array.isArray(item)
				return (
					<SHT
						shortcut={isItemArr && item[0]}
						primaryContent={isItemArr && item[1]}
						secondaryContent={isItemArr ? item[2] : item}
					/>
				)
			})}

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 24,
	},

}),{name: 'helper-shts'})