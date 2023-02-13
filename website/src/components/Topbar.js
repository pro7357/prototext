
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { toggleTheme } from 'theme/theme.actions'
import TextButton from 'app/components/shared/TextButton'
import { useEffect, useRef } from 'preact/hooks'

let scrolled

export default connect(mapStateToProps)(props => {

	const {
		theme
	} = props

	const topbarNode = useRef()

	useEffect(() => {
		document.addEventListener('scroll', function(e) {

			let _node = topbarNode.current

			if(_node) {

				if(window.pageYOffset > 10) {
					if(!scrolled && !_node.classList.contains(classes.compact)) {
						_node.classList.add(classes.compact)
						scrolled = true
					}
				} else {
					if(scrolled && _node.classList.contains(classes.compact)) {
						_node.classList.remove(classes.compact)
						scrolled = false
					}
				}

			}

		})
	}, [])

	const classes = useStyles()

	return (
		<div className={classes.root} id='topbar'
			ref={node => {
				if(node && !topbarNode.current) {
					topbarNode.current = node
				}
			}}
		>

			<b>ProtoText.app</b>

			<TextButton onClick={toggleTheme} >
				{theme?'Dark':'Light'} theme
			</TextButton>

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
		padding: [24,24],
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.background.default,
		position: 'fixed',
		zIndex: 2,
		top: 0,
		left: 0,
		right: 0,
		boxShadow: `0 5px 48px ${theme.shadow.default}`,
		transition: `padding 500ms ease`
	},

	compact: {
		padding: [8,24]
	},

	appIcon: {
		width: 48
	}


}),{name: 'header'})