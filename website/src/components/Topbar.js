
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { toggleTheme } from 'theme/theme.actions'
import TextButton from 'app/components/shared/TextButton'
import Link from './Link'
import { useEffect, useState, useRef } from 'preact/hooks'

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
		<div
			className={clsx(
				classes.root,
			)}
			id='topbar'
			ref={node => {
				if(node && !topbarNode.current) {
					topbarNode.current = node
				}
			}}
		>

			<Link isInternal isButton url='#app'>
				<b>ProtoText</b>
				<span> v{APP_VERSION}</span>
			</Link>

			<Link className={classes.desktop} isInternal isButton url='#features'>
				Features
			</Link>

			<Link className={classes.desktop} isInternal isButton url='#use-cases'>
				Use cases
			</Link>

			<Link className={classes.desktop} isInternal isButton url='#manifest'>
				Manifest
			</Link>

			<Link className={classes.desktop} isInternal isButton url='#shared-documents'>
				Shared docs
			</Link>

			<Link className={classes.desktop} isInternal isButton url='#questions-and-answers'>
				Q&A
			</Link>

			<Link className={classes.desktop} isExternal isButton url='https://www.youtube.com/@svgsprite4942'>
				Tutorials
			</Link>

			<Link isExternal isButton url='https://discord.gg/3WWfQYUs48'>
				Community<sup className={classes.upd}>✦</sup>
			</Link>

			<div className={clsx(classes.fill, classes.desktop)}/>

			<TextButton
				className={clsx(classes.desktop, classes.rightSide)}
				onClick={toggleTheme}
			>
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
		gap: 16,
		flexWrap: 'wrap',
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

	desktop: {
		display: 'none',
		[theme.desktop]: {
			display: 'block',
		}
	},

	fill: {
		flexGrow: 1,
	},

	rightSide: {
		textAlign: 'right'
	},

	compact: {
		padding: [8,24]
	},

	upd: {
		display: 'none',
		color: theme.textButton.active.color,
		fontSize: 12,
		marginRight: -4,
		[theme.desktop]: {
			display: 'inline-block',
		}
	}


}),{name: 'header'})