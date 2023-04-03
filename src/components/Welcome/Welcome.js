
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import FormHeader from 'sharedComponents/FormHeader'
import StartingSettings from './components/StartingSettings'
import DocSelector from './components/DocSelector'
import Links from './components/Links'
import templateDocs from './data/templateDocs'
import handleOpenBtnClick from './utils/handleOpenBtnClick'


export default connect(mapStateToProps)(props => {

	const {
		scrollbarsMode,
		isFSStartingMode,
		selectedDocs,
		recentDocs,
	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<FormHeader
				title='Welcome to ProtoText'
				primaryAction={{
					label: selectedDocs.length ? 'Open Selected items' : 'Open File',
					//isNotable: true,
					action: () => {
						handleOpenBtnClick({
							selectedDocs,
							isFSStartingMode
						})
					}
				}}
			/>

			<div className={classes.sections}>
				<div className={classes.primarySection}>
					<StartingSettings
						isFSStartingMode={isFSStartingMode}
					/>
					<DocSelector
						selectedDocs={selectedDocs}
						templateDocs={templateDocs}
						recentDocs={recentDocs}
					/>
				</div>
				<div className={classes.secondarySection}>
					<Links/>
				</div>
			</div>

		</div>
	)

})


function mapStateToProps(state, props) {
	return {
		isFSStartingMode: state.welcomeSettings.isFSStartingMode,
		selectedDocs: state.welcomeSettings.selectedDocs,
		recentDocs: state.welcomeSettings.recentDocs,
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		...theme.draggableArea,
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'stretch',
		gap: 16,
		width: '100%',
		height: '100vh',
		padding: 32,
		textAlign: 'center',
		overflowX: 'hidden',
		overflowY: 'scroll',
		...theme.hiddenScrollbar
	},

	sections: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		gap: 16,
	},

	primarySection: {
		display: 'flex',
		gap: 16,
		flexGrow: 1,
		height: '100%',
		'&>div': {
			'&:first-child': {
				width: 270,
			},
			'&:last-child': {
				width: 'calc(100% - 270px - 16px)',
			}
		}
	},

	secondarySection: {
		flexGrow: 1,
	},


}),{name: 'welcome'})