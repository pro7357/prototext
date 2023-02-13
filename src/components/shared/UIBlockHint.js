
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		children,
		isNotable,
		isBig,
		isNormal,
		className
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(
			classes.root,
			isNotable && classes.notable,
			isBig && classes.big,
			isNormal && classes.normal,
			className
		)}>
			{children}
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		fontSize: 18,
		fontStyle: 'italic',
		opacity: 0.5
	},

	notable: {
		fontWeight: 'bold',
		opacity: 1,
		fontStyle: 'normal'
	},

	big: {
		fontSize: 20,
	},

	normal: {
		opacity: 1,
		fontStyle: 'normal'
	}


}),{name: 'ui-block-hint'})
