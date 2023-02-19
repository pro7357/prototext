
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { toggleTheme } from 'theme/theme.actions'
import TextButton from 'app/components/shared/TextButton'
import Link from './Link'
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

			<div className={classes.leftSide}>
				<Link isInternal isButton url='#app'><b>ProtoText.app</b></Link>
				<Link isInternal isButton url='#features'>Features</Link>
				<Link isInternal isButton url='#use-cases'>Use cases</Link>
				<Link isInternal isButton url='#manifest'>Manifest</Link>
				<Link isInternal isButton url='#shared-documents'>Shared docs</Link>
				<Link isExternal isButton url='https://discord.com/channels/1075098555846504539'>Discord</Link>
			</div>

			<div className={classes.rightSide}>
				<TextButton onClick={toggleTheme}>
					{theme?'Dark':'Light'} theme
				</TextButton>
			</div>

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
		flexWrap: 'wrap',
		gap: 8,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.background.default,
		position: 'fixed',
		zIndex: 2,
		fontSize: 16,
		top: 0,
		left: 0,
		right: 0,
		boxShadow: `0 5px 48px ${theme.shadow.default}`,
		transition: `padding 500ms ease`
	},

	leftSide: {
		display: 'none',
		[theme.desktop]: {
			display: 'flex',
			gap: 16,
			alignItems: 'center',
			flexWrap: 'wrap',
		}
	},

	rightSide: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		[theme.desktop]: {
			width: 'auto'
		}
	},

	compact: {
		padding: [8,24]
	},


}),{name: 'header'})