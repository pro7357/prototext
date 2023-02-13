
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

export default props => {

	const {
		style
	} = props

	const classes = useStyles()

	return (
		<div
			data-role='block-styling-border'
			className={classes.blockBorderRootStyle}
			data-depth={2}
		>
			<div
				className={clsx(
					classes.blockBorderStyle,
					style && classes['blockBorderStyle-'+style]
				)}
				data-depth={3}
			/>
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	...theme.blockBorderStyles,

}),{name: 'block-border'})