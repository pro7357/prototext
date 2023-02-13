
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'

import Input from 'sharedComponents/Input'
import TextButton from 'sharedComponents/TextButton'
import ResetButton from 'sharedComponents/ResetButton'

import {
	toogleTopbar,
	setSearchText,
	resetSearchText,
	toggleSearchMatchCase,
	toggleGlobalSearch,
	toogleSearchByTags,
 } from 'topbarActions'



export default connect(mapStateToProps)(props => {

	const {
		searchText,
		searchByTags,
		searchTags,
		allSearchTags,
		matchCase,
		globalSearch,
	} = props

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div className={classes.title}>Filter content by</div>

			{searchByTags && (
				<div className={classes.tagsInput}>
					{searchTags && (
						<div className={classes.tags}>
							{searchTags.map((tag, tagIndex) => {
								return (
									<div className={classes.tag}>
										{tag.trim().toLowerCase()}
									</div>
								)
							})}
						</div>
					)}
					{searchTags && (
						<ResetButton
							onClick={() =>{
								resetSearchText()
								toogleSearchByTags()
							}}
							className={classes.resetTagsButton}
						/>)}
				</div>
			)}

			{!searchByTags && (
				<Input
					dataType='text'
					resettable
					onReset={resetSearchText}
					autoFocus={true}
					value={searchText}
					onInput={setSearchText}
					placeholder='Enter any text or a block styling symbol'
				/>
			)}

			{!searchByTags && (
				<TextButton
					onClick={() => {
						toggleSearchMatchCase()
					}}
					isNotable={!matchCase}
					isActive={matchCase}
				>
					Aa
				</TextButton>
			)}

			{!searchByTags && (
				<TextButton
					onClick={() => {
						toggleGlobalSearch()
					}}
					isNotable={!globalSearch}
					isActive={globalSearch}
				>
					Global
				</TextButton>
			)}

			<TextButton
				onClick={() => {
					toogleSearchByTags()
				}}
				isNotable={!searchByTags}
				isActive={searchByTags}
			>
				Tags
			</TextButton>

			<TextButton
				onClick={() => {
					toogleTopbar(false)
				}}
				isSemiDangerous
			>
				Close
			</TextButton>

		</div>
	)

})


function mapStateToProps(state, props) {
	return {
		searchText: state.topbar.searchText,
		matchCase: state.topbar.searchMatchCase,
		searchByTags: state.topbar.searchByTags,
		searchTags: state.topbar.searchTags,
		allSearchTags: state.topbar.allSearchTags,
		globalSearch: state.topbar.searchInAllPages,
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		// '-webkit-app-region': 'drag',
		// cursor: isDesktopBuild ? 'grab' : 'default',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 16,
	},

	title: {
		whiteSpace: 'nowrap'
		//color: theme.text.active
	},

	tagsInput: {
		position: 'relative',
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		'-webkit-app-region': 'no-drag',
		cursor: 'default',
		width: '100%',
		padding: [8,14],
		height: 45,
		borderRadius: theme.rounded,
		backgroundColor: theme.input.background,
	},

	tags: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		'-webkit-app-region': 'no-drag',
	},

	tag: {
		'-webkit-app-region': 'no-drag',
		padding: [2,8],
		borderRadius: theme.rounded,
		backgroundColor: theme.input.insideUIBlock.background,
	},

	resetTagsButton: {
		top: 0,
		right: 0,
		position: 'absolute',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		width: 42,
		justifyContent: 'center',
	}

}),{name: 'search'})
