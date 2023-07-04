
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'


export default props => {

	const {
		src,
		className,
		extraProps = {},
	} = props

	let controls = typeof props.controls === 'undefined' ? true  : props.controls

	const classes = useStyles()

	return (
		<audio
			key={src}
			className={clsx(
				classes.root,
				className
			)}
			controls={controls}
			{...extraProps}
		>
  			<source src={src} type='audio/mpeg' />
		</audio>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		maxWidth: 600,
		outline: 'none',
		'&::-webkit-media-controls-panel': {
			backgroundColor: [theme.tag.background, '!important'],
			boxShadow: ['none', '!important'],
		},
		'&::-webkit-media-controls-current-time-display': {
			color: [theme.text.active, '!important'],
			boxShadow: ['none', '!important'],
	  	},
		'&::-webkit-media-controls-time-remaining-display': {
			color: [theme.text.default, '!important'],
			boxShadow: ['none', '!important'],
	  	},
	},

}),{name: 'audio'})