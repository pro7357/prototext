
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { setSelectedDocs } from '../welcome.actions'


export default props => {

	const {
		id,
		title,
		items,
		itemTitleHandler,
		itemSecondaryAction,
		selectedItems,
		itemClassName,
		className
	} = props

	const classes = useStyles()

	return (
		<>

			<b>{title}</b>

			{!items && (
				<i>There are no items yet.</i>
			)}

			{items && (
				<div className={clsx(classes.items, className)}>
					{items.map((item, itemIndex) => {

						let itemTitle = itemTitleHandler(item)
						let isActive = selectedItems.includes(item)

						return (
							<div
								className={clsx(
									classes.item,
									itemClassName,
									isActive && classes.activeItem
								)}
								onClick={() => {
									setSelectedDocs(
										isActive
											? selectedItems.filter(_item => _item !== item)
											: selectedItems.concat(item)
									)
								}}
							>
								{itemTitle}
								{itemSecondaryAction && (
									<div
										className={classes.secondaryItemAction}
										onClick={e => {
											e.stopPropagation()
											itemSecondaryAction.action(item)
										}}
									>
										{itemSecondaryAction.label}
									</div>
								)}
							</div>
						)
					})}
				</div>
			)}


		</>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {

	},

	items: {
		display: 'flex',
		gap: 12,
		marginBottom: 8,
		width: '100%'
	},

	item: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 12,
		borderRadius: theme.rounded,
		cursor: 'pointer',
		backgroundColor: theme.tag.background,
		'&:hover':{
			backgroundColor: theme.tag.focused.background,
			color: theme.text.active,
			'& $secondaryItemAction': {
				opacity: 1
			}
		}
	},

	activeItem: {
		backgroundColor: theme.tag.active.background,
		color: theme.text.active,
		'&:hover':{
			backgroundColor: theme.tag.active.background,
		}
	},

	secondaryItemAction: {
		opacity: 0,
		'&:hover': {
			'& rect': {
				fill: theme.textButton.dangerous.color
			}
		}
	}

}),{name: 'doc-group'})