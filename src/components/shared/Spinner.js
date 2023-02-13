
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		isSmall,
		className
	} = props

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				isSmall && classes.isSmall,
				className
			)}
		>
			<svg className={classes.svg} viewBox='22 22 44 44'>
				<circle className={classes.circle} cx='44' cy='44' r='20' />
			</svg>
		</div>
	)

}

const useStyles = createUseStyles((theme) => ({

	root: {
		width: 20 ,
		height: 20 ,
	},

	isSmall: {
		width: 14,
		height: 14,
	},

	svg: {
		animation: '$rotate 1.5s linear infinite',
		height: '100%',
		width: '100%',
	},

	circle: {
		strokeDasharray: '1,200',
		strokeDashoffset: 0,
		stroke: 'currentColor',
		animation: '$dash 1.5s ease-in-out infinite 0s',
		strokeLinecap: 'round',
		fill: 'none',
		strokeWidth: 4,
	},

	'@keyframes rotate': {
		to: {
			transform: 'rotate(360deg)'
		}
	},

	'@keyframes dash': {
		'0%': {
		  strokeDasharray: '1,200',
		  strokeDashoffset: 0,
		},
		'50%': {
		  strokeDasharray: '89,200',
		  strokeDashoffset: '-35',
		},
		'100%': {
		  strokeDasharray: '89,200',
		  strokeDashoffset: '-124',
		}
	},

}),{name: 'spinner'})