
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import os from 'globalUtils/os'
import UIBlock from 'sharedComponents/UIBlock'
import TextButton from 'sharedComponents/TextButton'


export default connect(mapStateToProps)(props => {

	const {
		updates,
	} = props

	const classes = useStyles()

	return (
		<UIBlock className={classes.root}>
			<div className={classes.links}>
				<div className={classes.updatesMessage}>

					{!updates && (
						<i>
							You have the newest version of the app.
						</i>
					)}

					{updates && (
						<TextButton
							isNotable
							onClick={() => {

								let platform = os.isMac()
									? 'MacOS-Intel'
									: os.isWindows()
										? 'Windows'
										: null

								let refId = localStorage.getItem('instanceId')

								let url = `https://prototext.app${platform?`/releases/ProtoText-${platform}-v${updates.releaseVersion}.zip`:``}?ref=updBtn&refVersion=${APP_VERSION}&refId=${refId}`

								window.open(url, '_blank')

							}}
						>
							<b>👋 A new version of the app is available.</b> Download it now.
						</TextButton>
					)}

				</div>

				<TextButton
					onClick={() => {
						window.open('https://discord.gg/SDuzTXWkSd','_blank')
					}}
					isNotable
				>
					Join the Community
				</TextButton>
			</div>
		</UIBlock>
	)

})


function mapStateToProps(state, props) {
	return {
		updates: state.updates
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		paddingTop: 16,
		paddingBottom: 16,
		fontSize: 16
	},

	links: {
		width: '100%',
		display: 'flex',
		gap: 16,
		justifyContent: 'space-between'
	},

	updatesMessage: {
		display: 'flex',
		gap: 8,
	}

}),{name: 'start-links'})