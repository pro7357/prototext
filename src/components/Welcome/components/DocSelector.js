
import { createUseStyles } from 'react-jss'
import parseFilePath from 'globalUtils/parseFilePath'

import UIBlock from 'sharedComponents/UIBlock'
import TextButton from 'sharedComponents/TextButton'
import IconDel from 'sharedComponents/Icons/IconDel'
import DocGroup from './DocGroup'

import { setSelectedDocs, setRecentDocs } from 'welcomeActions'


export default props => {

	const {
		selectedDocs,
		templateDocs,
		recentDocs,
	} = props

	const classes = useStyles()

	return (
		<UIBlock className={classes.root}>

			<DocGroup
				id='templates'
				title='Templates'
				items={templateDocs}
				selectedItems={selectedDocs}
				itemClassName={classes.templateDoc}
				className={classes.templateDocs}
				itemTitleHandler={item => {
					return item.replaceAll('-', ' ')
				}}
			/>

			<DocGroup
				id='recentDocs'
				title='Recent documents'
				items={recentDocs}
				selectedItems={selectedDocs}
				itemClassName={classes.recentDoc}
				className={classes.recentDocs}
				itemTitleHandler={item => {

					let {
						dir,
						name,
					} = parseFilePath(item)

					return (
						<div className={classes.recentDocTitle}>
							<span>{dir} </span>{name}
						</div>
					)

				}}
				itemSecondaryAction={{
					label: <IconDel/>,
					action: (item) => {
						let newItems = recentDocs.filter((_item => _item !== item))
						setRecentDocs(
							newItems.length ? newItems : null
						)
						setSelectedDocs(
							selectedDocs.filter((_item => _item !== item))
						)
					}
				}}
			/>

			{recentDocs && (
				<TextButton
					onClick={() => {
						setRecentDocs(null)
						setSelectedDocs([])
					}}
					isNotable
				>
					Clear
				</TextButton>
			)}

		</UIBlock>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {

	},

	templateDocs: {
		marginBottom: 8,
		flexWrap: 'wrap',
		width: '100%'
	},

	templateDoc: {
		justifyContent: 'center',
		textAlign: 'center',
		padding: [12, 24],
		minWidth: 140,
		maxWidth: 140,
		height: 140 * 3/4,
		borderRadius: theme.rounded,
	},

	recentDocs: {
		width: '100%',
		flexWrap: 'wrap',
	},

	recentDoc: {
		width: '100%',
		borderRadius: theme.rounded,
		wordBreak: 'break-all',
	},

	recentDocTitle: {
		'& span': {
			opacity: 0.4
		}
	}

}),{name: 'doc-selector'})