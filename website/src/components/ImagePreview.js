
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		src
	} = props

	const classes = useStyles()

	return (
		<div
			className={classes.root}
			onClick={() => {
				window.open(src, '_blank')
			}}
		>
			<img
				src={src}
				className={classes.img}
			/>
			<div>Preview</div>
		</div>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		borderRadius: theme.rounded,
		cursor: 'pointer',
		position: 'relative',
		'&>div': {
			display: 'none',
		},
		'&:hover': {
			background: theme.background.warmGradient,
			'&>div': {
				display: 'block',
				fontWeight: 'bold',
				fontSize: 24,
				position: 'absolute',
				width: '100%',
				textAlign: 'center',
				color: 'white',
				top: 'calc(50% - 20px)',
			},
			'&>img': {
				opacity: 0.2
			}
		}
	},

	img: {
		borderRadius: theme.rounded,
		overflow: 'hidden',
		display: 'block'
	},


}),{name: 'image-preview'})