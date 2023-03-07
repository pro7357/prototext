
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Video from 'app/components/shared/Video'
import { useRef } from 'preact/hooks'


export default connect(mapStateToProps)(props => {

	const {
		theme
	} = props

	useRef

	let lockScreenNode = useRef()
	let videoNode = useRef()

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div
				ref={node => {
					if(node) {
						lockScreenNode.current = node
					}
				}}
				className={classes.lockScreen}
				onClick={e => {
					lockScreenNode.current.style.display = 'none'
					{/* videoNode.current.base.requestFullscreen() */}
					videoNode.current.base.play()
				}}
			>

				{/* <div className={classes.poster}/> */}

				<svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="xMinYMin" width="150" height="150" viewBox="0 0 150 150" style=""><circle cx="75" cy="75" fill="#fff" fill-opacity=".15" r="75"></circle><path d="m56.21 44.55v62.62a3.1 3.1 0 0 0 4.73 2.64l51-31.31a3.1 3.1 0 0 0 0-5.29l-51-31.31a3.1 3.1 0 0 0 -4.73 2.65z" fill="#fff"></path></svg>
			</div>

			<Video
				ref={node => {
					if(node) {
						videoNode.current = node
					}
				}}
				className={classes.video}
				src={`/assets/videos/prototext-cards-overview.mp4`}
				withoutBg
				controls={true}
				autoplay={false}
				loop={false}
			/>

		</div>
	)
})


function mapStateToProps(state, props) {
	return {
		theme: state.theme,
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		// height: 600,
		aspectRatio: 'auto 1728 / 1080',
		borderRadius: theme.rounded * 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		position: 'relative',
		overflow: 'hidden',
		boxShadow: `0 8px 48px ${theme.shadow.default}`,
	},

	lockScreen: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
		// backgroundColor: 'black',
		backgroundColor: theme.background.default,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		'& svg': {
			zIndex: 1,
		},
		'& circle': {
			fill: theme.button.notable.background
		},
		'& path': {
			fill: theme.button.notable.background
		},
		'&:hover': {
			'& svg': {
				transform: 'scale(1.1)'
			}
		}
	},

	poster: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		backgroundImage: 'url(/assets/videos/prototext-cards-overview.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		opacity: 0.2,
		zIndex:0
	},

	video: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		zIndex: 0,
		'&::-webkit-media-controls-panel': {
			backgroundImage: 'linear-gradient(0deg, rgba(0,89,255,1) 0%, rgba(0,89,255,1) 80%, rgba(0,0,0,0) 81%, rgba(0,0,0,0) 100%) !important',
			boxShadow: 'none !important',
		 }
	},

}),{name: 'overview-video'})