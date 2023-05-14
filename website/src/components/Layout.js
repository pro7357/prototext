
import { createUseStyles } from 'react-jss'

import Topbar from './Topbar'
import Section from './Section'
import Footer from './Footer'
import Feedback from './Feedback'

export default props => {

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Topbar/>
			{props.children}
			<Footer/>
			{/* <Feedback/> */}
		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	'@global': {

		// Local fonts.
		'@font-face': theme.typography.localFontsCss,

		'*': {
			boxSizing: 'border-box',
			outline: 'none',
		},

		h1: {
			margin: 0,
			padding: 0,
			fontSize: 36
		},

		h2: {
			margin: 0,
			padding: 0,
			fontSize: 32
		},

		h3: {
			margin: [0,0,12,0],
			padding: 0,
			fontSize: 22
		},

		p: {
			margin: [0,0,12,0],
			padding: 0
		},

		ol: {
			margin: [0,0,8,0],
			padding: [0,0,0,21],
		},

		body: {
			padding: 0,
			margin: 0,
			overflowX: 'hidden',
			fontSize: theme.typography.sizes.default,
			fontFamily: theme.typography.fonts.primary,
			backgroundColor: theme.background.default,
			color: theme.text.default,
			cursor: 'default'
		}

	},

	root: {
		overflowX: 'hidden',
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		flexDirection: 'column',
		gap: 20,
		zIndex: 1,
		position: 'relative',
		backgroundColor: theme.background.default,
		[theme.desktop]: {
			gap: 40,
		}
	},


}),{name: 'layout'})