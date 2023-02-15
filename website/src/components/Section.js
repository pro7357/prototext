
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		children,
		isWide,
		isCentred,
		isHFlex,
		isVFlex,
		isCompact,
		className,
		id = null
	} = props

	const classes = useStyles()

	return (
		<div
			id={id}
			className={clsx(
				classes.root,
				isWide && classes.wide,
				isCentred && classes.centred,
				(isHFlex || isVFlex) && classes.flex,
				isHFlex && classes.hFlex,
				isVFlex && classes.vFlex,
				isCompact && classes.compact,
				className
			)}
		>
			{children}
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		maxWidth: 1064,
		padding: [48,24],
	},

	compact: {
		padding: 0,
		paddingBottom: 0,
	},

	wide: {
		maxWidth: '100%',
	},

	centred: {
		textAlign: 'center'
	},

	flex: {
		display: 'flex',
		gap: 16,
		alignItems: 'center'
	},

	hFlex: {
		flexDirection: 'row'
	},

	vFlex: {
		flexDirection: 'column'
	}

}),{name: 'section'})