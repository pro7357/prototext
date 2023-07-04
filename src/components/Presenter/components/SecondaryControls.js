
import { useEffect } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { togglePresenterProperty } from 'presenterActions'
import { showEditor } from 'layoutActions'
import IconMenu from 'sharedComponents/Icons/IconMenu'
import MutedTextLine from 'sharedComponents/MutedTextLine'
import Button from './Button'

let rootNode

const hide = () => {
	if(window.scTimeout || !rootNode) return
	window.scTimeout = setTimeout(() => {
		if(rootNode) {
			rootNode.style.opacity = 0
			window.scTimeout = null
		}
	}, 2000)
}

export default props => {

	const {
		sidebarMode,
		slideMode,
	} = props

	useEffect(() => {
		document.body.addEventListener('mousemove', e => {
			if(rootNode) {
				rootNode.style.opacity = 1
			}
			hide()
		})
	},[])

	const classes = useStyles()

	return (
		<div
			className={classes.root}
			ref={node => {
				if(node) {
					rootNode = node
					hide()
				}
			}}
		>

			<div
				className={clsx(
					classes.topLeft,
					sidebarMode && classes.topLeftWithSidebar
				)}
			>
				<Button
					onClick={() => {
						togglePresenterProperty('sidebarMode')}
					}
				>
					<IconMenu/>
				</Button>
			</div>

			<div className={classes.topRight}>
				<Button
					onClick={(e) => {
						showEditor()
					}}
				>
					ESC
				</Button>
			</div>

			<div className={classes.bottomLeft}>

			</div>

			<div className={classes.bottomRight}>
				{slideMode && (
					<MutedTextLine>
						Use the arrow keys to navigate.
					</MutedTextLine>
				)}
			</div>

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		transition: 'opacity 500ms',
		'&>div': {
			position: 'fixed',
			zIndex: 99,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 4
		}
	},

	topLeft: {
		top: 20,
		left: 20,
	},

	topLeftWithSidebar: {
		left: 302
	},

	topRight: {
		top: 20,
		right: 20,
	},

	bottomLeft: {
		left: 20,
		bottom: 20,
	},

	bottomRight: {
		right: 20,
		bottom: 20,
	},

}),{name: 'presenter-secondary-controls'})